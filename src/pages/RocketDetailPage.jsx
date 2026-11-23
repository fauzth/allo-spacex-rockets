import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRocketStore } from "../store/rocketStore";
import { fetchRocketById } from "../api/rocketApi";
import RocketImage from "../components/RocketImage";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { formatCost, formatDate } from "../utils/format";

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export default function RocketDetailPage() {
  const { id } = useParams();
  const stored = useRocketStore((s) =>
    s.rockets.find((r) => String(r.id) === id),
  );
  const [result, setResult] = useState(null); // { id, data } atau { id, error }
  const [attempt, setAttempt] = useState(0);

  // id non-numerik = rocket lokal (UUID) yang hilang setelah refresh
  const isLocalId = !/^\d+$/.test(id);

  useEffect(() => {
    if (stored || isLocalId) return;
    const controller = new AbortController();
    fetchRocketById(id, controller.signal)
      .then((data) => setResult({ id, data }))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setResult({ id, error: e.message });
      });
    return () => controller.abort();
  }, [id, stored, isLocalId, attempt]);

  // semua status diturunkan saat render, bukan disimpan di state
  const current = result?.id === id ? result : null;
  const rocket = stored ?? current?.data;
  const error = current?.error;
  const notFound = !rocket && isLocalId;
  const loading = !rocket && !notFound && !error;

  const handleRetry = () => {
    setResult(null);
    setAttempt((n) => n + 1);
  };

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link to="/" className="mb-4 inline-block text-blue-600 hover:underline">
        &larr; Back to list
      </Link>

      {loading && <LoadingState label="Loading rocket..." />}
      {error && <ErrorState message={error} onRetry={handleRetry} />}
      {notFound && (
        <p className="py-20 text-center text-gray-500">Rocket not found.</p>
      )}

      {rocket && (
        <article className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <RocketImage
            src={rocket.image_url}
            alt={rocket.full_name}
            className="h-64 w-full sm:h-80"
          />
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">{rocket.full_name}</h1>
            <p className="text-gray-700">
              {rocket.description || "No description available."}
            </p>
            <dl className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Cost per launch"
                value={formatCost(rocket.launch_cost)}
              />
              <Field
                label="Country"
                value={rocket.manufacturer?.country_code || "N/A"}
              />
              <Field
                label="First flight"
                value={formatDate(rocket.maiden_flight)}
              />
            </dl>
          </div>
        </article>
      )}
    </main>
  );
}
