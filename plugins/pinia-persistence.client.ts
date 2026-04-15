export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(({ store }) => {
    // Only persist the finance store
    if (store.$id !== "finance") return;

    const STORAGE_KEY = "finance:transactions";

    // Rehydrate from storage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        store.transactions = JSON.parse(stored);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Persist on every state change
    store.$subscribe((_, state) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
      } catch {
        // Storage full or unavailable — fail silently
      }
    });
  });
});
