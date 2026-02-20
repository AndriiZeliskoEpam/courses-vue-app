<script setup>
  import { useCourseStore } from '@/store'
  import { getCourseDuration } from '@/utils/getCourseDuration'
  import { formatCreationDate } from '@/utils/formatCreationDate'
  import deleteIcon from '@/assets/images/deleteButtonIcon.svg'
  import editIcon from '@/assets/images/editButtonIcon.svg'
  import { BUTTON_NAMES } from '@/constants/buttonNames'

  const store = useCourseStore();
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
          <Button :text=BUTTON_NAMES.SHOW_COURSE></Button>
        </a>
        <Button text="Delete Course" @click="store.removeCourse(course.id)">
          <img :src="deleteIcon" />
        </Button>
        <a :href="`/courses/update/${course.id}`">
          <Button text="Update Course">
            <img :src="editIcon" />
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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