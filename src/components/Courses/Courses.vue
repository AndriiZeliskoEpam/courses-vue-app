<script setup>
  import { store } from '../../store.js'
  import { ref, computed } from 'vue'
  import CourseCard from './components/CourseCard/CourseCard.vue'
  import EmptyCourses from '../Courses/components/EmptyCourses/EmptyCoursesList.vue'
  import CommonButton from '../../common/Button/Button.vue'

  const searchQuery = ref('')

  const filteredCourses = computed(() => {
    if (!searchQuery.value) return store.courses
    
    return store.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const handleAddCourse = () => {
    window.location.href = '/courses/create'
  }

  const handleSearch = (e) => {
    searchQuery.value = e.target.value
  }
</script>

<template>
  <div class="courses-wrapper">
    <div class="courses-header">
      <h1>Courses</h1>
      <CommonButton
        text="Add New Course"
        @click="handleAddCourse"
      />
    </div>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Search courses by title or description..."
        :value="searchQuery"
        @input="handleSearch"
        class="search-input"
      />
    </div>

    <div v-if="filteredCourses.length > 0" class="courses-list">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        :course="course"
      />
    </div>

    <div v-else class="empty-state">
      <EmptyCourses />
    </div>
  </div>
</template>

<style scoped>
.courses-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.courses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #f0f0f0;
}

.courses-header h1 {
  margin: 0;
  font-size: 32px;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  max-width: 500px;
  padding: 12px 16px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #007298;
  box-shadow: 0 0 0 3px rgba(0, 114, 152, 0.1);
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>