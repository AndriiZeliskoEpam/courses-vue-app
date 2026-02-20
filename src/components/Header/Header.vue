<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Logo from './Logo/Logo.vue'

const router = useRouter()
const route = useRoute()

const user = computed(() => {
  const stored = localStorage.getItem('user')
  return stored ? JSON.parse(stored) : null
})

const isLoggedIn = computed(() => !!user.value)

const userName = computed(() => user.value?.name || 'User')

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

const navigateTo = (path) => {
  router.push(path)
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
          @click="handleLogout"
        >
          Logout
        </Button>
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