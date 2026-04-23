<template>
  <div class="dashboard-layout">
    <AppSidebar />
    <div class="dashboard-layout__main">
      <AppTopbar />
      <main class="dashboard-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from "~/components/layout/AppSidebar.vue";
import AppTopbar from "~/components/layout/AppTopbar.vue";
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-left: $sidebar-width;
    max-width: calc(100% - #{$sidebar-width});

    @include respond-to("tablet") {
      margin-left: 0;
      max-width: 100%;
    }
  }

  &__content {
    flex: 1;
    padding: $space-lg $space-xl;
    overflow-x: hidden;
    min-width: 0;

    @include respond-to("tablet") {
      padding: $space-lg $space-md;
    }

    @include respond-to("mobile") {
      padding: $space-md $space-sm;
    }
  }
}
</style>
