<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const title = ref('')
const priority = ref('medium')

const handleSubmit = () => {
  if (!title.value.trim()) return
  
  emit('add-task', {
    title: title.value,
    priority: priority.value
  })
  
  title.value = ''
}
</script>

<template>
  <div class="add-task-form">
    <input
      v-model="title"
      type="text"
      placeholder="Назва завдання"
      class="task-input"
      @keyup.enter="handleSubmit"
    />
    <select v-model="priority" class="priority-select">
      <option value="low">Низький</option>
      <option value="medium">Середній</option>
      <option value="high">Високий</option>
    </select>
    <button @click="handleSubmit" class="add-btn">
      Додати
    </button>
  </div>
</template>

<style scoped>
.add-task-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.priority-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-btn {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #3367d6;
}
</style>