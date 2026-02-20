<script setup>
  import Header from '@/components/Header/Header.vue'
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .wrapper {
    min-height: 100vh;
    background-color: #f7f7f7;
  }
  .container {
    max-width: 1100px;
    margin: 50px auto 10px;
  }
</style>
