<template>
  <div class="dashboard-page">
    <h1 class="dashboard-page__heading">Overview</h1>

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

      <div class="dashboard-page__charts">
        <ChartIncomeExpenses />
        <ChartExpenseCategories />
      </div>

      <TransactionTable />
    </template>
  </div>
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

definePageMeta({ layout: "dashboard" });

const store = useFinanceStore();
const { isLoading, error } = useFinanceStats();

onMounted(() => store.loadTransactions());
</script>

<style lang="scss" scoped>
.dashboard-page {
  &__heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: $space-lg;
  }

  &__charts {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: $space-md;
    margin-bottom: $space-md;

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
}
</style>
