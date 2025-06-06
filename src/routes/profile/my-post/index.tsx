import { Link, createFileRoute } from "@tanstack/react-router";
import { getMyPosts } from "~/lib/actions/post.action";
import PostForm from "./-components/post-form";

export const Route = createFileRoute("/profile/my-post/")({
  loader: async () => getMyPosts(),
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const posts = Route.useLoaderData();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts?.map(
        (post) => {
          return (
            <PostForm key={post.id} post={post} />
          );
        }
      )}
    </ul>
  );
}
