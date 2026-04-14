<template>
  <div
    class="skeleton"
    :class="[`skeleton--${variant}`, { 'skeleton--rounded': rounded }]"
    :style="{ width, height }"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "text" | "block" | "circle";
    width?: string;
    height?: string;
    rounded?: boolean;
  }>(),
  {
    variant: "block",
    width: "100%",
    height: "1rem",
    rounded: false,
  },
);
</script>

<style lang="scss" scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    $color-surface-alt 25%,
    lighten($color-surface-alt, 4%) 50%,
    $color-surface-alt 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: $border-radius-sm;

  &--circle {
    border-radius: 50%;
  }
  &--rounded {
    border-radius: 999px;
  }
  &--text {
    border-radius: 4px;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
