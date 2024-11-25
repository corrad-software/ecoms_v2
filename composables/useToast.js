import { ref } from 'vue'

const TOAST_TIMEOUT = 5000

export const toasts = ref([])

export function useToast() {
  const add = ({
    title,
    description,
    type = 'default',
    duration = TOAST_TIMEOUT,
    action,
  }) => {
    const id = Math.random().toString(36).slice(2, 9)
    const toast = {
      id,
      title,
      description,
      type,
      action,
    }

    toasts.value.push(toast)

    if (duration !== Infinity) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    add,
    remove,
    toasts,
  }
}