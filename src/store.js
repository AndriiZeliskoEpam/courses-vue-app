import { defineStore } from 'pinia'
import { mockedCoursesList, mockedAuthorsList } from './constants'

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    users: [{email: "admin@email.com", password: "admin123", name: "Admin"}],
    courses: [...mockedCoursesList],
    authors: [...mockedAuthorsList]
  }),

  actions: {
    addUser(user) {
      if (!user) return
      this.users.push({
        id: Date.now(),
        ...user
      })
    },

    addCourse(course) {
      if (!course) return
      this.courses.push({
        id: Date.now(),
        ...course
      })
    },

    getCourseById(courseId) {
      return this.courses.find(course => course.id === courseId)
    },

    updateCourse(courseId, updatedData) {
      const index = this.courses.findIndex(
        course => course.id === courseId
      )

      if (index === -1) return

      this.courses[index] = {
        ...this.courses[index],
        ...updatedData
      }
    },

    removeCourse(courseId) {
      this.courses = this.courses.filter(
        course => course.id !== courseId
      )
    }
  }
})