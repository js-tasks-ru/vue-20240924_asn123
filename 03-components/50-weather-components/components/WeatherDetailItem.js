import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetailItem',

  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      deafult: '',
    },
  },

  setup() {},

  template: `
            <div class="weather-details__item">
              <div class="weather-details__item-label">{{ name }}</div>
              <div class="weather-details__item-value">{{ value }}</div>
            </div>
  `,
})
