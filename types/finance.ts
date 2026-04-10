// ─── Enums ────────────────────────────────────────────────────────────────────

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum TransactionCategory {
  // Income
  SALARY = "Salary",
  FREELANCE = "Freelance",
  INVESTMENT = "Investment",
  OTHER_IN = "Other Income",

  // Expense
  HOUSING = "Housing",
  FOOD = "Food",
  TRANSPORT = "Transport",
  UTILITIES = "Utilities",
  HEALTH = "Health",
  SHOPPING = "Shopping",
  EDUCATION = "Education",
  OTHER_EX = "Other Expense",
}

// ─── Core Models ──────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number; // always positive — type determines sign
  date: string; // ISO 8601: "2025-01-15"
  tags?: string[]; // future: filtering
}

// ─── Aggregates ───────────────────────────────────────────────────────────────

export interface FinanceSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number; // income - expenses
  savingsRate: number; // percentage
}

export interface CategoryBreakdown {
  category: TransactionCategory;
  amount: number;
  percent: number;
}

export interface MonthlySnapshot {
  month: string; // "Jan", "Feb", etc.
  income: number;
  expenses: number;
}

// ─── Store State Shape ────────────────────────────────────────────────────────

export interface FinanceState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}
