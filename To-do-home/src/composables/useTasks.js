import { ref, onUnmounted } from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export function useTasks() {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)
  let unsubscribe = null

  const getUserTasksCollection = () => {
    const user = auth.currentUser
    if (!user) throw new Error('Користувач не авторизований')
    return collection(db, 'users', user.uid, 'tasks')
  }

  const loadTasks = () => {
    loading.value = true
    try {
      const tasksCollection = getUserTasksCollection()

      unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
        tasks.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        loading.value = false
      })
    } catch (err) {
      error.value = `Помилка при завантаженні: ${err.message}`
      loading.value = false
    }
  }

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  const addTask = async (taskData) => {
    loading.value = true
    try {
      const tasksCollection = getUserTasksCollection()
      await addDoc(tasksCollection, {
        title: taskData.title,
        priority: taskData.priority,
        completed: false,
        createdAt: new Date()
      })
      error.value = null
    } catch (err) {
      error.value = `Помилка при додаванні: ${err.message}`
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id) => {
    try {
      const taskDoc = doc(getUserTasksCollection().parent, 'tasks', id) // .parent is 'users/{uid}'
      await deleteDoc(taskDoc)
    } catch (err) {
      error.value = `Помилка при видаленні: ${err.message}`
    }
  }

  const toggleTask = async (task) => {
    try {
      const taskDoc = doc(getUserTasksCollection().parent, 'tasks', task.id)
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
    deleteTask,
    toggleTask
  }
}
