import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <Outlet />
    </div>
  );
}
