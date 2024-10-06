import { defineComponent, computed } from 'vue'
import { WeatherConditionIcons } from '../weather.service.ts'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    regionCurrent: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const regionCurrent = props.regionCurrent

    const condition = computed(() => {
      if (!regionCurrent?.weather) {
        return null
      }

      return {
        icon: WeatherConditionIcons[regionCurrent.weather.id],
        description: regionCurrent.weather.description,
        main: regionCurrent.weather.main,
        temperature: (regionCurrent.temp - 273.15).toFixed(1),
      }
    })

    return {
      condition,
    }
  },

  template: `
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="condition?.description">{{ condition?.icon }}</div>
            <div class="weather-conditions__temp">{{ condition?.temperature }} °C</div>
          </div>
  `,
})
