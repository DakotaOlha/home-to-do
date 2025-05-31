<script setup>
import { computed, onMounted } from 'vue'
import { useTasks } from '../composables/useTasks'
import PriorityBadge from './PriorityBadge.vue'

const { tasks, loadTasks, deleteTask, toggleTask } = useTasks()

// Завантажуємо завдання при монтуванні компонента
onMounted(() => {
  loadTasks()
})

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
})
</script>

<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      Немає завдань. Додайте перше завдання!
    </div>
    
    <transition-group name="task-item" v-else>
      <div 
        v-for="task in sortedTasks" 
        :key="task.id" 
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <input 
            type="checkbox" 
            :checked="task.completed" 
            @change="toggleTask(task)"
            class="task-checkbox"
          />
          <span class="task-title">{{ task.title }}</span>
          <PriorityBadge :priority="task.priority" />
        </div>
        <button @click="deleteTask(task.id)" class="delete-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#888" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 6L18 18" stroke="#888" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>