import { useEffect, useMemo, useState } from "react";
import { useRocketStore } from "../store/rocketStore";
import AddRocketForm from "../components/AddRocketForm";
import RocketCard from "../components/RocketCard";
import RocketFilter from "../components/RocketFilter";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

export default function RocketListPage() {
  const rockets = useRocketStore((s) => s.rockets);
  const status = useRocketStore((s) => s.status);
  const error = useRocketStore((s) => s.error);
  const query = useRocketStore((s) => s.query);
  const load = useRocketStore((s) => s.load);
  const setQuery = useRocketStore((s) => s.setQuery);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // jangan refetch kalau sudah sukses (misal balik dari detail page)
    if (useRocketStore.getState().status === "success") return;
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? rockets.filter((r) => r.full_name.toLowerCase().includes(q))
      : rockets;
  }, [rockets, query]);

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">SpaceX Rockets</h1>

      {(status === "idle" || status === "loading") && <LoadingState />}
      {status === "error" && (
        <ErrorState message={error ?? "Unknown error"} onRetry={() => load()} />
      )}

      {status === "success" && (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <RocketFilter value={query} onChange={setQuery} />
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <RocketFilter value={query} onChange={setQuery} />
              <button
                onClick={() => setShowForm(true)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                + Add rocket
              </button>
            </div>

            {showForm && <AddRocketForm onClose={() => setShowForm(false)} />}
          </div>

          {filtered.length === 0 ? (
            <p className="py-10 text-center text-gray-500">No rockets found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <RocketCard key={r.id} rocket={r} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
