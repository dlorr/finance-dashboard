<template>
  <BaseCard class="chart-card">
    <div class="chart-card__header">
      <h2 class="chart-card__title">Expense Breakdown</h2>
    </div>

    <ClientOnly>
      <apexchart
        type="donut"
        height="280"
        :options="chartOptions"
        :series="categoryChartData.series"
      />
      <template #fallback>
        <div class="chart-card__fallback" />
      </template>
    </ClientOnly>

    <!-- Legend -->
    <div class="chart-legend">
      <div
        v-for="(item, i) in categoryBreakdown"
        :key="item.category"
        class="chart-legend__item"
      >
        <span
          class="chart-legend__dot"
          :style="{ background: paletteColors[i % paletteColors.length] }"
        />
        <span class="chart-legend__label">{{ item.category }}</span>
        <span class="chart-legend__percent">{{ item.percent }}%</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFinanceStats } from "~/composables/useFinanceStats";
import BaseCard from "~/components/ui/BaseCard.vue";

const { categoryChartData, categoryBreakdown } = useFinanceStats();

const paletteColors = [
  "#6c63ff",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

const chartOptions = computed(() => ({
  chart: {
    type: "donut",
    background: "transparent",
    fontFamily: "DM Sans, sans-serif",
    animations: { enabled: true, speed: 600 },
  },
  colors: paletteColors,
  labels: categoryChartData.value.labels,
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total",
            color: "#64748b",
            fontSize: "13px",
            formatter: (w: any) => {
              const total = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0,
              );
              return new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
                maximumFractionDigits: 0,
              }).format(total);
            },
          },
          value: {
            color: "#e2e8f0",
            fontSize: "1.25rem",
            fontWeight: "600",
            formatter: (val: string) =>
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
                maximumFractionDigits: 0,
              }).format(Number(val)),
          },
        },
      },
    },
  },
  stroke: { show: false },
  legend: { show: false },
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
}));
</script>

<style lang="scss" scoped>
.chart-card {
  &__header {
    margin-bottom: $space-md;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__fallback {
    height: 280px;
    background: $color-surface-alt;
    border-radius: $border-radius-sm;
    animation: pulse 1.5s ease-in-out infinite;
  }
}

.chart-legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-xs $space-md;
  margin-top: $space-md;
  padding-top: $space-md;
  border-top: 1px solid $color-border;

  &__item {
    @include flex($gap: $space-sm);
    font-size: 0.8rem;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__label {
    flex: 1;
    color: $color-text-muted;
  }

  &__percent {
    font-family: $font-mono;
    font-weight: 500;
    font-size: 0.75rem;
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
