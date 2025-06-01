import { ref } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { auth } from '../firebase'
import { db } from '../firebase'

export function useTasks(selectedProjectId) {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)
  let unsubscribe = null

  const getTasksCollection = () => {
    const user = auth.currentUser
    if (!user) throw new Error('Користувач не авторизований')
    if (!selectedProjectId.value) throw new Error('Проєкт не вибрано')
    
    return collection(db, 'users', user.uid, 'projects', selectedProjectId.value, 'tasks')
  }

  const loadTasks = () => {
    if (!selectedProjectId.value) return
    
    loading.value = true
    try {
      const tasksCollection = getTasksCollection()
      unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
        tasks.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        loading.value = false
      }, (err) => {
        error.value = `Помилка слухача: ${err.message}`
        loading.value = false
      })
      return unsubscribe
    } catch (err) {
      error.value = `Помилка при завантаженні: ${err.message}`
      loading.value = false
    }
  }

  const addTask = async (taskData) => {
    try {
      const tasksCollection = getTasksCollection()
      const docRef = await addDoc(tasksCollection, {
        title: taskData.title,
        priority: taskData.priority,
        completed: false,
        createdAt: new Date(),
        dueDate: taskData.dueDate || null // ← нове поле
      })
      console.log('Завдання додано з ID: ', docRef.id)
    } catch (err) {
      console.error('Помилка при додаванні завдання:', err)
      error.value = `Помилка при додаванні: ${err.message}`
      throw err
    }
  }

  const updateTask = async (taskId, updatedData) => {
    try {
      const tasksCollection = getTasksCollection()
      const taskDoc = doc(tasksCollection, taskId)
      await updateDoc(taskDoc, updatedData) // updatedData повинен містити dueDate
    } catch (err) {
      error.value = `Помилка оновлення: ${err.message}`
    }
  }

  const deleteTask = async (id) => {
    try {
      const taskDoc = doc(getTasksCollection(), id)
      await deleteDoc(taskDoc)
    } catch (err) {
      error.value = `Помилка при видаленні: ${err.message}`
    }
  }

  const toggleTask = async (task) => {
    try {
      const taskDoc = doc(getTasksCollection(), task.id)
      await updateDoc(taskDoc, {
        completed: !task.completed
      })
    } catch (err) {
      error.value = `Помилка при оновленні: ${err.message}`
    }
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  }
}