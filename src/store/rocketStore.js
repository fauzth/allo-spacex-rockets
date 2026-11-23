import { create } from "zustand";
import { fetchAllRockets } from "../api/rocketApi";

// status: 'idle' | 'loading' | 'success' | 'error'
export const useRocketStore = create((set) => ({
  rockets: [],
  status: "idle",
  error: null,
  query: "",
  load: async (signal) => {
    set({ status: "loading", error: null });
    try {
      const rockets = await fetchAllRockets(signal);
      set({ rockets, status: "success" });
    } catch (e) {
      if (e.name === "AbortError") return;
      set({ status: "error", error: e.message });
    }
  },
  setQuery: (query) => set({ query }),
  addRocket: (r) =>
    set((s) => ({
      rockets: [{ ...r, id: crypto.randomUUID() }, ...s.rockets],
    })),
}));
