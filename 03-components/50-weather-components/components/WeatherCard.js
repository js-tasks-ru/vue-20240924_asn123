import { defineComponent, computed } from 'vue'
import WeatherDetailItem from './WeatherDetailItem.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherAlert from './WeatherAlert.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetailItem,
  },

  props: {
    region: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const region = props.region

    const isNight = computed(() => {
      if (!region.current) {
        return false
      }
      return region.current.dt < region.current.sunrise || region.current.dt > region.current.sunset
    })

    const wheatherDetails = computed(() => {
      return [
        {
          name: 'Давление, мм рт. ст.',
          value: (region.current?.pressure * 0.75).toFixed(0).toString(),
        },
        {
          name: 'Влажность, %',
          value: region.current?.humidity?.toString(),
        },
        {
          name: 'Облачность, %',
          value: region.current?.clouds?.toString(),
        },
        {
          name: 'Ветер, м/с',
          value: region.current?.wind_speed?.toString(),
        },
      ]
    })

    return {
      isNight,
      wheatherDetails,
    }
  },

  template: `
      <ul class="weather-list unstyled-list">
        <li class="weather-card"
        :class="{'weather-card--night': isNight}">
          <WeatherAlert :alert="region.alert"/>
          <div>
            <h2 class="weather-card__name">
              {{ region.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ region.current?.dt }}
            </div>
          </div>
          <WeatherConditions :region-current="region.current"/>
          <div class="weather-details">
            <WeatherDetailItem v-for="detail in wheatherDetails" :name="detail.name" :value="detail.value"/>
          </div>
        </li>
      </ul>
  `,
})
