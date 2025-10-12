<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { store } from '../store';

const eventInput = ref('');

const titleOfActivityDay = computed(() => {
  return store.getters.activeDay()!.fullTitle;
})

const textEditValue = computed(() => {
  return store.getters.activeEventsDescription(store.getters.activeDay()!.id);
})

const handleSubmit = () => {
  if (eventInput.value.trim() === '') return;
  store.actions.setNewEvent(eventInput.value);
}

watch(textEditValue, (newEvent) => {
  eventInput.value = ''
  if (newEvent) eventInput.value = newEvent

}, { immediate: true }) // immediate: true ejecuta el watch inmediatamente

</script>

<template>
  <div id="calendar-entry">
    <form @submit.prevent="handleSubmit" class="calendar-entry-note">
      <input type="text" placeholder="New Event" v-model="eventInput" />
      <div class="calendar-entry-day">
        <span class="bold">Day:{{ titleOfActivityDay }}</span> Monday, 12th
      </div>
      <button type="submit" class="button is-primary submit">Add Event</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#calendar-entry {
  background: #FFF;
  border: 1px solid #42b883;
  border-radius: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;

  .calendar-entry-note {
    input {
      width: 200px;
      font-weight: 600;
      border: 0;
      border-bottom: 1px solid #CCC;
      font-size: 15px;
      height: 30px;
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }

    .calendar-entry-day {
      color: #42b883;
      font-size: 12px;
      margin-bottom: 10px;
      padding-bottom: 5px;

      .bold {
        font-weight: 600;
      }
    }

    .submit {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
