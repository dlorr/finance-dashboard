import { type Pinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;

  pinia.use(({ store }) => {
    if (store.$id !== "finance") return;

    const STORAGE_KEY = "finance:transactions";

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        store.transactions = JSON.parse(stored);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    store.$subscribe((_, state) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
      } catch {
        // Storage full or unavailable — fail silently
      }
    });
  });
});
