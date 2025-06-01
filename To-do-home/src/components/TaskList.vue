<script setup>
import { computed } from 'vue'
import PriorityBadge from './PriorityBadge.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  onDeleteTask: {
    type: Function,
    required: true
  },
  onToggleTask: {
    type: Function,
    required: true
  }
})

const sortedTasks = computed(() => {
  return [...props.tasks].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
})
</script>

<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      <img src="@/assets/no-tasks.svg" alt="No tasks" class="empty-image">
      <h3>Немає завдань</h3>
      <p>Додайте перше завдання або оберіть інший проєкт</p>
    </div>
    
    <transition-group name="task-item" tag="ul" v-else>
      <li 
        v-for="task in sortedTasks" 
        :key="task.id" 
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <div class="task-checkbox" @click="onToggleTask(task)">
          <input 
            type="checkbox" 
            :checked="task.completed"
            class="checkbox-input"
          />
          <span class="checkmark"></span>
        </div>
        
        <div class="task-content">
          <span class="task-title">{{ task.title }}</span>
          <div class="task-meta">
            <PriorityBadge :priority="task.priority" />
            <span class="task-date">
              {{ new Date(task.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
        
        <button @click="onDeleteTask(task.id)" class="delete-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </li>
    </transition-group>
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
}

.empty-image {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  opacity: 0.6;
}

.empty-state h3 {
  margin: 10px 0 5px;
  font-size: 18px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.task-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-checkbox {
  position: relative;
  cursor: pointer;
  margin-right: 15px;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  background-color: #c7c7c7;
  border-radius: 4px;
  transition: all 0.2s;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked ~ .checkmark {
  background-color: #3498db;
}

.checkbox-input:checked ~ .checkmark:after {
  display: block;
}

.task-content {
  flex-grow: 1;
}

.task-title {
  display: block;
  color: black;
  font-size: 16px;
  margin-bottom: 5px;
}

.task-item.completed .task-title {
  color: #95a5a6;
  text-decoration: line-through;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-date {
  font-size: 12px;
  color: #95a5a6;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #95a5a6;
  padding: 5px;
  margin-left: 10px;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #e74c3c;
}

/* Анімації */
.task-item-enter-active,
.task-item-leave-active {
  transition: all 0.3s ease;
}

.task-item-enter-from,
.task-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>