<script setup>
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.vue'
import MeetupDescription from './MeetupDescription.vue'
import MeetupCover from './MeetupCover.vue'
import MeetupInfo from './MeetupInfo.vue'

defineProps({
  meetup: {
    type: Object,
  },

})

</script>

<template>
  <div>
    <!-- Обложка митапа -->
    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <MeetupCover :title="meetup.title" :image="meetup.image" />
          <h2>Описание</h2>
          <!-- Описание митапа -->
          <MeetupDescription :description="meetup.description" />

          <h2>Программа</h2>

          <MeetupAgenda v-if="meetup.agenda?.length" :agenda="meetup.agenda" />

          <!-- Программа митапа -->
          <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
          <UiAlert v-if="!meetup.agenda?.length">Программа пока пуста...</UiAlert>

        </div>
        <div class="meetup__aside">

          <!-- Краткая информация о митапе -->
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />

          <div class="meetup__aside-buttons"></div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
