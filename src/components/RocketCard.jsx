import { Link } from "react-router-dom";
import RocketImage from "./RocketImage";

export default function RocketCard({ rocket }) {
  return (
    <Link
      to={`/rockets/${rocket.id}`}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <RocketImage
        src={rocket.image_url}
        alt={rocket.full_name}
        className="h-48 w-full"
      />
      <div className="flex flex-col gap-1 p-4">
        <h2 className="text-lg font-semibold">{rocket.full_name}</h2>
        <p className="line-clamp-3 text-sm text-gray-600">
          {rocket.description || "No description available."}
        </p>
      </div>
    </Link>
  );
}
