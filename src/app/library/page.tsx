import { LibraryListOnline } from '@/features';

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-10">Library</h1>

      <LibraryListOnline />
    </div>
  );
}
