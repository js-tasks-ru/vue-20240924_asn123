import { defineComponent, ref, computed, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentTime = ref(new Date())

    const currentTimeText = computed(() => {
      return currentTime.value.toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    })

    const timerId = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)

    onUnmounted(() => {
      clearInterval(timerId)
    })

    return {
      currentTimeText: currentTimeText,
    }
  },

  template: `<div class="clock">{{ currentTimeText }}</div>`,
})
