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

  <!-- Mobile toggle (rendered outside sidebar so it's always visible) -->
  <button class="sidebar-toggle" @click="isOpen = !isOpen">
    <span />
    <span />
    <span />
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.sidebar {
  @include card;
  position: fixed;
  top: 0;
  left: 0;
  width: $sidebar-width;
  height: 100vh;
  border-radius: 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  gap: $space-xl;
  padding: $space-xl $space-md;
  z-index: 100;

  @include respond-to("tablet") {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);

    &--open {
      transform: translateX(0);
    }
  }

  &__logo {
    font-size: 1.1rem;
    font-weight: 600;
    color: $color-primary;
    padding: 0 $space-sm;
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: none;

  @include respond-to("tablet") {
    display: block;
  }
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: $space-md;
  left: $space-md;
  z-index: 101;
  background: $color-surface;
  border: 1px solid $color-border;
  padding: $space-sm;
  border-radius: $border-radius-sm;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    width: 16px;
    height: 2px;
    background: $color-text;
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  @include respond-to("tablet") {
    display: flex;
  }
}
</style>
