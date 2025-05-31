<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/tasks')
  } catch (e) {
    error.value = 'Помилка входу: ' + e.message
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Увійти в акаунт</h2>
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required>
        </div>
        
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required>
        </div>
        
        <button type="submit" class="auth-btn">Увійти</button>
        
        <p class="auth-link">
          Ще не маєте акаунту? <router-link to="/register">Зареєструватися</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
    width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.auth-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #6e8efb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.auth-btn:hover {
  background-color: #5a7df4;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.auth-link a {
  color: #6e8efb;
  text-decoration: none;
}
.error-message {
  color: #d9534f;
  background-color: #fcebea;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

</style>