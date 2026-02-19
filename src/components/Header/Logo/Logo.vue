<script setup>
  import logo from '../../../assets/logo.svg';
  defineOptions({
    name: 'logo',
  })
</script>

<template>
  <img :src="logo" alt="Logo" class="logo">
</template>

<style scoped>
.logo {
  height: 75px;
  margin-left: -25px;
}
</style>