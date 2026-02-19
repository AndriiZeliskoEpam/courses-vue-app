<script setup>
import { computed, ref, onMounted } from 'vue';
import Header from "@/components/Header/Header.vue";
import Login from "@/components/Login/Login.vue";
import Registration from "@/components/Registration/Registration.vue";
import Courses from '@/components/Courses/Courses.vue';
import CourseInfo from '@/components/CourseInfo/CourseInfo.vue';
import CourseForm from './components/CourseForm/CourseForm.vue';

const currentPath = ref(window.location.pathname);
const isLogged = localStorage.getItem('user');

onMounted(() => {
  window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname;
  });
});

const matchRoute = (path) => {
  // Exact route matches
  if (path === '/' || path === '/courses') return isLogged ? Courses : Login;
  if (path === '/login') return Login;
  if (path === '/register') return Registration;
  
  // Dynamic routes
  const courseCreateMatch = path.match(/^\/courses\/create$/);
  if (courseCreateMatch) return CourseForm;
  
  const courseUpdateMatch = path.match(/^\/courses\/update\/(.+)$/);
  if (courseUpdateMatch) return CourseForm;
  
  const courseInfoMatch = path.match(/^\/courses\/(.+)$/);
  if (courseInfoMatch) return CourseInfo;
  
  // Default fallback
  return isLogged ? Courses : Login;
};

const currentView = computed(() => {
  return matchRoute(currentPath.value);
});

</script>

<template>
  <div class="wrapper">
    <Header></Header>
    <div class="container">
      <component :is="currentView"></component>
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
