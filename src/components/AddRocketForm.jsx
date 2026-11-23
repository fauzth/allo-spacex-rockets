import { useState } from "react";
import { useRocketStore } from "../store/rocketStore";
import Modal from "./Modal";

const initial = {
  full_name: "",
  description: "",
  image_url: "",
  launch_cost: "",
  country_code: "",
  maiden_flight: "",
};

const inputClass =
  "w-full rounded-lg border border-white/60 bg-white/60 px-3 py-2 outline-none focus:border-blue-500 focus:bg-white/80";

export default function AddRocketForm({ onClose }) {
  const addRocket = useRocketStore((s) => s.addRocket);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = "Name is required";
    if (
      form.launch_cost &&
      (isNaN(Number(form.launch_cost)) || Number(form.launch_cost) < 0)
    ) {
      errs.launch_cost = "Must be a positive number";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    addRocket({
      full_name: form.full_name.trim(),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      launch_cost: form.launch_cost || null,
      maiden_flight: form.maiden_flight || null,
      manufacturer: {
        country_code: form.country_code.trim().toUpperCase() || null,
      },
    });
    onClose();
  };

  return (
    <Modal title="Add rocket" onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium" htmlFor="full_name">
            Name *
          </label>
          <input
            id="full_name"
            autoFocus
            value={form.full_name}
            onChange={set("full_name")}
            className={inputClass}
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={form.description}
            onChange={set("description")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="image_url">
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            value={form.image_url}
            onChange={set("image_url")}
            className={inputClass}
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="launch_cost"
          >
            Cost per launch (USD)
          </label>
          <input
            id="launch_cost"
            inputMode="numeric"
            value={form.launch_cost}
            onChange={set("launch_cost")}
            className={inputClass}
          />
          {errors.launch_cost && (
            <p className="mt-1 text-sm text-red-600">{errors.launch_cost}</p>
          )}
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="country_code"
          >
            Country code
          </label>
          <input
            id="country_code"
            maxLength={3}
            value={form.country_code}
            onChange={set("country_code")}
            className={inputClass}
            placeholder="USA"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="maiden_flight"
          >
            First flight
          </label>
          <input
            id="maiden_flight"
            type="date"
            value={form.maiden_flight}
            onChange={set("maiden_flight")}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2 sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add rocket
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/60 bg-white/50 px-4 py-2 hover:bg-white/80"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
