<template>
  <div class="filter-bar">
    <!-- Search -->
    <div class="filter-bar__field filter-bar__field--search">
      <span class="filter-bar__icon">🔍</span>
      <input
        class="filter-bar__input"
        type="text"
        placeholder="Search transactions..."
        :value="filters.search"
        @input="setFilter('search', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Type -->
    <select
      class="filter-bar__select"
      :value="filters.type"
      @change="
        setFilter('type', ($event.target as HTMLSelectElement).value as any)
      "
    >
      <option value="">All Types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <!-- Category -->
    <select
      class="filter-bar__select"
      :value="filters.categories[0] ?? ''"
      @change="onCategoryChange(($event.target as HTMLSelectElement).value)"
    >
      <option value="">All Categories</option>
      <option v-for="cat in allCategories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>

    <!-- Date From -->
    <div class="filter-bar__field">
      <input
        class="filter-bar__input filter-bar__input--date"
        type="date"
        :value="filters.dateFrom"
        @change="
          setFilter('dateFrom', ($event.target as HTMLInputElement).value)
        "
      />
    </div>

    <!-- Date To -->
    <div class="filter-bar__field">
      <input
        class="filter-bar__input filter-bar__input--date"
        type="date"
        :value="filters.dateTo"
        @change="setFilter('dateTo', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Clear button -->
    <button
      v-if="hasActiveFilters"
      class="filter-bar__clear"
      @click="clearFilters"
    >
      Clear
      <span class="filter-bar__badge">{{ activeFilterCount }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFinanceFilters } from "~/composables/useFinanceFilters";
import { TransactionCategory } from "~/types/finance";

const {
  filters,
  hasActiveFilters,
  activeFilterCount,
  setFilter,
  clearFilters,
} = useFinanceFilters();

const allCategories = Object.values(TransactionCategory);

const onCategoryChange = (value: string) => {
  setFilter("categories", value ? [value as TransactionCategory] : []);
};
</script>

<style lang="scss" scoped>
.filter-bar {
  @include flex($gap: $space-sm);
  flex-wrap: wrap;
  margin-bottom: $space-md;
  padding: $space-md;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $border-radius;

  &__field {
    @include flex($gap: $space-xs);
    background: $color-surface-alt;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
    padding: 0 $space-sm;
    height: 38px;
    flex: 1;
    min-width: 160px;

    &--search {
      min-width: 200px;
      flex: 2;
    }
  }

  &__icon {
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  &__input {
    background: transparent;
    border: none;
    outline: none;
    color: $color-text;
    font-size: 0.875rem;
    font-family: $font-sans;
    width: 100%;

    &::placeholder {
      color: $color-text-muted;
    }

    &--date {
      color-scheme: dark;
      cursor: pointer;
    }
  }

  &__select {
    background: $color-surface-alt;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
    color: $color-text;
    font-size: 0.875rem;
    font-family: $font-sans;
    padding: 0 $space-sm;
    height: 38px;
    cursor: pointer;
    outline: none;
    flex: 1;
    min-width: 130px;

    &:focus {
      border-color: $color-primary;
    }

    option {
      background: $color-surface-alt;
      color: $color-text;
    }
  }

  &__clear {
    @include flex($gap: $space-xs);
    background: transparent;
    border: 1px solid $color-danger;
    border-radius: $border-radius-sm;
    color: $color-danger;
    font-size: 0.8rem;
    font-family: $font-sans;
    padding: 0 $space-md;
    height: 38px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;

    &:hover {
      background: rgba($color-danger, 0.1);
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: $color-danger;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    font-weight: 700;
  }
}
</style>
