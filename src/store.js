import { defineStore } from 'pinia'
import { mockedCoursesList, mockedAuthorsList } from './constants'

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    users: [
      {
        id: 1,
        email: 'admin@email.com',
        password: 'admin123',
        name: 'Admin'
      }
    ],
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

      this.saveToLocalStorage()
    },

    addCourse(course) {
      if (!course) return

      this.courses.push({
        id: course.id ?? Date.now(),
        ...course
      })

      this.saveToLocalStorage()
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

      this.saveToLocalStorage()
    },

    removeCourse(courseId) {
      this.courses = this.courses.filter(
        course => course.id !== courseId
      )

      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem(
        'courseStore',
        JSON.stringify({
          users: this.users,
          courses: this.courses
        })
      )
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('courseStore')
      if (!saved) return

      const data = JSON.parse(saved)

      this.$patch({
        users: data.users ?? this.users,
        courses: data.courses ?? this.courses
      })
    }
  }
})