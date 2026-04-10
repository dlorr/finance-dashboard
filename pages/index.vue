<template>
  <div class="dashboard-page">
    <h1 class="dashboard-page__heading">Overview</h1>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <!-- Phase 3: components go here -->
      <pre style="color: #6c63ff; font-size: 0.75rem"
        >{{ summary }}
      </pre>
      <pre style="color: #22c55e; font-size: 0.75rem">
Monthly: {{ monthlySnapshots }}
      </pre>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFinanceStore } from "~/stores/useFinanceStore";
import { useFinanceStats } from "~/composables/useFinanceStats";

definePageMeta({ layout: "dashboard" });

const store = useFinanceStore();
const { summary, monthlySnapshots, isLoading, error } = useFinanceStats();

onMounted(() => {
  store.loadTransactions();
});
</script>

<style lang="scss" scoped>
.dashboard-page {
  &__heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: $space-lg;
  }
}
</style>
