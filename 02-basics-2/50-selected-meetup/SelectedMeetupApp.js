import { defineComponent, ref, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupIds = [1, 2, 3, 4, 5]

    const selectedIndex = ref(0)

    let meetupData = ref(null)

    async function loadCurrentMeetup() {
      try {
        meetupData.value = await getMeetup(meetupIds[selectedIndex.value])
      } catch {
        meetupData.value = null
      }
      return
    }

    watch([selectedIndex], async () => {
      await loadCurrentMeetup()
    })

    onMounted(async () => {
      await loadCurrentMeetup()
    })
    return {
      meetupIds: meetupIds,
      selectedIndex: selectedIndex,
      meetupData: meetupData,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button :disabled="selectedIndex <= 0" @click="selectedIndex--" class="button button--secondary" type="button">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="(meetupId, index) in meetupIds" class="radio-group__button">
            <input
              :id="'meetup-id-' + meetupId"
              v-model="selectedIndex"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="index"
            />
            <label :for="'meetup-id-' + meetupId" class="radio-group__label">{{ meetupId }}</label>
          </div>
        </div>

        <button :disabled="selectedIndex + 1  >= meetupIds.length" @click="selectedIndex++" class="button button--secondary" type="button">Следующий</button>
      </div>
      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title"> {{ (!!meetupData ? meetupData.title : 'Ничего не выбрано.')}}</h1>
        </div>
      </div>
    </div>
  `,
})
