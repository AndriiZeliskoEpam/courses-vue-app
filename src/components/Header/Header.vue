<script setup>
  import Logo from './Logo/Logo.vue'
  import { ref, computed } from 'vue'

  const getUser = localStorage.getItem('user');
  const isLoggedIn = ref(getUser);
  const userName = ref('User')
  const currentPath = computed(() => window.location.pathname)

  const isActive = (path) => {
    return currentPath.value === path || currentPath.value.startsWith(path + '/')
  }

  const handleLogout = () => {
    isLoggedIn.value = false
    userName.value = 'User'
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  const navigateTo = (path) => {
    window.location.href = path
  }
</script>

<template>
  <header class="header-container">
    <div class="header-left">
      <Logo />
    </div>
    <div class="user-container">
      <div v-if="isLoggedIn" class="user-info">
        <span class="user-name">{{ userName }}</span>
        <Button
          variant="secondary"
          text="Logout"
          @click="handleLogout"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 30px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.user-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.auth-links {
  display: flex;
  gap: 15px;
}

.auth-link {
  padding: 10px 16px;
  color: #007298;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s;
}

.auth-link:hover {
  background-color: #f0f0f0;
  color: #005a73;
}

.auth-link:first-child {
  background-color: #007298;
  color: #fff;
}

.auth-link:first-child:hover {
  background-color: #005a73;
}
</style>