import Translation from "@/features/Translation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 px-24 py-10">
      <h1 className="text-3xl font-semibold">Ms Azure dictionary</h1>

      <Translation />
    </main>
  );
}
