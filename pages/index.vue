<template>
  <div class="dashboard-page">
    <h1 class="dashboard-page__heading">Overview</h1>

    <template v-if="isLoading">
      <div class="dashboard-page__loading">Loading your finances...</div>
    </template>

    <template v-else-if="error">
      <div class="dashboard-page__error">{{ error }}</div>
    </template>

    <template v-else>
      <SummaryCards />
      <TransactionTable />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFinanceStore } from "~/stores/useFinanceStore";
import { useFinanceStats } from "~/composables/useFinanceStats";
import SummaryCards from "~/features/dashboard/SummaryCards.vue";
import TransactionTable from "~/features/dashboard/TransactionTable.vue";

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

  &__loading,
  &__error {
    @include flex($justify: center);
    padding: $space-2xl;
    color: $color-text-muted;
    font-size: 0.9rem;
  }

  &__error {
    color: $color-danger;
  }
}
</style>
