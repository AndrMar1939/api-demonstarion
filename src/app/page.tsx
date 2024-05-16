import Translation from "@/features/Translation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 px-24 py-20">
      <h1 className="text-3xl">Google Translator and Amazon Polly</h1>

      <Translation />
    </main>
  );
}
