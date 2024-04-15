import { ref, computed } from "vue";
export default function useExpose(_props, context, dep) {

  const init = dep.init;
  const isActive = dep.isActive;

  const focus = () => {
    isActive.value = true;
  }

  const blur = () => {
    isActive.value = false;
    init("expose blur()");
  }

  const tags = dep.tags;
  const rerenderCount = ref(0);
  const initialize = () => {
    init("expose initialize()");
    tags.splice(0, tags.length);
    rerenderCount.value += 1;
  }

  const elAppKeyForRerender = computed(() => {
    return `elApp${rerenderCount.value}`
  });

  const pushTag = dep.pushTag;
  context.expose({ pushTag, focus, blur, initialize })

  return {
    elAppKeyForRerender
  };
}
