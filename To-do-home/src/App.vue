<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HomePage from './views/HomePage.vue'
import AppLayout from './layouts/AppLayout.vue'

const router = useRouter()
const isAuthenticated = ref(false)

const handleLogin = () => {
  isAuthenticated.value = true
  router.push('/tasks')
}

const handleLogout = () => {
  isAuthenticated.value = false
  router.push('/')
}
</script>

<template>
  <RouterView v-if="!isAuthenticated" />
  <AppLayout v-else @logout="handleLogout">
    <RouterView />
  </AppLayout>
</template>