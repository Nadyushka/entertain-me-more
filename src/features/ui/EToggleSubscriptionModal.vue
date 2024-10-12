<script setup lang="ts">
import { EButton } from "@/features";
import CrossIcon from "@/assets/images/cross-icon.svg"
import {useWebsitesStore} from "@/stores";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const props = defineProps({
      isSubscribeModal: {
        required: false,
        default: () => false,
        type: Boolean,
      }
    }
)

defineEmits<{
  (emit: 'close'): void
  (emit: 'confirm-action'): void
}>()


const websiteStore = useWebsitesStore()
const { percentOfSubscription } = storeToRefs(websiteStore)

const modalText = computed(() => {
  if (props.isSubscribeModal) {
    return `Please confirm that you want to subscribe to all and get 100% fun. `
  }

  return `Please confirm that you want to unsubscribe from all and lose ${percentOfSubscription.value} fun. `
})
</script>

<template>
  <div class="modal">
    <div class="modal__inner">
      <div class="modal__top">
        <h3 class="modal__title">Are you sure?</h3>
        <CrossIcon class="modal__exit-icon" @click="$emit('close')"/>
      </div>
      <p class="modal__text">{{ modalText }}</p>
      <EButton class="modal__button" title="Affirmative" @click="$emit('confirm-action')"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(12, 28, 96, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    max-width: 512px;
    border-radius: 8px;
    background-color: var(--bg-color-light);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
    line-height: 28px;
    color: #0C1C60;
  }

  &__exit-icon {
    color: var(--color-main-dark);
    transition: 0.2s all;
    cursor: pointer;

    &:hover {
      color: var(--color-accent);
    }
  }

  &__text {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 24px;
    color: var(--color-main-medium);
  }

  &__button {
    align-self: flex-end;
  }
}

:deep(.button) {
  border-radius: 4px;
}
</style>
