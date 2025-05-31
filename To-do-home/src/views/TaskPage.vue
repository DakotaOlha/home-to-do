<script setup>
import { useTasks } from '../composables/useTasks'
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'

const { tasks, loadTasks } = useTasks()
loadTasks()
</script>

<template>
  <div class="task-page">
    <div class="header">
      <h1 class="title">
        <span class="icon">📋</span>
        Мої завдання
      </h1>
      <div class="controls">
        <button class="add-btn">+ Новий проект</button>
      </div>
    </div>
    
    <div class="content">
      <AddTask class="add-task-container" />
      <TaskList class="task-list-container" />
    </div>
  </div>
</template>

<style scoped>
.task-page {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 20px 30px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
}

.title .icon {
  margin-right: 12px;
  font-size: 28px;
}

.controls {
  display: flex;
  gap: 10px;
}

.add-btn {
  background-color: #db4c3f;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}

.add-btn:hover {
  background-color: #c53727;
}

.content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 20px;
}

.add-task-container {
  margin-bottom: 25px;
}

.task-list-container {
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
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