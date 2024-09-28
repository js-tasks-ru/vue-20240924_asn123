import { defineComponent } from 'vue';
import { createApp } from 'vue/dist/vue.esm-bundler';

const DateComponent = defineComponent({
  name: 'DateComponent',

  setup () {
    const currentDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' });

    return {
      currentDate,
    }
  },

  template: '<div>Сегодня {{ currentDate }}</div>',
})


const app = createApp(DateComponent);
app.mount('#app');
