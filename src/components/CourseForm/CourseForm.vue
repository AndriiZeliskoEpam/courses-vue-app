<script setup>
  import { ref, computed, reactive, onMounted } from 'vue'
  import { store } from '../../store.js'
  import { generateUUID } from '@/helpers/generateUUID.js'
  import { getCurrentDateFormatted } from '@/helpers/getCurrentDate.js'

  const courseData = reactive({
    id: null,
    title: '',
    description: '',
    duration: '',
    authors: []
  })

  const errors = reactive({
    title: '',
    description: '',
    duration: ''
  })

  const isCreating = ref(true)

  // Helper functions
  const getCourseDuration = (minutes) => {
    if (!minutes) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  // Extract course ID from URL if editing
  onMounted(() => {
    const pathParts = window.location.pathname.split('/')
    const courseId = pathParts[pathParts.length - 1]
    
    if (courseId && courseId !== 'create') {
      isCreating.value = false
      const course = store.getCourseById(courseId)
      if (course) {
        Object.assign(courseData, course)
      }
    }
  })

  const handleInputField = (e, field) => {
    courseData[field] = e.target.value
    errors[field] = ''
  }

  const handleAddAuthorToCourse = (authorId) => {
    if (!courseData.authors.includes(authorId)) {
      courseData.authors.push(authorId)
    }
  }

  const validateForm = () => {
    let isValid = true
    if (!courseData.title) {
      errors.title = 'Title is required'
      isValid = false
    }
    if (!courseData.duration || isNaN(courseData.duration)) {
      errors.duration = 'Duration must be a number'
      isValid = false
    }
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    const newCourse = {
      ...courseData,
      id: generateUUID(),
      creationDate: getCurrentDateFormatted(),
    }
    store.addCourse(newCourse)
    window.location.href = '/courses'
  }

  const handleUpdateCourse = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    store.updateCourse(courseData.id, courseData)
    window.location.href = '/courses'
  }

  const handleCancel = () => {
    window.location.href = '/courses'
  }
</script>

<template>
  <div class="">
    <h2>{{ isCreating ? "Create Course" : "Edit Course" }}</h2>
    <form>
      <Input
        :value="courseData.title"
        labelText="Title"
        @change="(e) => handleInputField(e, 'title')"
        :errorText="errors.title"
        placeholderText="Input course title"
      />
      <label>
        Description
        <textarea
          class="description"
          placeholder="Input text"
          @change="(e) => handleInputField(e, 'description')"
          :value="courseData.description">
        </textarea>
      </label>

      <div class="info-wrapper">
        <div>
          <div class="duration">
            <Input
              placeholderText="Input text"
              labelText="Duration (minutes)"
              :value="courseData.duration"
              v-model.number="courseData.duration"
              :errorText="errors.duration"
              @change="(e) => handleInputField(e, 'duration')"
            />
            <p>{{ getCourseDuration(courseData.duration) }}</p>
          </div>

          <h2>Authors</h2>
          <div class="authors-container">
            <h3>Available Authors</h3>
            <div v-for="author in store.authors" :key="author.id" class="author-item">
              <p>{{ author.name }}</p>
              <Button 
                variant="secondary"
                :disabled="courseData.authors.includes(author.id)"
                @click="() => handleAddAuthorToCourse(author.id)"
              >
                {{ courseData.authors.includes(author.id) ? 'Added' : 'Add' }}
              </Button>
            </div>
          </div>
        </div>

        <div class="course-authors-container">
          <h2>Course Authors</h2>
          <div v-if="courseData.authors.length > 0">
            <div v-for="authorId in courseData.authors" :key="authorId" class="course-author-item">
              <p>{{ store.authors.find(a => a.id === authorId)?.name }}</p>
            </div>
          </div>
          <p v-else class="notification">No authors added yet</p>
        </div>
      </div>

      <div class="buttons-container">
        <div v-if="isCreating">
          <Button type="button" text="CREATE COURSE" @click="handleSubmit"></Button>  
        </div>
        <div v-else>
          <Button type="button" text="UPDATE COURSE" @click="handleUpdateCourse"></Button>
        </div>
        <Button 
          type="button" 
          variant="secondary"
          @click="handleCancel"
        >
          CANCEL
        </Button>
      </div>
    </form>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.description {
  display: block;
  min-height: 100px;
  border-radius: 4px;
  border: 1px solid #cfcfcfad;
  padding: 8px;
  font-family: inherit;
}

form {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  background: #fff;
}

form input {
  width: inherit;
}

.info-wrapper {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  justify-content: space-between;
}

.info-wrapper > div {
  width: calc(50% - 12px);
}

.info-wrapper input {
  width: 100%;
  max-width: 380px;
}

.authors-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.author-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.author-item:last-child {
  border-bottom: none;
}

.author-item p {
  margin: 0;
  padding: 0;
}

.notification {
  text-align: center;
  color: #999;
  padding: 20px;
}

.duration {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.course-authors-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.course-author-item {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.course-author-item:last-child {
  border-bottom: none;
}

.course-author-item p {
  margin: 0;
  padding: 0;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 40px 0;
}
</style>