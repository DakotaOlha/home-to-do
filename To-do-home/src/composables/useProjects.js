import { onUnmounted } from 'vue'
import { ref } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export function useProjects() {
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)
  let unsubscribe = null

  const getUserProjectsCollection = () => {
    const user = auth.currentUser
    if (!user) throw new Error('Користувач не авторизований')
    return collection(db, 'users', user.uid, 'projects')
  }

  const loadProjects = () => {
    loading.value = true
    try {
      const projectsCollection = getUserProjectsCollection()
      unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
        projects.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        loading.value = false
      })
    } catch (err) {
      error.value = `Помилка при завантаженні проєктів: ${err.message}`
      loading.value = false
    }
  }

  const addProject = async (name) => {
    try {
      const collectionRef = getUserProjectsCollection()
      await addDoc(collectionRef, {
        name,
        createdAt: new Date()
      })
    } catch (err) {
      error.value = `Помилка при додаванні проєкту: ${err.message}`
    }
  }

  const deleteProject = async (projectId) => {
    try {
      const user = auth.currentUser
      if (!user) throw new Error('Користувач не авторизований')

      const projectDocRef = doc(db, 'users', user.uid, 'projects', projectId)
      await deleteDoc(projectDocRef)
    } catch (err) {
      error.value = `Помилка при видаленні проєкту: ${err.message}`
    }
  }

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  return {
    projects,
    loading,
    error,
    loadProjects,
    addProject,
    deleteProject 
  }
}
