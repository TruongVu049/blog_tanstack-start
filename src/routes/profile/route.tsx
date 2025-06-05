import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "~/lib/actions/user.action";

export const Route = createFileRoute("/profile")({
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

const tabs = [
  { id: "/profile/info", label: "Info" },
  { id: "/profile/my-post", label: "My Post" },
];


function RouteComponent() {
  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.id}
            className='px-6 py-3 text-sm font-medium transition-colors relative'
          >
            {tab.label}
          </Link>

        ))}
      </div>
      {/* Tab Content */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
