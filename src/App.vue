<script setup>
  import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  $bg-color: #f7f7f7;
  $container-width: 1100px;

  .wrapper {
    min-height: 100vh;
    background-color: $bg-color;
    display: flex;
    flex-direction: column;
  }

  .container {
    max-width: $container-width;
    margin: 50px auto 10px;
    padding: 0 16px;
    width: 100%;
  }
  .logo {
    height: 64px;
    margin-left: 0;
    display: block;
  }
</style>