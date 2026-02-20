<script setup>
  import logo from '@/assets/images/logo.svg';
  defineOptions({
    name: 'logo',
  })
</script>

<template>
  <img :src="logo" alt="Logo" class="logo">
</template>