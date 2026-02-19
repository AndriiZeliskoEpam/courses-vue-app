<script setup>
  import { reactive, ref } from 'vue'
  import { store } from '@/store'
  import CommonButton from '../../common/Button/Button.vue'
  import CommonInput from '../../common/Input/Input.vue'

  const credentials = reactive({
    email: '',
    password: ''
  })

  const errors = reactive({
    email: '',
    password: ''
  })

  const isLoading = ref(false)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    let isValid = true
    
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
      errors.password = 'Password must be at least 8 characters long'
      isValid = false
    } else {
      errors.password = ''
    }

    return isValid
  }

  const handleEmailChange = (e) => {
    credentials.email = e.target.value
    errors.email = ''
  }

  const handlePasswordChange = (e) => {
    credentials.password = e.target.value
    errors.password = ''
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    isLoading.value = true
    // Simulate API call
    setTimeout(() => {
      const getUser = store.users.find(user => user.email === credentials.email)
      if (getUser) {
        localStorage.setItem('user', JSON.stringify({email: credentials.email, name: credentials.name}));
        window.location.href = '/courses'
        isLoading.value = false
      }
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
      <CommonInput
        labelText="Email"
        placeholderText="Enter your email"
        type="email"
        :value="credentials.email"
        :errorText="errors.email"
        @change="handleEmailChange"
      />
      
      <CommonInput
        labelText="Password"
        placeholderText="Enter your password"
        type="password"
        :value="credentials.password"
        :errorText="errors.password"
        @change="handlePasswordChange"
      />

      <CommonButton
        type="submit"
        :disabled="isLoading"
        @click="handleLogin"
      >
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </CommonButton>

      <p class="register-link">
        Don't have an account?
        <a href="/register" @click.prevent="handleRegisterClick">Register here</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
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