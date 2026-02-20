<script setup>
  defineProps({
    labelText: {
      type: String,
      default: ''
    },
    placeholderText: {
      type: String,
      default: ''
    },
    errorText: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  })

  const emit = defineEmits(['change'])

  const handleChange = (e) => {
    emit('change', e)
  }
</script>

<template>
  <label class="input-label">
    <span v-if="labelText" class="label-text">{{ labelText }}</span>
    <input
      :type="type"
      :placeholder="placeholderText"
      :value="value"
      class="input"
      :class="{ 'input-error': errorText }"
      @change="handleChange"
    />
    <span v-if="errorText" class="error-text">{{ errorText }}</span>
  </label>
</template>

<style lang="scss">
  $text-color: #333333;
  $border-color: #cfcfcf;
  $focus-color: #0066cc;
  $error-color: #ff0000;

  $radius: 6px;

  .input-label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
    font-size: 14px;

    .label-text {
      font-weight: 600;
      color: $text-color;
    }

    .input {
      height: 44px;
      padding: 10px 12px;
      border-radius: $radius;
      border: 1px solid $border-color;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      background: #fff;

      &:focus {
        outline: none;
        border-color: $focus-color;
        box-shadow: 0 4px 12px rgba(0,102,204,0.08);
      }

      &--error {
        border: 1.5px solid $error-color;
      }
    }

    textarea.description {
      min-height: 120px;
      padding: 12px;
      border-radius: $radius;
      border: 1px solid $border-color;
      resize: vertical;
      font-family: inherit;
    }

    .error-text {
      color: $error-color;
      font-size: 12px;
    }
  }
</style>