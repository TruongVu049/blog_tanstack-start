import { Link, createFileRoute } from "@tanstack/react-router";
import { getPosts } from "../../lib/actions/post.action";

export const Route = createFileRoute("/posts/")({
  loader: async () => getPosts(),
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  const posts = Route.useLoaderData();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(
        (post) => {
          return (
            <div
              key={post.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
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
              <Link
                to="/posts/$postId"
                params={{
                  postId: post.id ?? '#',
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          );
        }
      )}
    </ul>
  );
}
