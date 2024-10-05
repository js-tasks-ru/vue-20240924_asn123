import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup () {
    const weatherData = getWeatherData();

    function getCondition(region) {
      if (!(region.current?.weather)) {
        return null;
      }

      return  {
        icon: WeatherConditionIcons[region.current.weather.id],
        description: region.current.weather.description,
        main: region.current.weather.main,
      }
    }

    function getTemperature(region) {
      if (!(region.current)) {
        return null;
      }

      return (region.current.temp - 273.15).toFixed(1);
    }

    function getPressure(region) {
      if (!(region.current)) {
        return null;
      }

      return (region.current.pressure * 0.75).toFixed(0);
    }

    function getIsNight(region) {
      if (!(region.current)) {
        return false;
      }
      return (region.current.dt < region.current.sunrise) || (region.current.dt > region.current.sunset);
    }

    return {
      weatherData,
      getCondition,
      getTemperature,
      getPressure,
      getIsNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul v-for="region in weatherData" class="weather-list unstyled-list">
        <li class="weather-card"
        :class="{'weather-card--night': getIsNight(region)}">
          <div v-if="!!region.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ region.alert.sender_name }}: {{ region.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ region.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ region.current?.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="getCondition(region)?.description">{{ getCondition(region)?.icon }}</div>
            <div class="weather-conditions__temp">{{ getTemperature(region) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressure(region) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ region.current?.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ region.current?.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ region.current?.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
