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
  @include flex($align: stretch);
  min-height: 100vh;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: $sidebar-width;

    @include respond-to("tablet") {
      margin-left: 0;
      padding-top: $topbar-height;
    }
  }

  &__content {
    flex: 1;
    padding: $space-lg $space-xl;
    overflow-y: auto;
  }
}
</style>
