<script setup>
  import { reactive, ref } from 'vue'
  import { store } from '@/store'
  import CommonButton from '../../common/Button/Button.vue'
  import CommonInput from '../../common/Input/Input.vue'

  const formData = reactive({
    email: '',
    name: '',
    password: '',
  })

  const errors = reactive({
    email: '',
    name: '',
    password: ''
  })

  const isLoading = ref(false)

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    let isValid = true

    if (!formData.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email'
      isValid = false
    } else {
      errors.email = ''
    }

    if (!formData.password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
      isValid = false
    } else {
      errors.password = ''
    }

    if (!formData.name) {
      errors.name = 'Please confirm your password'
      isValid = false
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long'
      isValid = false
    } else {
      errors.name = ''
    }

    return isValid
  }

  const handleEmailChange = (e) => {
    formData.email = e.target.value
    errors.email = ''
  }

  const handlePasswordChange = (e) => {
    formData.password = e.target.value
    errors.password = ''
  }

  const handleNameChange = (e) => {
    formData.name = e.target.value
    errors.name = ''
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    isLoading.value = true
    // Simulate API call
    setTimeout(() => {
      store.addUser({email: formData.email, name: formData.name});
      window.location.href = '/login'
      isLoading.value = false
    }, 500)
  }

  const handleLoginClick = () => {
    window.location.href = '/login'
  }
</script>

<template>
  <div class="registration-container">
    <h1>Create Account</h1>
    <form class="form-container" @submit.prevent="handleRegister">
      <CommonInput
        labelText="Email"
        placeholderText="Enter your email"
        type="email"
        :value="formData.email"
        :errorText="errors.email"
        @change="handleEmailChange"
      />

      <CommonInput
        labelText="Name"
        placeholderText="Enter your name"
        type="text"
        :value="formData.name"
        :errorText="errors.name"
        @change="handleNameChange"
      />

      <CommonInput
        labelText="Password"
        placeholderText="Enter your password"
        type="password"
        :value="formData.password"
        :errorText="errors.password"
        @change="handlePasswordChange"
      />

      <CommonButton
        type="submit"
        :disabled="isLoading"
        @click="handleRegister"
      >
        {{ isLoading ? 'Registering...' : 'Register' }}
      </CommonButton>

      <p class="login-link">
        Already have an account?
        <a href="/login" @click.prevent="handleLoginClick">Login here</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
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