import { onBeforeUnmount } from 'vue'

export default function useSafeTimeout() {
  const timers = new Set<ReturnType<typeof setTimeout>>()

  const safeTimeout = (fn: () => void, delay: number): ReturnType<typeof setTimeout> => {
    const id = setTimeout(() => {
      timers.delete(id)
      fn()
    }, delay)
    timers.add(id)
    return id
  }

  const safeClear = (id: ReturnType<typeof setTimeout> | null) => {
    if (id != null) {
      clearTimeout(id)
      timers.delete(id)
    }
  }

  onBeforeUnmount(() => {
    for (const id of timers) {
      clearTimeout(id)
    }
    timers.clear()
  })

  return { safeTimeout, safeClear }
}
