<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>HomeTask Manager</h1>
      <p class="subtitle">Організуйте ваші домашні справи легко та зручно</p>
      
      <div class="auth-buttons">
        <button @click="navigateTo('/login')" class="btn primary">Увійти</button>
        <button @click="navigateTo('/register')" class="btn secondary">Зареєструватися</button>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>Керування завданнями</h3>
        <p>Додавайте, редагуйте та видаляйте завдання</p>
      </div>
      <div class="feature-card">
        <h3>Пріоритети</h3>
        <p>Встановлюйте пріоритети для ваших справ</p>
      </div>
      <div class="feature-card">
        <h3>Планування</h3>
        <p>Організовуйте ваш день ефективно</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  height: 75vh;
  align-content: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary {
  background-color: #fff;
  color: #6e8efb;
}

.secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.feature-card p {
  color: #666;
}
</style>