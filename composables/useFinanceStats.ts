import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFinanceStore } from "~/stores/useFinanceStore";
import type {
  CategoryBreakdown,
  MonthlySnapshot,
  FinanceSummary,
} from "~/types/finance";
import { TransactionCategory } from "~/types/finance";

export function useFinanceStats() {
  const store = useFinanceStore();
  const { transactions, isLoading, error } = storeToRefs(store);

  // ── Summary ───────────────────────────────────────────────────────────────

  const summary = computed<FinanceSummary>(() => ({
    totalBalance: store.totalBalance,
    totalIncome: store.totalIncome,
    totalExpenses: store.totalExpenses,
    totalSavings: store.totalSavings,
    savingsRate: store.savingsRate,
  }));

  // ── Expense breakdown by category ─────────────────────────────────────────

  const categoryBreakdown = computed<CategoryBreakdown[]>(() => {
    const totals = new Map<TransactionCategory, number>();

    for (const t of store.expenseTransactions) {
      const current = totals.get(t.category) ?? 0;
      totals.set(t.category, current + t.amount);
    }

    const grandTotal = store.totalExpenses || 1; // avoid divide-by-zero

    return Array.from(totals.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percent: Math.round((amount / grandTotal) * 100),
      }))
      .sort((a, b) => b.amount - a.amount);
  });

  // ── Monthly income vs expenses (for line chart) ───────────────────────────

  const monthlySnapshots = computed<MonthlySnapshot[]>(() => {
    const map = new Map<string, MonthlySnapshot>();

    for (const t of transactions.value) {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      if (!map.has(key)) {
        map.set(key, { month: label, income: 0, expenses: 0 });
      }

      const entry = map.get(key)!;
      if (t.type === "income") entry.income += t.amount;
      if (t.type === "expense") entry.expenses += t.amount;
    }

    // Sort chronologically
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, snapshot]) => snapshot);
  });

  // ── Recent transactions (latest 5) ───────────────────────────────────────

  const recentTransactions = computed(() =>
    [...transactions.value]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5),
  );

  // ── Chart: Income vs Expenses series ─────────────────────────────────────────

  const incomeExpensesChartData = computed(() => ({
    series: [
      {
        name: "Income",
        data: monthlySnapshots.value.map((s) => s.income),
      },
      {
        name: "Expenses",
        data: monthlySnapshots.value.map((s) => s.expenses),
      },
    ],
    categories: monthlySnapshots.value.map((s) => s.month),
  }));

  // ── Chart: Expense categories series ─────────────────────────────────────────

  const categoryChartData = computed(() => ({
    series: categoryBreakdown.value.map((c) => c.amount),
    labels: categoryBreakdown.value.map((c) => c.category),
  }));

  return {
    // State passthrough
    transactions,
    isLoading,
    error,

    // Derived data
    summary,
    categoryBreakdown,
    monthlySnapshots,
    recentTransactions,

    incomeExpensesChartData,
    categoryChartData,
  };
}
