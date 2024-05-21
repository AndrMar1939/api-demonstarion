import { TranslationAzure } from "@/features";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-10 ">Microsoft Azure dictionary</h1>

      <TranslationAzure />
    </div>
  );
}
