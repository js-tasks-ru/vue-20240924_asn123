import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    function inc() {
      emit('update:count', props.count + 1)
    }

    function dec() {
      emit('update:count', props.count - 1)
    }

    return {
      inc,
      dec,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="dec">➖</UiButton>
      <span class="count" data-testid="count"> {{ count }} </span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="inc">➕</UiButton>
    </div>
  `,
})
