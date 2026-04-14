<template>
  <div class="summary-cards">
    <BaseCard v-for="i in 4" :key="i" class="summary-cards__item">
      <div class="skeleton-card">
        <div class="skeleton-card__header">
          <SkeletonLoader variant="circle" width="32px" height="32px" />
          <SkeletonLoader variant="text" width="80px" height="12px" />
        </div>
        <SkeletonLoader width="120px" height="2rem" />
        <SkeletonLoader variant="text" width="100px" height="11px" />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "~/components/ui/BaseCard.vue";
import SkeletonLoader from "~/components/ui/SkeletonLoader.vue";
</script>

<style lang="scss" scoped>
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-md;
  margin-bottom: $space-xl;

  @include respond-to("tablet") {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to("mobile") {
    grid-template-columns: 1fr;
  }
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: $space-md;

  &__header {
    @include flex($justify: space-between);
  }
}
</style>
