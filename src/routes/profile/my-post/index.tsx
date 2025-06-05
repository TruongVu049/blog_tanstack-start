import { Link, createFileRoute } from "@tanstack/react-router";
import { getMyPosts } from "~/lib/actions/post.action";

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
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Link
                to="/posts/$postId"
                params={{
                  postId: post.id ?? '#'
                }}
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title.substring(0, 20)}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post.content.substring(0, 50)}
              </p>
              <div className="absolute top-2 right-2 flex items-center gap-4 p-2">
                <button className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 group-hover:text-blue-500"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 group-hover:text-rose-500"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1={10} x2={10} y1={11} y2={17} />
                    <line x1={14} x2={14} y1={11} y2={17} />
                  </svg>

                </button>
              </div>

            </div>
          );
        }
      )}
    </ul>
  );
}
