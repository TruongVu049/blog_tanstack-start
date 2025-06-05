import { useState } from "react";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { addPost } from "../../../lib/actions/post.action";
import { getUser } from "~/lib/actions/user.action";

export const Route = createFileRoute("/posts/create/")({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({
        to: "/auth/signin",
      })
    }
    return {
      user,
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!title || !content) {
      setError("Both title and content are required");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await addPost({
        data: {
          title,
          content,
        }
      });

      // Clear form
      setTitle("");
      setContent("");

      router.navigate({
        to: "/posts",
      });
    } catch (error) {
      console.error("Failed to add post:", error);
      setError("Failed to add post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl text-center">Create Post</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto">

        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Title..."
            required={true}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            rows={4}
            cols={4}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required={true}
            placeholder="Content..."
          />
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add new post
        </button>
      </form>
    </div>
  );
}
