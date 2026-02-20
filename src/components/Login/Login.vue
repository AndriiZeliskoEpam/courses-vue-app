<script setup>
  import { reactive, ref } from 'vue'
  import { useCourseStore } from '../../store'

  const store = useCourseStore()

  const credentials = reactive({
    email: '',
    password: ''
  })

  const errors = reactive({
    email: '',
    password: '',
    common: ''
  })

  const isLoading = ref(false)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    let isValid = true
    errors.common = ''

    if (!credentials.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(credentials.email)) {
      errors.email = 'Please enter a valid email'
      isValid = false
    } else {
      errors.email = ''
    }

    if (!credentials.password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (credentials.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
      isValid = false
    } else {
      errors.password = ''
    }

    return isValid
  }

  const handleLogin = () => {
    if (!validateForm()) return

    isLoading.value = true

    setTimeout(() => {
      const user = store.users.find(
        u => u.email === credentials.email
      )

      if (!user) {
        errors.common = 'User with this email does not exist'
        isLoading.value = false
        return
      }

      if (user.password !== credentials.password) {
        errors.common = 'Incorrect password'
        isLoading.value = false
        return
      }

      // Save logged-in user
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name
        })
      )

      window.location.href = '/courses'
      isLoading.value = false
    }, 500)
  }

  const handleRegisterClick = () => {
    window.location.href = '/register'
  }
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>

    <form class="form-container" @submit.prevent="handleLogin">
      <Input
        labelText="Email"
        placeholderText="Enter your email"
        type="email"
        :value="credentials.email"
        :errorText="errors.email"
        @change="e => credentials.email = e.target.value"
      />

      <Input
        labelText="Password"
        placeholderText="Enter your password"
        type="password"
        :value="credentials.password"
        :errorText="errors.password"
        @change="e => credentials.password = e.target.value"
      />

      <p v-if="errors.common" class="error-message">
        {{ errors.common }}
      </p>

      <Button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </Button>

      <p class="register-link">
        Don't have an account?
        <a href="/register" @click.prevent="handleRegisterClick">
          Register here
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

.login-container {
  width: 585px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.login-container h1 {
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

.register-link {
  text-align: center;
  margin: 20px 0 0;
  font-size: 14px;
}

.register-link a {
  color: #007298;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #005a73;
  text-decoration: underline;
}
</style>