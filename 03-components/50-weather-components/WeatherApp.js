import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherCard from './components/WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard,
  },

  setup() {
    const weatherData = getWeatherData()

    return {
      weatherData,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherCard v-for="region in weatherData" :region="region"/>

    </div>
  `,
})
