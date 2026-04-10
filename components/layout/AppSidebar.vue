<template>
  <aside class="sidebar">
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
</template>

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
</style>
