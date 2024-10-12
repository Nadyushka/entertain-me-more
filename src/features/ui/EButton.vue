<script setup lang="ts">
const props = defineProps<{
  title: {
    type: String,
    required: true
  },
  leftIcon: {
    type: Boolean,
    default: false,
    required: false
  },
  variant: {
    type: 'outlined' | 'rounded',
    default: 'rounded',
    required: false
  }
}>()

defineEmits<{
  (emit: 'click'): void
}>()

</script>

<template>
  <button
      class="button"
      :class="{
       'button_outlined': props.variant === 'outlined',
       'button_with-icon': props.leftIcon,
      }"
      @click="$emit('click')"
  >
    <slot name="left-icon" class="button__left__icon"></slot>
    {{ props.title }}
  </button>
</template>

<style scoped lang="scss">
.button {
  background-color: var(--color-accent);
  padding: 4px 12px;
  border-radius: 16px;
  color: var(--color-light);
  border: none;
  position: relative;
  font-size: 16px;
  line-height: 24px;

  &::before {
    content: "";
    position: absolute;
    background-color: var(--color-light);
    height: 1px;
    width: 0;
    bottom: 4px;
    transition: 0.2s all;
  }

  &:hover::before {
    width: calc(100% - 12px * 2);
  }
}

.button_outlined {
  border-radius: 0;
  border: 1px solid var(--boder-color);
  padding: 10px 16px;
  background-color: transparent;
  color: var(--color-accent);
  font-weight: 600;
  line-height: 16px;

  &::before {
    content: "";
    position: absolute;
    background-color: var(--color-accent);
    height: 1px;
    width: 0;
    bottom: 8px;
    transition: 0.2s all;
  }

  &:hover::before {
    width: calc(100% - 16px * 2);
  }
}

.button_with-icon {
  background-color: var(--color-accent-light);
  display: flex;
  align-items: center;
  padding: 4px 12px 4px 4px;
  gap: 8px;
  color: var(--color-accent);

  &::before {
    content: "";
    position: absolute;
    background-color: var(--color-accent);
    height: 1px;
    width: 0;
    bottom: 6px;
    left: 36px;
    transition: 0.2s all;
  }

  &:hover::before {
    width: calc(100% - 12px * 2 - 26px);
  }
}


</style>
