<template>
  <BaseCard class="chart-skeleton">
    <div class="chart-skeleton__header">
      <SkeletonLoader variant="text" width="160px" height="14px" />
      <SkeletonLoader variant="text" width="80px" height="12px" />
    </div>
    <SkeletonLoader width="100%" :height="height" />

    <div v-if="showLegend" class="chart-skeleton__legend">
      <div v-for="i in 4" :key="i" class="chart-skeleton__legend-item">
        <SkeletonLoader variant="circle" width="8px" height="8px" />
        <SkeletonLoader variant="text" width="60px" height="11px" />
        <SkeletonLoader variant="text" width="30px" height="11px" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "~/components/ui/BaseCard.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";

withDefaults(
  defineProps<{
    height?: string;
    showLegend?: boolean;
  }>(),
  {
    height: "280px",
    showLegend: false,
  },
);
</script>

<style lang="scss" scoped>
.chart-skeleton {
  &__header {
    @include flex($justify: space-between);
    margin-bottom: $space-md;
  }

  &__legend {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-sm $space-md;
    margin-top: $space-md;
    padding-top: $space-md;
    border-top: 1px solid $color-border;
  }

  &__legend-item {
    @include flex($gap: $space-sm);
  }
}
</style>
