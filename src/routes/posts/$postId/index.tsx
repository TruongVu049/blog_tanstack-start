import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";
import { PostErrorComponent } from "~/components/PostError";
import { getPost } from "../../../lib/actions/post.action";

export const Route = createFileRoute("/posts/$postId/")({
  loader: ({ params: { postId } }) => getPost({ data: postId }),
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

function PostComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="space-y-2 px-4">
      <h4 className="text-xl font-bold text-center">{post.title}</h4>
      <div className="text-sm">{post.content}</div>
    </div>
  );
}
