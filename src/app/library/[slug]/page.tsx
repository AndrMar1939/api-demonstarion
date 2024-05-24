import { LibraryItem } from "@/features";
 

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-10">text</h1>

      <LibraryItem />
    </div>
  );
}