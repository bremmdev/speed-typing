"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <h2 className="text-xl text-violet-600 lg:text-2xl">
        Something went wrong
      </h2>
      <p>{error.message}</p>
      <button
        className="mx-auto transition-all duration-300 text-base block bg-violet-600 text-violet-100 py-2 px-8 rounded-lg cursor-pointer hover:bg-violet-500"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
