import { defineStore } from "pinia";
import type { FinanceState, Transaction } from "~/types/finance";
import { mockTransactions } from "~/data/mockTransactions";

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
    // ── Data loading ───────────────────────────────────────────────────────
    // This is the ONLY place that knows about the data source.
    // Swap mockTransactions for an API call here in Phase 6 — nothing else changes.
    async loadTransactions(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate async fetch (mirrors future API call structure)
        await new Promise((resolve) => setTimeout(resolve, 600));
        this.transactions = mockTransactions;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to load transactions";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
