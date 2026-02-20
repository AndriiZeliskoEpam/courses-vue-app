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

<style scoped>
  .input-label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .label-text {
    font-weight: 500;
    color: #333;
  }

  .input {
    height: 50px;
    padding: 13px 16px;
    border-radius: 4px;
    border: 1px solid #cfcfcf;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.3s;
  }

  .input:focus {
    outline: none;
    border-color: #0066cc;
  }

  .input-error {
    border: 2px solid #ff0000;
  }

  .error-text {
    color: #ff0000;
    font-size: 12px;
  }
</style>