<script setup>
  import { useCourseStore } from '@/store/index.js' 
  import { ref, computed } from 'vue'
  import CourseCard from '@/components/features/Courses/CourseCard.vue'
  import EmptyCourses from '@/components/features/Courses/EmptyCoursesList.vue'
  import { BUTTON_NAMES } from '@/constants/buttonNames'

  const searchQuery = ref('');
  const store = useCourseStore()

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
      <Button
        :text=BUTTON_NAMES.ADD_NEW_COURSE
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

<style scoped lang="scss">
  $primary-color: #007298;
  $border-color: #cfcfcf;
  $radius: 6px;

  .courses-wrapper {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .courses-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #efefef;
  }

  .courses-header h1 {
    margin: 0;
    font-size: 32px;
    color: #333;
  }

  .search-bar {
    display: flex;
  }

  .search-input {
    flex: 1;
    max-width: 520px;
    padding: 10px 12px;
    border: 1px solid $border-color;
    border-radius: $radius;
    transition: box-shadow 0.12s ease;
    &:focus { box-shadow: 0 6px 18px rgba(0,0,0,0.06); outline:none; border-color:$primary-color }
  }

  .courses-list { display:flex; flex-direction:column; gap:18px; }
  .empty-state { display:flex; justify-content:center; align-items:center; min-height:320px; }
</style>