<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <Transition name="slide-up">
          <div v-if="isOpen" class="modal">
            <!-- Header -->
            <div class="modal__header">
              <h2 class="modal__title">
                {{ isEditMode ? "Edit Transaction" : "Add Transaction" }}
              </h2>
              <button class="modal__close" @click="close">✕</button>
            </div>

            <!-- Form -->
            <form class="modal__form" @submit.prevent="handleSubmit">
              <!-- Description -->
              <div class="modal__field">
                <label class="modal__label">Description</label>
                <input
                  v-model="form.description"
                  class="modal__input"
                  :class="{ 'modal__input--error': errors.description }"
                  type="text"
                  placeholder="e.g. Monthly rent"
                  autocomplete="off"
                />
                <span v-if="errors.description" class="modal__error">
                  {{ errors.description }}
                </span>
              </div>

              <!-- Amount -->
              <div class="modal__field">
                <label class="modal__label">Amount</label>
                <input
                  v-model.number="form.amount"
                  class="modal__input"
                  :class="{ 'modal__input--error': errors.amount }"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                <span v-if="errors.amount" class="modal__error">
                  {{ errors.amount }}
                </span>
              </div>

              <!-- Type + Category row -->
              <div class="modal__row">
                <div class="modal__field">
                  <label class="modal__label">Type</label>
                  <select
                    v-model="form.type"
                    class="modal__select"
                    @change="onTypeChange"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div class="modal__field">
                  <label class="modal__label">Category</label>
                  <select v-model="form.category" class="modal__select">
                    <option
                      v-for="cat in availableCategories"
                      :key="cat"
                      :value="cat"
                    >
                      {{ cat }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Date -->
              <div class="modal__field">
                <label class="modal__label">Date</label>
                <input
                  v-model="form.date"
                  class="modal__input"
                  :class="{ 'modal__input--error': errors.date }"
                  type="date"
                />
                <span v-if="errors.date" class="modal__error">
                  {{ errors.date }}
                </span>
              </div>

              <!-- Actions -->
              <div class="modal__actions">
                <button
                  type="button"
                  class="modal__btn modal__btn--cancel"
                  @click="close"
                >
                  Cancel
                </button>
                <button type="submit" class="modal__btn modal__btn--submit">
                  {{ isEditMode ? "Save Changes" : "Add Transaction" }}
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useTransactionModal } from "~/composables/useTransactionModal";
import { useFinanceStore } from "~/stores/useFinanceStore";
import {
  TransactionType,
  TransactionCategory,
  type Transaction,
} from "~/types/finance";

const { isOpen, isEditMode, editingTransaction, close } = useTransactionModal();
const store = useFinanceStore();

// ── Income / Expense category split ───────────────────────────────────────────
const incomeCategories = [
  TransactionCategory.SALARY,
  TransactionCategory.FREELANCE,
  TransactionCategory.INVESTMENT,
  TransactionCategory.OTHER_IN,
];

const expenseCategories = [
  TransactionCategory.HOUSING,
  TransactionCategory.FOOD,
  TransactionCategory.TRANSPORT,
  TransactionCategory.UTILITIES,
  TransactionCategory.HEALTH,
  TransactionCategory.SHOPPING,
  TransactionCategory.EDUCATION,
  TransactionCategory.OTHER_EX,
];

// ── Form state ────────────────────────────────────────────────────────────────
const defaultForm = () => ({
  description: "",
  amount: 0,
  type: "expense" as TransactionType,
  category: TransactionCategory.FOOD,
  date: new Date().toISOString().split("T")[0],
});

const form = ref(defaultForm());
const errors = ref<Partial<Record<keyof Transaction, string>>>({});

const availableCategories = computed(() =>
  form.value.type === TransactionType.INCOME
    ? incomeCategories
    : expenseCategories,
);

// ── Sync form when opening edit ───────────────────────────────────────────────
watch(isOpen, (open) => {
  if (!open) return;

  if (isEditMode.value && editingTransaction.value) {
    form.value = {
      description: editingTransaction.value.description,
      amount: editingTransaction.value.amount,
      type: editingTransaction.value.type,
      category: editingTransaction.value.category,
      date: editingTransaction.value.date,
    };
  } else {
    form.value = defaultForm();
  }

  errors.value = {};
});

// ── Reset category when type changes ─────────────────────────────────────────
const onTypeChange = () => {
  form.value.category =
    form.value.type === TransactionType.INCOME
      ? TransactionCategory.SALARY
      : TransactionCategory.FOOD;
};

// ── Validation ────────────────────────────────────────────────────────────────
const validate = (): boolean => {
  errors.value = {};

  if (!form.value.description.trim()) {
    errors.value.description = "Description is required";
  }
  if (!form.value.amount || form.value.amount <= 0) {
    errors.value.amount = "Amount must be greater than 0";
  }
  if (!form.value.date) {
    errors.value.date = "Date is required";
  }

  return Object.keys(errors.value).length === 0;
};

// ── Submit ────────────────────────────────────────────────────────────────────
const handleSubmit = () => {
  if (!validate()) return;

  if (isEditMode.value && editingTransaction.value) {
    store.updateTransaction(editingTransaction.value.id, form.value);
  } else {
    store.addTransaction(form.value);
  }

  close();
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 200;
  @include flex($align: center, $justify: center);
  padding: $space-md;
}

.modal {
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $border-radius;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;

  &__header {
    @include flex($justify: space-between, $align: center);
    padding: $space-lg;
    border-bottom: 1px solid $color-border;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__close {
    background: transparent;
    border: none;
    color: $color-text-muted;
    font-size: 1rem;
    cursor: pointer;
    padding: $space-xs;
    border-radius: $border-radius-sm;
    line-height: 1;
    transition: color 0.15s ease;

    &:hover {
      color: $color-text;
    }
  }

  &__form {
    padding: $space-lg;
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-md;

    @include respond-to("mobile") {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__label {
    font-size: 0.8rem;
    font-weight: 500;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__input,
  &__select {
    background: $color-surface-alt;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
    color: $color-text;
    font-size: 0.9rem;
    font-family: $font-sans;
    padding: $space-sm $space-md;
    height: 42px;
    outline: none;
    transition: border-color 0.15s ease;
    width: 100%;

    &:focus {
      border-color: $color-primary;
    }

    &--error {
      border-color: $color-danger;
    }
  }

  &__input[type="date"] {
    color-scheme: dark;
    cursor: pointer;
  }

  &__select option {
    background: $color-surface-alt;
  }

  &__error {
    font-size: 0.75rem;
    color: $color-danger;
  }

  &__actions {
    @include flex($justify: flex-end, $gap: $space-sm);
    padding-top: $space-sm;
    border-top: 1px solid $color-border;
    margin-top: $space-xs;
  }

  &__btn {
    padding: $space-sm $space-lg;
    border-radius: $border-radius-sm;
    font-size: 0.875rem;
    font-family: $font-sans;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    height: 40px;

    &--cancel {
      background: transparent;
      border: 1px solid $color-border;
      color: $color-text-muted;

      &:hover {
        border-color: $color-text-muted;
        color: $color-text;
      }
    }

    &--submit {
      background: $color-primary;
      border: 1px solid $color-primary;
      color: white;

      &:hover {
        background: lighten($color-primary, 8%);
      }
    }
  }
}
</style>
