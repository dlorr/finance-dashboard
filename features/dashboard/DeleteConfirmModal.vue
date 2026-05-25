<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="confirm-overlay" @click.self="cancel">
        <Transition name="slide-up">
          <div v-if="isOpen" class="confirm">
            <div class="confirm__icon">🗑️</div>
            <h3 class="confirm__title">Delete Transaction?</h3>
            <p class="confirm__message">
              "<strong>{{ transaction?.description }}</strong
              >" will be permanently removed. This cannot be undone.
            </p>
            <div class="confirm__actions">
              <button class="confirm__btn confirm__btn--cancel" @click="cancel">
                Cancel
              </button>
              <button
                class="confirm__btn confirm__btn--delete"
                @click="confirm"
              >
                Delete
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Transaction } from "~/types/finance";
import { useFinanceStore } from "~/stores/useFinanceStore";

const store = useFinanceStore();

const pendingId = ref<string | null>(null);

const isOpen = computed(() => pendingId.value !== null);

const transaction = computed(
  () => store.transactions.find((t) => t.id === pendingId.value) ?? null,
);

// Exposed so parent can trigger it
const open = (id: string) => {
  pendingId.value = id;
};

const cancel = () => {
  pendingId.value = null;
};

const confirm = () => {
  if (pendingId.value) {
    store.deleteTransaction(pendingId.value);
    pendingId.value = null;
  }
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 300;
  @include flex($align: center, $justify: center);
  padding: $space-md;
}

.confirm {
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $border-radius;
  width: 100%;
  max-width: 380px;
  padding: $space-xl $space-lg;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-md;

  &__icon {
    font-size: 2rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__message {
    font-size: 0.875rem;
    color: $color-text-muted;
    line-height: 1.5;

    strong {
      color: $color-text;
    }
  }

  &__actions {
    @include flex($justify: center, $gap: $space-sm);
    width: 100%;
  }

  &__btn {
    flex: 1;
    padding: $space-sm $space-lg;
    border-radius: $border-radius-sm;
    font-size: 0.875rem;
    font-family: $font-sans;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    height: 40px;

    &--cancel {
      background: transparent;
      border: 1px solid $color-border;
      color: $color-text-muted;

      &:hover {
        border-color: $color-text-muted;
        color: $color-text;
      }
    }

    &--delete {
      background: $color-danger;
      border: 1px solid $color-danger;
      color: white;

      &:hover {
        background: darken($color-danger, 8%);
      }
    }
  }
}
</style>
