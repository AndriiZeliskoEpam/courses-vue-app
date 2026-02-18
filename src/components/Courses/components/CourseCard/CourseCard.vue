<script setup>
  import { store } from '@/store'
  import CommonButton from "@/common/Button/Button.vue"
  import { getCourseDuration, formatCreationDate } from '@/helpers'

  const props = defineProps({
    course: {
      type: Object,
      required: true
    }
  })

  const getAuthors = () => {
    if (!props.course.authors || props.course.authors.length === 0) return '...'
    return props.course.authors.filter((author) =>
      store.authors.some((mockedAuthor) => author === mockedAuthor.id)
    )
    .map(
      (author) =>
        store.authors.find((mockedAuthor) => author === mockedAuthor.id).name
    )
    .join(", ");
  }
</script>

<template>
  <div class="card-container">
      <div class="card-text">
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
      </div>
      <div class="card-details">
        <p>
          <b>Authors: </b>
          {{ getAuthors() }}
        </p>
        <p>
          <b>Duration:</b>
          <span>{{ getCourseDuration(course.duration) }}</span>
        </p>
        <p>
          <b>Created: </b>
          <span>{{ formatCreationDate(course.creationDate) }}</span>
        </p>
        <div class="buttons-container">
          <a :href="`/courses/${course.id}`">
            <CommonButton text="Show Course"></CommonButton>
          </a>
          <CommonButton text="Delete Course" @click="store.removeCourse(course.id)"></CommonButton>
          <a :href="`/courses/update/${course.id}`">
            <CommonButton text="Update Course"></CommonButton>
          </a>
        </div>
      </div>
    </div>
</template>

<style>
  .card-container {
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    gap: 16px;
    border-left: 5px solid #333e48;
    border-radius: 5px;
    box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 30px;
  }

  .card-text {
    width: 70%;
  }

  .card-details {
    width: 30%;
  }

  .card-details > p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .card-details > p > b {
    padding-right: 5px;
  }

  .buttons-container {
    display: flex;
    gap: 10px;
  }
</style>