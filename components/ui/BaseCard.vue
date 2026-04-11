<template>
  <div class="base-card" :class="[`base-card--${variant}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "default" | "accent";
  }>(),
  {
    variant: "default",
  },
);
</script>

<style lang="scss" scoped>
.base-card {
  @include card;
  transition: border-color 0.2s ease;

  &--accent {
    border-color: rgba($color-primary, 0.4);
    background: linear-gradient(
      135deg,
      rgba($color-primary, 0.08) 0%,
      $color-surface 60%
    );
  }

  &:hover {
    border-color: rgba($color-primary, 0.3);
  }
}
</style>
