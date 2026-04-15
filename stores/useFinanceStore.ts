import { defineStore } from "pinia";
import type { FinanceState, Transaction } from "~/types/finance";
import { financeService } from "~/services/financeService";

export const useFinanceStore = defineStore("finance", {
  state: (): FinanceState => ({
    transactions: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    // ── Filtered by type ───────────────────────────────────────────────────
    incomeTransactions: (state): Transaction[] =>
      state.transactions.filter((t) => t.type === "income"),

    expenseTransactions: (state): Transaction[] =>
      state.transactions.filter((t) => t.type === "expense"),

    // ── Totals ─────────────────────────────────────────────────────────────
    totalIncome(): number {
      return this.incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    },

    totalExpenses(): number {
      return this.expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    },

    totalBalance(): number {
      return this.totalIncome - this.totalExpenses;
    },

    totalSavings(): number {
      return this.totalIncome - this.totalExpenses;
    },

    savingsRate(): number {
      if (this.totalIncome === 0) return 0;
      return Math.round((this.totalSavings / this.totalIncome) * 100);
    },
  },

  actions: {
    async loadTransactions(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      const { data, error, success } = await financeService.getTransactions();

      if (success) {
        this.transactions = data;
      } else {
        this.error = error;
      }

      this.isLoading = false;
    },
  },
});
