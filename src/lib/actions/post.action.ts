import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import type { Post } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useAppSession } from "~/utils/session";

const POSTS_FILE = "src/data/posts.json";

/**
 * Reads posts from the JSON file
 */
export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const posts = await fs.promises.readFile(POSTS_FILE, "utf-8");
    return JSON.parse(posts) as Post[];
  } catch (error) {
    console.error("Error reading posts file:", error);
    return [];
  }
});

/**
 * Fetches a single post by ID
 */
export const getPost = createServerFn({ method: "GET" })
  .validator((postId: string) => postId)
  .handler(async ({ data: postId }) => {
    try {
      const posts = await getPosts();
      const post = posts.find((p) => p.id === postId);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  });


/**
 * Writes posts to the JSON file
 */
export const addPost = createServerFn({ method: "POST" })
  .validator((post: Post) => post)
  .handler(async ({ data }) => {
    try {
      // Read the existing posts from the file
      const session = await useAppSession()
      const postsData = await getPosts();


      // Create a new post with a unique ID
      const newPost: Post = {
        id: uuidv4(),
        title: data.title,
        content: data.content,
        userId: session.data.userId,
        createdAt: new Date().toISOString(),
      };

      // Add the new post to the list
      const updatedPosts = [...postsData, newPost];

      // Write the updated posts back to the file
      await fs.promises.writeFile(
        POSTS_FILE,
        JSON.stringify(updatedPosts, null, 2),
        "utf-8"
      );

      return newPost;
    } catch (error) {
      console.error("Failed to add joke:", error);
      throw new Error("Failed to add joke");
    }
  });

// Edit post
export const editPost = createServerFn({ method: "POST" })
  .validator((post: Post) => post)
  .handler(async ({ data }) => {
    try {
      // Read the existing posts from the file
      const postsData = await getPosts();

      // Find the post to edit
      const postToEdit = postsData.find((p) => p.id === data.id);
      if (!postToEdit) {
        throw new Error("Post not found");
      }

      // Update the post
      postToEdit.title = data.title;
      postToEdit.content = data.content;

      // Add the new post to the list
      const updatedPosts = postsData.map((p) =>
        p.id === data.id ? data : p
      );

      // Write the updated posts back to the file
      await fs.promises.writeFile(
        POSTS_FILE,
        JSON.stringify(updatedPosts, null, 2),
        "utf-8"
      );

      return data;
    } catch (error) {
      console.error("Failed to add joke:", error);
      throw new Error("Failed to add joke");
    }
  });


export const getMyPosts = createServerFn({ method: "GET" })
  .handler(async (): Promise<Post[] | null> => {
    try {
      const posts = await fs.promises.readFile(POSTS_FILE, "utf-8");
      const session = await useAppSession()
      const parsedPosts = JSON.parse(posts) as Post[];
      const userPosts = parsedPosts.filter((p) => p.userId === session.data.userId);
      if (!userPosts) {
        return null;
      }
      return userPosts;
    } catch (error) {
      console.error("Error reading posts file:", error);
      return null;
    }
  });