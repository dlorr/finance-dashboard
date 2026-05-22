import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useFinanceStore } from "~/stores/useFinanceStore";
import { type TransactionFilters, DEFAULT_FILTERS } from "~/types/finance";

// Module-level state — shared across all components
const filters = ref<TransactionFilters>({ ...DEFAULT_FILTERS });

export function useFinanceFilters() {
  const store = useFinanceStore();
  const { transactions } = storeToRefs(store);

  // ── Active filter count (for badge indicator) ─────────────────────────────
  const activeFilterCount = computed(() => {
    let count = 0;
    if (filters.value.dateFrom) count++;
    if (filters.value.dateTo) count++;
    if (filters.value.type) count++;
    if (filters.value.categories.length) count++;
    if (filters.value.search.trim()) count++;
    return count;
  });

  const hasActiveFilters = computed(() => activeFilterCount.value > 0);

  // ── Filtered transactions ─────────────────────────────────────────────────
  const filteredTransactions = computed(() => {
    return transactions.value.filter((t) => {
      // Type filter
      if (filters.value.type && t.type !== filters.value.type) {
        return false;
      }

      // Category filter
      if (
        filters.value.categories.length > 0 &&
        !filters.value.categories.includes(t.category)
      ) {
        return false;
      }

      // Date from
      if (filters.value.dateFrom) {
        if (new Date(t.date) < new Date(filters.value.dateFrom)) return false;
      }

      // Date to
      if (filters.value.dateTo) {
        if (new Date(t.date) > new Date(filters.value.dateTo)) return false;
      }

      // Search
      if (filters.value.search.trim()) {
        const query = filters.value.search.toLowerCase();
        if (!t.description.toLowerCase().includes(query)) return false;
      }

      return true;
    });
  });

  // ── Actions ───────────────────────────────────────────────────────────────
  const setFilter = <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => {
    filters.value[key] = value;
  };

  const clearFilters = () => {
    filters.value = { ...DEFAULT_FILTERS };
  };

  return {
    filters,
    filteredTransactions,
    activeFilterCount,
    hasActiveFilters,
    setFilter,
    clearFilters,
  };
}
