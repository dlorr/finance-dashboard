import { ref } from "vue";
import type { Transaction } from "~/types/finance";

type ModalMode = "add" | "edit" | null;

const mode = ref<ModalMode>(null);
const editingTransaction = ref<Transaction | null>(null);

export function useTransactionModal() {
  const openAdd = () => {
    editingTransaction.value = null;
    mode.value = "add";
  };

  const openEdit = (transaction: Transaction) => {
    editingTransaction.value = { ...transaction };
    mode.value = "edit";
  };

  const close = () => {
    mode.value = null;
    editingTransaction.value = null;
  };

  const isOpen = computed(() => mode.value !== null);
  const isEditMode = computed(() => mode.value === "edit");

  return {
    mode,
    isOpen,
    isEditMode,
    editingTransaction,
    openAdd,
    openEdit,
    close,
  };
}
