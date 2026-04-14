<template>
  <BaseCard>
    <div class="table-skeleton__header">
      <SkeletonLoader variant="text" width="160px" height="14px" />
      <SkeletonLoader variant="text" width="60px" height="12px" />
    </div>

    <div class="table-skeleton__rows">
      <div v-for="i in rowCount" :key="i" class="table-skeleton__row">
        <div class="table-skeleton__desc">
          <SkeletonLoader variant="circle" width="22px" height="22px" />
          <SkeletonLoader variant="text" width="140px" height="13px" />
        </div>
        <SkeletonLoader variant="text" width="80px" height="12px" />
        <SkeletonLoader variant="text" width="70px" height="12px" />
        <SkeletonLoader variant="text" width="80px" height="13px" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "~/components/ui/BaseCard.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";

withDefaults(defineProps<{ rowCount?: number }>(), { rowCount: 6 });
</script>

<style lang="scss" scoped>
.table-skeleton {
  &__header {
    @include flex($justify: space-between);
    margin-bottom: $space-lg;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__row {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr;
    align-items: center;
    padding: $space-sm $space-md;
  }

  &__desc {
    @include flex($gap: $space-sm);
  }
}
</style>
