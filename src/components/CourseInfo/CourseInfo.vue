<script setup>
  import { computed } from 'vue'
  import { store } from '@/store.js'
  import { getCourseDuration, formatCreationDate } from '@/helpers'

  const courseId = computed(() => {
    return window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  })

  const courseInfo = computed(() => {
    return store.getCourseById(courseId.value)
  })

  const authors = computed(() => {
    if (!courseInfo.value || !courseInfo.value.authors) return []
    return courseInfo.value.authors
      .filter((author) =>
        store.authors.some((mockedAuthor) => author === mockedAuthor.id)
      )
      .map((author) =>
        store.authors.find((mockedAuthor) => author === mockedAuthor.id)
      )
  })
</script>

<template>
  <div class="course-info-wrapper" v-if="courseInfo">
      <h1>{{ courseInfo.title }}</h1>
      <div class="course-info-container">
        <p class="description">{{ courseInfo.description }}</p>
        <div>
          <p>
            <b>ID: </b>
            {{ courseInfo.id }}
          </p>
          <p>
            <b>Duration: </b>
            {{ getCourseDuration(courseInfo.duration) }}
          </p>
          <p>
            <b>Created: </b>
            {{ formatCreationDate(courseInfo.creationDate) }}
          </p>
          <div>
            <b>Authors: </b>
            <ul class="authors-list">
              <li v-for="author in authors" :key="author.id">
                {{ author.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <a href="/courses" role="link" class="back-button">
        <Button text="Back"></Button>
      </a>
    </div>
  <div v-else class="course-info-wrapper">
    <p>Course not found</p>
    <a href="/courses" role="link">
      <Button text="Back"></Button>
    </a>
  </div>
</template>

<style>
.course-info-wrapper {
	display: flex;
	flex-direction: column;
}

.course-info-container {
	margin-top: 20px;
	padding: 20px;
	display: flex;
	gap: 50px;
	border-radius: 4px;
	border: 1px solid #cfcfcf;
	background: #fff;
}

.authors-list {
	list-style: none;
	padding-left: 0;
}

.description {
	width: 60%;
	border-right: 1px solid #cfcfcf;
}

p {
	padding-bottom: 0;
}

.back-button {
  align-self: flex-end;
  margin-top: 30px;
}
</style>