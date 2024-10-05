import { defineComponent, computed } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupAgenda,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  /*
  setup(props) {
    const meetup = computed(() => props.meetup)

    return {
      //meetup: meetup,
    }
  },
*/

  template: `
    <div>

      <!-- Обложка митапа -->

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <MeetupCover :title="meetup.title" :image="meetup.image"/>
            <h2>Описание</h2>

            <!-- Описание митапа -->
            <MeetupDescription :description="meetup.description"/>

            <h2>Программа</h2>

            <MeetupAgenda v-if="meetup.agenda?.length" :agenda="meetup.agenda"/>

            <!-- Программа митапа -->
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <UiAlert v-if="!meetup.agenda?.length">Программа пока пуста...</UiAlert>

          </div>
          <div class="meetup__aside">

            <!-- Краткая информация о митапе -->

            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
