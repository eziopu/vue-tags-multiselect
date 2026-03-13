import { ref, computed } from 'vue'
import type { TagModel } from '../types'

export default function useExpose(dep: Record<string, any>) {

  const init = dep.init
  const isActive = dep.isActive

  const focus = (): void => {
    isActive.value = true
  }

  const blur = (): void => {
    isActive.value = false
    init('expose blur()')
  }

  const elInputValue = dep.elInputValue
  const clear = (): void => {
    elInputValue.value = ''
  }

  const tags: TagModel[] = dep.tags
  const clearTags = (): void => {
    tags.splice(0, tags.length)
  }

  const rerenderCount = ref(0)
  const initialize = (): void => {
    init('expose initialize()')
    clearTags()
    rerenderCount.value += 1
  }

  const elAppKeyForRerender = computed(() => {
    return `elApp${rerenderCount.value}`
  })

  const pushTag = dep.pushTag

  return {
    elAppKeyForRerender,
    exposed: { initialize, focus, blur, clear, clearTags, pushTag },
  }
}
