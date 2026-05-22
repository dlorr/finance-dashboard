import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFinanceStore } from "~/stores/useFinanceStore";
import { useFinanceFilters } from "~/composables/useFinanceFilters";
import type {
  CategoryBreakdown,
  MonthlySnapshot,
  FinanceSummary,
} from "~/types/finance";

export function useFinanceStats() {
  const store = useFinanceStore();
  const { isLoading, error } = storeToRefs(store);
  const { filteredTransactions } = useFinanceFilters();

  const incomeTransactions = computed(() =>
    filteredTransactions.value.filter((t) => t.type === "income"),
  );

  const expenseTransactions = computed(() =>
    filteredTransactions.value.filter((t) => t.type === "expense"),
  );

  const totalIncome = computed(() =>
    incomeTransactions.value.reduce((sum, t) => sum + t.amount, 0),
  );
  const totalExpenses = computed(() =>
    expenseTransactions.value.reduce((sum, t) => sum + t.amount, 0),
  );
  const totalBalance = computed(() => totalIncome.value - totalExpenses.value);
  const totalSavings = computed(() => totalIncome.value - totalExpenses.value);
  const savingsRate = computed(() => {
    if (totalIncome.value === 0) return 0;
    return Math.round((totalSavings.value / totalIncome.value) * 100);
  });

  const summary = computed<FinanceSummary>(() => ({
    totalBalance: totalBalance.value,
    totalIncome: totalIncome.value,
    totalExpenses: totalExpenses.value,
    totalSavings: totalSavings.value,
    savingsRate: savingsRate.value,
  }));

  const categoryBreakdown = computed<CategoryBreakdown[]>(() => {
    const totals = new Map<string, number>();

    for (const t of expenseTransactions.value) {
      totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
    }

    const grandTotal = totalExpenses.value || 1;

    return Array.from(totals.entries())
      .map(([category, amount]) => ({
        category: category as any,
        amount,
        percent: Math.round((amount / grandTotal) * 100),
      }))
      .sort((a, b) => b.amount - a.amount);
  });

  const monthlySnapshots = computed<MonthlySnapshot[]>(() => {
    const map = new Map<string, MonthlySnapshot>();

    for (const t of filteredTransactions.value) {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });

      if (!map.has(key)) map.set(key, { month: label, income: 0, expenses: 0 });

      const entry = map.get(key)!;
      if (t.type === "income") entry.income += t.amount;
      if (t.type === "expense") entry.expenses += t.amount;
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, snapshot]) => snapshot);
  });

  const recentTransactions = computed(() =>
    [...filteredTransactions.value]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5),
  );

  const incomeExpensesChartData = computed(() => ({
    series: [
      { name: "Income", data: monthlySnapshots.value.map((s) => s.income) },
      { name: "Expenses", data: monthlySnapshots.value.map((s) => s.expenses) },
    ],
    categories: monthlySnapshots.value.map((s) => s.month),
  }));

  const categoryChartData = computed(() => ({
    series: categoryBreakdown.value.map((c) => c.amount),
    labels: categoryBreakdown.value.map((c) => c.category),
  }));

  return {
    transactions: filteredTransactions,
    isLoading,
    error,
    summary,
    categoryBreakdown,
    monthlySnapshots,
    recentTransactions,
    incomeExpensesChartData,
    categoryChartData,
  };
}
