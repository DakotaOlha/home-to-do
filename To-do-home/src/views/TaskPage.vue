<script setup>
import { ref, watch, watchEffect, onUnmounted } from 'vue'
import { useProjects } from '../composables/useProjects'
import { useTasks } from '../composables/useTasks'
import AddTask from '../components/AddTask.vue'
import TaskList from '../components/TaskList.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const selectedProjectId = ref(null)

const { 
  projects, 
  loadProjects, 
  addProject, 
  error: projectsError 
} = useProjects()

const { 
  tasks, 
  loading: tasksLoading, 
  error: tasksError, 
  loadTasks, 
  addTask: addTaskToFirestore, 
  deleteTask, 
  toggleTask,
  updateTask
} = useTasks(selectedProjectId)

const handleUpdateTask = async (taskId, updatedData) => {
  try {
    await updateTask(taskId, updatedData)
  } catch (err) {
    console.error('Помилка редагування завдання:', err)
  }
}

let unsubscribeTasks = null

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      await loadProjects()
    } catch (err) {
      console.error('Помилка завантаження проектів:', err)
    }
  }
})

watchEffect(() => {
  if (!selectedProjectId.value && projects.value?.length > 0) {
    selectedProjectId.value = projects.value[0].id
  }
})

watch(
  selectedProjectId,
  (newId) => {
    if (!newId) return
    
    if (unsubscribeTasks) {
      unsubscribeTasks()
      unsubscribeTasks = null
    }
    
    try {
      unsubscribeTasks = loadTasks()
    } catch (err) {
      console.error('Помилка завантаження завдань:', err)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (unsubscribeTasks) unsubscribeTasks()
})

const handleAddProject = async () => {
  const name = prompt('Назва нового проєкту:')
  if (name) {
    try {
      await addProject(name)
    } catch (err) {
      console.error('Помилка додавання проекту:', err)
    }
  }
}

const { deleteProject } = useProjects() 

const handleDeleteProject = async (projectId) => {
  const confirmed = confirm('Ви дійсно хочете видалити цей проєкт?')
  if (!confirmed) return

  try {
    await deleteProject(projectId)
    if (selectedProjectId.value === projectId) {
      selectedProjectId.value = null
    }
  } catch (err) {
    console.error('Помилка видалення проекту:', err)
  }
}

const handleAddTask = async (taskData) => {
  if (!selectedProjectId.value) {
    console.error('Проект не вибрано')
    return
  }
  
  try {
    await addTaskToFirestore(taskData)
  } catch (err) {
    console.error('Помилка додавання завдання:', err)
  }
}
</script>

<template>
  <div class="task-page">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2 class="sidebar-title">Мої проєкти</h2>
        <button @click="handleAddProject" class="new-project-btn">
          <span>+</span> Новий
        </button>
      </div>
      
      <div v-if="projectsError" class="error-message">{{ projectsError }}</div>
      
      <ul class="projects-list">
        <li
        v-for="project in projects"
          :key="project.id"
          :class="{ active: project.id === selectedProjectId }"
          @click="selectedProjectId = project.id"
        >
          <span class="project-icon">📁</span>
          <span class="project-name">{{ project.name }}</span>

          <span 
            v-if="project.id === selectedProjectId" 
            class="active-indicator"
          ></span>

          <button 
            class="delete-project-btn" 
            @click.stop="handleDeleteProject(project.id)"
            title="Видалити проєкт"
          >X</button>


        </li>
      </ul>
    </aside>

    <main class="main-content">
      <div class="content-header">
        <h1 class="content-title">
          <span v-if="selectedProjectId">
            {{ projects.find(p => p.id === selectedProjectId)?.name || 'Мої завдання' }}
          </span>
          <span v-else>Оберіть проєкт</span>
        </h1>
        <div v-if="tasksError" class="error-message">{{ tasksError }}</div>
      </div>

      <div class="content-body">
        <AddTask 
          v-if="selectedProjectId" 
          @add-task="handleAddTask"
        />
        
        <div v-if="tasksLoading" class="loading-state">
          <div class="spinner"></div>
          <span>Завантаження завдань...</span>
        </div>
        
        <TaskList 
          v-else
          :tasks="tasks" 
          @delete-task="deleteTask"
          @toggle-task="toggleTask"
          @update-task="handleUpdateTask"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.task-page {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  width: 18vw;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.new-project-btn {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s;
}

.new-project-btn:hover {
  background-color: #2980b9;
}

.new-project-btn span {
  font-size: 18px;
}

.projects-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.projects-list li {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  transition: background-color 0.2s;
}

.projects-list li:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.projects-list li.active {
  background-color: #3498db;
}

.project-icon {
  margin-right: 10px;
  font-size: 16px;
}

.project-name {
  flex-grow: 1;
}

.active-indicator {
  width: 8px;
  height: 8px;
  background-color: #2ecc71;
  border-radius: 50%;
  margin-left: 10px;
}

.main-content {
  width: 82vw;
  padding: 30px;
  background-color: white;
  border-radius: 8px 0 0 0;
}

.content-header {
  margin-bottom: 25px;
}

.content-title {
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 10px;
  font-weight: 600;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f8c8d;
  padding: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(52, 152, 219, 0.3);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

.delete-project-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.2s;
}

.delete-project-btn:hover {
  color: #c0392b;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #fdecea;
  color: #d32f2f;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .task-page {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    padding: 15px;
  }
  
  .main-content {
    padding: 20px;
  }
}
</style>