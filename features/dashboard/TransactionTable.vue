<template>
  <BaseCard class="transaction-table-card">
    <div class="transaction-table-card__header">
      <h2 class="transaction-table-card__title">Recent Transactions</h2>
      <span class="transaction-table-card__count">
        {{ transactions.length }} total
      </span>
    </div>

    <!-- Empty state -->
    <div v-if="transactions.length === 0" class="transaction-table__empty">
      <span>🧾</span>
      <p>No transactions yet</p>
    </div>

    <!-- Scroll wrapper → fixes horizontal overflow on mobile -->
    <div v-else class="transaction-table__scroll">
      <div class="transaction-table">
        <div class="transaction-table__head">
          <span>Description</span>
          <span>Category</span>
          <span>Date</span>
          <span class="transaction-table__col--right">Amount</span>
        </div>

        <div
          v-for="transaction in transactions"
          :key="transaction.id"
          class="transaction-table__row"
        >
          <div class="transaction-table__desc">
            <span
              class="transaction-table__badge"
              :class="`transaction-table__badge--${transaction.type}`"
            >
              {{ transaction.type === "income" ? "↑" : "↓" }}
            </span>
            {{ transaction.description }}
          </div>

          <span class="transaction-table__category">
            {{ transaction.category }}
          </span>

          <span class="transaction-table__date">
            {{ formatDate(transaction.date) }}
          </span>

          <span
            class="transaction-table__amount"
            :class="`transaction-table__amount--${transaction.type}`"
          >
            {{ transaction.type === "income" ? "+" : "-"
            }}{{ formatCurrency(transaction.amount) }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { useFinanceStats } from "~/composables/useFinanceStats";
import BaseCard from "~/components/ui/BaseCard.vue";

const { transactions } = useFinanceStats();

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    value,
  );

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
</script>

<style lang="scss" scoped>
.transaction-table-card {
  &__header {
    @include flex($justify: space-between);
    margin-bottom: $space-lg;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__count {
    font-size: 0.8rem;
    color: $color-text-muted;
  }
}

.transaction-table {
  width: 100%;
  min-width: 560px;

  &__scroll {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__head {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr;
    padding: $space-sm $space-md;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: $color-text-muted;
    border-bottom: 1px solid $color-border;
    margin-bottom: $space-xs;
  }

  &__row {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr;
    align-items: center;
    padding: $space-sm $space-md;
    border-radius: $border-radius-sm;
    font-size: 0.875rem;
    transition: background 0.15s ease;

    &:hover {
      background: $color-surface-alt;
    }
  }

  &__desc {
    @include flex($gap: $space-sm);
    font-weight: 500;
    overflow: hidden;

    span + * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 700;
    flex-shrink: 0;

    &--income {
      background: rgba($color-success, 0.15);
      color: $color-success;
    }
    &--expense {
      background: rgba($color-danger, 0.15);
      color: $color-danger;
    }
  }

  &__category {
    font-size: 0.8rem;
    color: $color-text-muted;
    white-space: nowrap;
  }

  &__date {
    font-size: 0.8rem;
    color: $color-text-muted;
    font-family: $font-mono;
    white-space: nowrap;
  }

  &__amount {
    font-family: $font-mono;
    font-weight: 600;
    text-align: right;
    white-space: nowrap;

    &--income {
      color: $color-success;
    }
    &--expense {
      color: $color-danger;
    }
  }

  &__col--right {
    text-align: right;
  }

  &__empty {
    @include flex($align: center, $justify: center);
    flex-direction: column;
    gap: $space-sm;
    padding: $space-2xl;
    color: $color-text-muted;
    font-size: 0.9rem;

    span {
      font-size: 2rem;
    }
  }
}
</style>
