<template>
  <header class="topbar">
    <div class="topbar__title">Dashboard</div>
    <div class="topbar__meta">
      <span class="topbar__date">{{ currentDate }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
</script>

<style lang="scss" scoped>
.topbar {
  @include flex($justify: space-between);
  height: $topbar-height;
  padding: 0 $space-xl;
  border-bottom: 1px solid $color-border;
  background: $color-bg;
  position: sticky;
  top: 0;
  z-index: 10;

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__date {
    font-size: 0.85rem;
    color: $color-text-muted;
  }
}
</style>
