<template>
  <div class="dashboard-page__topbar">
    <h1 class="dashboard-page__heading">Overview</h1>
    <button class="dashboard-page__add-btn" @click="openAdd">
      + Add Transaction
    </button>
  </div>

  <template v-if="isLoading">
    <SummaryCardsSkeleton />
    <div class="dashboard-page__charts">
      <ChartSkeleton height="280px" />
      <ChartSkeleton height="280px" show-legend />
    </div>
    <TransactionTableSkeleton :row-count="6" />
  </template>

  <template v-else-if="error">
    <div class="dashboard-page__error">{{ error }}</div>
  </template>

  <template v-else>
    <Transition name="slide-up" appear>
      <SummaryCards />
    </Transition>

    <FilterBar />

    <div
      v-if="filteredTransactions.length === 0 && hasActiveFilters"
      class="dashboard-page__empty"
    >
      <span>🔍</span>
      <p>No transactions match your filters.</p>
      <button class="dashboard-page__empty-clear" @click="clearFilters">
        Clear filters
      </button>
    </div>

    <template v-else>
      <div class="dashboard-page__charts">
        <ChartIncomeExpenses />
        <ChartExpenseCategories />
      </div>
      <TransactionTable />
    </template>
  </template>
  <TransactionModal />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFinanceStore } from "~/stores/useFinanceStore";
import { useFinanceStats } from "~/composables/useFinanceStats";
import SummaryCards from "~/features/dashboard/SummaryCards.vue";
import SummaryCardsSkeleton from "~/features/dashboard/SummaryCardsSkeleton.vue";
import TransactionTable from "~/features/dashboard/TransactionTable.vue";
import TransactionTableSkeleton from "~/features/dashboard/TransactionTableSkeleton.vue";
import ChartIncomeExpenses from "~/features/dashboard/ChartIncomeExpenses.vue";
import ChartExpenseCategories from "~/features/dashboard/ChartExpenseCategories.vue";
import ChartSkeleton from "~/features/dashboard/ChartSkeleton.vue";
import FilterBar from "~/features/dashboard/FilterBar.vue";
import { useFinanceFilters } from "~/composables/useFinanceFilters";
import TransactionModal from "~/features/dashboard/TransactionModal.vue";
import { useTransactionModal } from "~/composables/useTransactionModal";

definePageMeta({ layout: "dashboard" });

const store = useFinanceStore();
const { isLoading, error } = useFinanceStats();
const { filteredTransactions, hasActiveFilters, clearFilters } =
  useFinanceFilters();
const { openAdd } = useTransactionModal();

onMounted(() => store.loadTransactions());
</script>

<style lang="scss" scoped>
.dashboard-page {
  &__topbar {
    @include flex($justify: space-between, $align: center);
    margin-bottom: $space-lg;

    @include respond-to("mobile") {
      flex-direction: column;
      align-items: flex-start;
      gap: $space-sm;
    }
  }

  &__heading {
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__add-btn {
    background: $color-primary;
    border: none;
    border-radius: $border-radius-sm;
    color: white;
    font-size: 0.875rem;
    font-family: $font-sans;
    font-weight: 500;
    padding: $space-sm $space-lg;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;

    &:hover {
      background: lighten($color-primary, 8%);
    }
  }

  &__charts {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: $space-md;
    margin-bottom: $space-md;
    min-width: 0;

    & > * {
      min-width: 0;
    }

    @include respond-to("tablet") {
      grid-template-columns: 1fr;
    }
  }

  &__error {
    @include flex($justify: center);
    padding: $space-2xl;
    color: $color-danger;
    font-size: 0.9rem;
  }

  &__empty {
    @include flex($align: center, $justify: center);
    flex-direction: column;
    gap: $space-md;
    padding: $space-2xl;
    color: $color-text-muted;
    text-align: center;

    span {
      font-size: 2.5rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  &__empty-clear {
    background: transparent;
    border: 1px solid $color-primary;
    border-radius: $border-radius-sm;
    color: $color-primary;
    font-family: $font-sans;
    font-size: 0.85rem;
    padding: $space-sm $space-lg;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba($color-primary, 0.1);
    }
  }
}
</style>
