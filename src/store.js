import { reactive } from 'vue'
import { mockedCoursesList, mockedAuthorsList } from './constants'

export const store = reactive({
  users: [{ email: 'admin@email.com', name: 'admin' }],
  courses: mockedCoursesList.slice(),
  authors: mockedAuthorsList.slice(),

  // User operations
  addUser(user) {
    this.users.push(user)
  },
  getUserByEmail(email) {
    return this.users.find(user => user.email === email)
  },
  updateUser(email, patch) {
    const i = this.users.findIndex(user => user.email === email)
    if (i !== -1) this.users[i] = { ...this.users[i], ...patch }
  },
  removeUser(email) {
    this.users = this.users.filter(user => user.email !== email)
  },

  // Course operations
  addCourse(course) {
    this.courses.push(course)
  },
  getCourseById(id) {
    return this.courses.find(course => course.id === id)
  },
  updateCourse(id, patch) {
    const i = this.courses.findIndex(c => c.id === id)
    if (i !== -1) this.courses[i] = { ...this.courses[i], ...patch }
  },
  removeCourse(id) {
    this.courses = this.courses.filter(c => c.id !== id)
  },

  // Author operations
  addAuthor(author) {
    this.authors.push(author)
  },
  getAuthorById(id) {
    return this.authors.find(author => author.id === id)
  },
  updateAuthor(id, patch) {
    const i = this.authors.findIndex(a => a.id === id)
    if (i !== -1) this.authors[i] = { ...this.authors[i], ...patch }
  },
  removeAuthor(id) {
    this.authors = this.authors.filter(a => a.id !== id)
  }
})