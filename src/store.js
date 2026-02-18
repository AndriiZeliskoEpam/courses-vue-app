import { reactive } from 'vue'
import { mockedCoursesList, mockedAuthorsList } from './constants'

export const store = reactive({
  courses: mockedCoursesList.slice(),
  authors: mockedAuthorsList.slice(),
  addCourse(course) { this.courses.push(course) },
  addAuthor(author) { this.authors.push(author) },
  getCourseById(id) { return this.courses.find(course => course.id === id) },
  updateCourse(id, patch) {
    const i = this.courses.findIndex(c => c.id === id)
    if (i !== -1) this.courses[i] = { ...this.courses[i], ...patch }
  },
  removeCourse(id) { this.courses = this.courses.filter(c => c.id !== id) }
})