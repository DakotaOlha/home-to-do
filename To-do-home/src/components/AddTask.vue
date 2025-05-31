<script setup>
import { ref } from 'vue'
import { useTasks } from '../composables/useTasks'

const { addTask } = useTasks()
const newTask = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!newTask.value.trim()) return

  loading.value = true
  try {
    await addTask({
      title: newTask.value.trim(),
      priority: 'medium',
      done: false,
      createdAt: new Date()
    })
    newTask.value = ''
  } catch (error) {
    console.error('Помилка при додаванні завдання:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="add-task-form">
    <input
      v-model="newTask"
      type="text"
      placeholder="+ Додати завдання"
      class="task-input"
      :disabled="loading"
    />
    <button type="submit" class="submit-btn" :disabled="loading">
      <span v-if="!loading">Додати</span>
      <span v-else class="loader"></span>
    </button>
  </form>
</template>

<style scoped>
.add-task-form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #db4c3f;
}

.task-input::placeholder {
  color: #9e9e9e;
}

.submit-btn {
  background-color: #db4c3f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #c53727;
}

.submit-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
