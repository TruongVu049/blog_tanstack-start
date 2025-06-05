import { createFileRoute } from "@tanstack/react-router";
import { getUserInfo } from "~/lib/actions/user.action";

export const Route = createFileRoute("/profile/info/")({
  loader: async () => getUserInfo(),
  component: RouteComponent,
});

function RouteComponent() {
  const user = Route.useLoaderData()

  return (
    <div className="rounded-md border border-border p-6
    ">
      <h2 className="text-lg font-semibold mb-4">User Information</h2>
      <p className="mb-2">Full Name: {user?.fullName}</p>
      <p className="mb-2">Username: {user?.username}</p>
    </div>
  );
}
