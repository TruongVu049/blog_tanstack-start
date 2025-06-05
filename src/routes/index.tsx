import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h3>Welcome Home!!!</h3>
    </div>
  );
}
