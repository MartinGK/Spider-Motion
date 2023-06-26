import { create } from "zustand";

const useMarvelStore = create((set) => ({
  data: [],
  loading: true,
  fetch: async (url) => {
    set({ loading: true });
    const response = await fetch(url);
    const data = await response.json();
    set({
      data: data.data.results.filter((item) => item.description),
      loading: false,
    });
  },
}));

export default useMarvelStore;
