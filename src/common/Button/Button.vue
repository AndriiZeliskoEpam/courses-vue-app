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

<style scoped>
.common-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.common-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.common-button:active:not(:disabled) {
  transform: translateY(0);
}

.common-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-primary {
  background-color: #007298;
  color: #fff;
}

.button-primary:hover:not(:disabled) {
  background-color: #005a73;
}

.button-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.button-secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.button-danger {
  background-color: #ff4444;
  color: #fff;
}

.button-danger:hover:not(:disabled) {
  background-color: #cc0000;
}
</style>