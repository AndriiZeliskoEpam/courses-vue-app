<script setup>
  defineProps({
    text: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      enum: ['primary', 'secondary', 'danger'],
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['button', 'submit', 'reset'],
      default: 'button'
    }
  })

  const emit = defineEmits(['click'])

  const handleClick = (e) => {
    emit('click', e)
  }
</script>

<template>
  <button
    class="common-button"
    :class="`button-${variant}`"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<style lang="scss">
  $primary-color: #007298;
  $primary-hover: #005a73;

  $secondary-bg: #f0f0f0;
  $secondary-hover: #e0e0e0;
  $secondary-border: #ccc;

  $danger-color: #ff4444;
  $danger-hover: #cc0000;

  $text-color: #333333;
  $radius: 6px;
  $shadow: 0 6px 18px rgba(0,0,0,0.08);

  .common-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 600;
    border-radius: $radius;
    border: none;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
    background: $primary-color;
    color: #fff;
    box-shadow: none;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: $shadow;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    &-primary { background: $primary-color; color: #fff;
      &:hover:not(:disabled){ background: $primary-hover; }
    }
    &-secondary {
      background: $secondary-bg;
      color: $text-color;
      border: 1px solid $secondary-border;
      &:hover:not(:disabled){ background: $secondary-hover; }
    }
    &-danger {
      background: $danger-color;
      color: #fff;
      &:hover:not(:disabled){ background: $danger-hover; }
    }
  }
</style>