<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div v-if="isOpen" class="sidebar-overlay" @click="isOpen = false" />
  </Transition>

  <!-- Sidebar -->
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar__logo">💰 FinanceOS</div>

    <nav class="sidebar__nav">
      <a class="sidebar__link sidebar__link--active" href="/">
        <span>📊</span> Dashboard
      </a>
      <a class="sidebar__link sidebar__link--disabled" href="#">
        <span>💸</span> Transactions
      </a>
      <a class="sidebar__link sidebar__link--disabled" href="#">
        <span>📈</span> Reports
      </a>
    </nav>
  </aside>

  <button
    class="sidebar-toggle"
    :class="{ 'sidebar-toggle--open': isOpen }"
    @click="isOpen = !isOpen"
    aria-label="Toggle sidebar"
  >
    <span />
    <span />
    <span />
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const route = useRoute();

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100vh;
  background: $color-surface;
  border-right: 1px solid $color-border;
  display: flex;
  flex-direction: column;
  gap: $space-xl;
  padding: $space-xl $space-md;
  z-index: 100;
  overflow-y: auto;

  // Desktop — always visible, no transition needed
  @include respond-to("desktop") {
    transform: translateX(0) !important;
  }

  // Tablet & mobile — hidden by default, slides in
  @include respond-to("tablet") {
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 4px 0 32px rgba(0, 0, 0, 0.5);

    &--open {
      transform: translateX(0);
    }
  }

  &__logo {
    font-size: 1.1rem;
    font-weight: 600;
    color: $color-primary;
    padding: 0 $space-sm;
    flex-shrink: 0;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__link {
    @include flex($gap: $space-sm);
    padding: $space-sm $space-md;
    border-radius: $border-radius-sm;
    color: $color-text-muted;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.15s ease;
    white-space: nowrap;

    &--active {
      background: rgba($color-primary, 0.12);
      color: $color-primary;
    }

    &--disabled {
      opacity: 0.4;
      pointer-events: none;
    }

    &:hover:not(&--active):not(&--disabled) {
      background: $color-surface-alt;
      color: $color-text;
    }
  }
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: none;

  @include respond-to("tablet") {
    display: block;
  }
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 14px;
  left: $space-md;
  z-index: 101;

  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $border-radius-sm;
  cursor: pointer;
  width: 36px;
  height: 36px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: $color-primary;
  }

  span {
    display: block;
    width: 16px;
    height: 2px;
    background: $color-text;
    border-radius: 2px;
    transition: all 0.25s ease;
    transform-origin: center;
  }

  &--open {
    span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  @include respond-to("tablet") {
    display: flex;
  }
}
</style>
