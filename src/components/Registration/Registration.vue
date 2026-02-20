<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '@/store'

const router = useRouter()
const store = useCourseStore()

const formData = reactive({
  email: '',
  name: '',
  password: ''
})

const errors = reactive({
  email: '',
  name: '',
  password: '',
  common: ''
})

const isLoading = ref(false)

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateForm = () => {
  let isValid = true
  errors.common = ''

  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  } else {
    errors.email = ''
  }

  if (!formData.name) {
    errors.name = 'Name is required'
    isValid = false
  } else if (formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  } else {
    errors.name = ''
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  } else {
    errors.password = ''
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true

  const existingUser = store.users.find(
    user => user.email === formData.email
  )

  if (existingUser) {
    errors.common = 'User with this email already exists'
    isLoading.value = false
    return
  }

  store.addUser({
    email: formData.email,
    name: formData.name,
    password: formData.password
  })

  isLoading.value = false
  router.push('/login')
}

const handleLoginClick = () => {
  router.push('/login')
}
</script>

<template>
  <div class="registration-container">
    <h1>Create Account</h1>

    <form class="form-container" @submit.prevent="handleRegister">
      <Input
        labelText="Email"
        placeholderText="Enter your email"
        type="email"
        :value="formData.email"
        :errorText="errors.email"
        @change="e => (formData.email = e.target.value)"
      />

      <Input
        labelText="Name"
        placeholderText="Enter your name"
        type="text"
        :value="formData.name"
        :errorText="errors.name"
        @change="e => (formData.name = e.target.value)"
      />

      <Input
        labelText="Password"
        placeholderText="Enter your password"
        type="password"
        :value="formData.password"
        :errorText="errors.password"
        @change="e => (formData.password = e.target.value)"
      />

      <p v-if="errors.common" class="error-message">
        {{ errors.common }}
      </p>

      <Button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </Button>

      <p class="login-link">
        Already have an account?
        <a href="/login" @click.prevent="handleLoginClick">
          Login here
        </a>
      </p>
    </form>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  margin-bottom: 15px;
}

.registration-container {
  width: 585px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.registration-container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-container {
  padding: 40px 50px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-container button {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
}

.login-link {
  text-align: center;
  margin: 20px 0 0;
  font-size: 14px;
}

.login-link a {
  color: #007298;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.login-link a:hover {
  color: #005a73;
  text-decoration: underline;
}
</style>