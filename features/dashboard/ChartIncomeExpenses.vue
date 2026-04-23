<template>
  <BaseCard class="chart-card">
    <div class="chart-card__header">
      <h2 class="chart-card__title">Income vs Expenses</h2>
      <div class="chart-card__legend">
        <span class="chart-card__legend-item chart-card__legend-item--income">
          Income
        </span>
        <span class="chart-card__legend-item chart-card__legend-item--expense">
          Expenses
        </span>
      </div>
    </div>

    <ClientOnly>
      <div class="chart-card__chart-wrapper">
        <apexchart
          type="area"
          height="280"
          :options="chartOptions"
          :series="incomeExpensesChartData.series"
        />
      </div>
      <template #fallback>
        <div class="chart-card__fallback" />
      </template>
    </ClientOnly>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFinanceStats } from "~/composables/useFinanceStats";
import BaseCard from "~/components/ui/BaseCard.vue";

const { incomeExpensesChartData } = useFinanceStats();

const chartOptions = computed(() => ({
  chart: {
    type: "area",
    toolbar: { show: false },
    background: "transparent",
    fontFamily: "DM Sans, sans-serif",
    animations: {
      enabled: true,
      speed: 600,
    },
  },
  colors: ["#6c63ff", "#ef4444"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.35,
      opacityTo: 0.02,
      stops: [0, 95],
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  dataLabels: { enabled: false },
  grid: {
    borderColor: "#2e3250",
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
  },
  xaxis: {
    categories: incomeExpensesChartData.value.categories,
    labels: {
      style: { colors: "#64748b", fontSize: "12px" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: "#64748b", fontSize: "12px" },
      formatter: (val: number) =>
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
          maximumFractionDigits: 0,
        }).format(val),
    },
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: (val: number) =>
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(val),
    },
  },
  legend: { show: false },
}));
</script>

<style lang="scss" scoped>
.chart-card {
  min-width: 0;
  overflow: hidden;

  :deep(.apexcharts-canvas) {
    width: 100% !important;

    svg {
      width: 100% !important;
    }
  }

  &__header {
    @include flex($justify: space-between);
    margin-bottom: $space-md;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__legend {
    @include flex($gap: $space-md);
  }

  &__legend-item {
    font-size: 0.78rem;
    color: $color-text-muted;
    @include flex($gap: $space-xs);

    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &--income::before {
      background: $color-primary;
    }
    &--expense::before {
      background: $color-danger;
    }
  }

  &__fallback {
    height: 280px;
    background: $color-surface-alt;
    border-radius: $border-radius-sm;
    animation: pulse 1.5s ease-in-out infinite;
  }

  &__chart-wrapper {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
