<template>
  <div class="summary-cards">
    <BaseCard
      v-for="card in cards"
      :key="card.label"
      :variant="card.accent ? 'accent' : 'default'"
      class="summary-cards__item"
    >
      <div class="summary-card">
        <div class="summary-card__header">
          <span class="summary-card__icon">{{ card.icon }}</span>
          <span class="summary-card__label">{{ card.label }}</span>
        </div>
        <div
          class="summary-card__value"
          :class="`summary-card__value--${card.color}`"
        >
          {{ formatCurrency(card.value) }}
        </div>
        <div v-if="card.sub !== undefined" class="summary-card__sub">
          {{ card.sub }}
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFinanceStats } from "~/composables/useFinanceStats";
import { useCountUp } from "~/composables/useCountUp";
import BaseCard from "~/components/ui/BaseCard.vue";

const { summary } = useFinanceStats();

const { display: balanceDisplay } = useCountUp(
  () => summary.value.totalBalance,
);
const { display: incomeDisplay } = useCountUp(() => summary.value.totalIncome);
const { display: expensesDisplay } = useCountUp(
  () => summary.value.totalExpenses,
);
const { display: savingsDisplay } = useCountUp(
  () => summary.value.totalSavings,
);

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    value,
  );

const cards = computed(() => [
  {
    label: "Total Balance",
    value: balanceDisplay.value,
    icon: "💰",
    color: "primary",
    accent: true,
    sub: undefined,
  },
  {
    label: "Total Income",
    value: incomeDisplay.value,
    icon: "📈",
    color: "success",
    accent: false,
    sub: undefined,
  },
  {
    label: "Total Expenses",
    value: expensesDisplay.value,
    icon: "📉",
    color: "danger",
    accent: false,
    sub: undefined,
  },
  {
    label: "Savings Rate",
    value: savingsDisplay.value,
    icon: "🏦",
    color: "warning",
    accent: false,
    sub: `${summary.value.savingsRate}% of income saved`,
  },
]);
</script>

<style lang="scss" scoped>
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-md;
  margin-bottom: $space-xl;
  min-width: 0;

  @include respond-to("tablet") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to("mobile") {
    grid-template-columns: 1fr;
  }

  &__item {
    min-width: 0;
  }
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: $space-sm;

  &__header {
    @include flex($justify: space-between);
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__label {
    font-size: 0.8rem;
    color: $color-text-muted;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__value {
    font-size: 1.75rem;
    font-weight: 600;
    font-family: $font-mono;
    letter-spacing: -0.02em;

    &--primary {
      color: $color-primary;
    }
    &--success {
      color: $color-success;
    }
    &--danger {
      color: $color-danger;
    }
    &--warning {
      color: $color-warning;
    }
  }

  &__sub {
    font-size: 0.78rem;
    color: $color-text-muted;
  }
}
</style>
