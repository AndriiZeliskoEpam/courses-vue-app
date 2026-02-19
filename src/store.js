import { reactive } from 'vue'
import { mockedCoursesList, mockedAuthorsList } from './constants'

export const store = reactive({
  users: [{email: 'admin@email.com', name: "admin"}],
  courses: mockedCoursesList.slice(),
  authors: mockedAuthorsList.slice(),
  addUser(user) {this.users.push(user)},
  addCourse(course) { this.courses.push(course) },
  addAuthor(author) { this.authors.push(author) },
  getCourseById(id) { return this.courses.find(course => course.id === id) },
  updateCourse(id, patch) {
    const i = this.courses.findIndex(c => c.id === id)
    if (i !== -1) this.courses[i] = { ...this.courses[i], ...patch }
  },
  removeUser(email) {this.users = this.users.filter(user => user.email !== email)},
  removeCourse(id) { this.courses = this.courses.filter(c => c.id !== id) }
})