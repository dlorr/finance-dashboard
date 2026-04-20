import type { Transaction } from "~/types/finance";
import { mockTransactions } from "~/data/mockTransactions";

// ─── Response wrapper ─────────────────────────────────────────────────────────
// Mirrors what a real API response shape will look like.
// When backend is ready, the fetch call returns this same shape.

export interface ServiceResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

// ─── API client (future) ──────────────────────────────────────────────────────
// When backend is ready:
// 1. Set NUXT_PUBLIC_API_BASE_URL in .env
// 2. Replace the mock return below with the fetch call
// 3. Nothing else in the app changes

const BASE_URL = null;
// const BASE_URL = useRuntimeConfig().public.apiBaseUrl;

async function get<T>(endpoint: string): Promise<ServiceResponse<T>> {
  // ── MOCK MODE (no API_BASE_URL set) ───────────────────────────────────────
  if (!BASE_URL) {
    return getMock<T>(endpoint);
  }

  // ── API MODE (API_BASE_URL is set) ────────────────────────────────────────
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    return { data, error: null, success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { data: [] as T, error: message, success: false };
  }
}

// ─── Mock resolver ────────────────────────────────────────────────────────────

async function getMock<T>(endpoint: string): Promise<ServiceResponse<T>> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const mockMap: Record<string, unknown> = {
    "/transactions": mockTransactions,
  };

  const data = mockMap[endpoint];

  if (data === undefined) {
    return {
      data: [] as T,
      error: `No mock data found for endpoint: ${endpoint}`,
      success: false,
    };
  }

  return { data: data as T, error: null, success: true };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const financeService = {
  getTransactions: () => get<Transaction[]>("/transactions"),

  // ── Stubs (wire up in Phase CRUD) ───────────────────────────────────────
  createTransaction: async (
    payload: Omit<Transaction, "id">,
  ): Promise<ServiceResponse<Transaction>> => {
    if (!BASE_URL) {
      // Mock: generate a fake ID and return
      await new Promise((resolve) => setTimeout(resolve, 300));
      const created: Transaction = { ...payload, id: `txn_${Date.now()}` };
      return { data: created, error: null, success: true };
    }
    return get<Transaction>("/transactions"); // replace with POST when ready
  },

  updateTransaction: async (
    id: string,
    payload: Partial<Transaction>,
  ): Promise<ServiceResponse<Transaction>> => {
    if (!BASE_URL) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: { id, ...payload } as Transaction,
        error: null,
        success: true,
      };
    }
    return get<Transaction>(`/transactions/${id}`); // replace with PUT when ready
  },

  deleteTransaction: async (id: string): Promise<ServiceResponse<boolean>> => {
    if (!BASE_URL) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { data: true, error: null, success: true };
    }
    return get<boolean>(`/transactions/${id}`); // replace with DELETE when ready
  },
};
