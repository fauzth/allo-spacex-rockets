export default function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 py-20 text-center"
    >
      <p className="text-red-600">Something went wrong: {message}</p>
      <button
        onClick={onRetry}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
}
