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
  width: 100%;
  min-width: 0;

  @include respond-to("tablet") {
    padding: 0 $space-md;
    padding-left: calc(#{$space-md} + 48px);
  }

  @include respond-to("mobile") {
    padding: 0 $space-sm;
    padding-left: calc(#{$space-sm} + 48px);
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    white-space: nowrap;
  }

  &__date {
    font-size: 0.85rem;
    color: $color-text-muted;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include respond-to("mobile") {
      display: none;
    }
  }
}
</style>
