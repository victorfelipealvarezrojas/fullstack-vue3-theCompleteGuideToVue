<script lang="ts" setup>
import { ref } from 'vue';

const inputValue = ref('');

const props = defineProps<{
  dayId: number
  eventCalendar: {
    details: string
    edit: boolean
  }
}>()

function getEventBackgroundColor() {
  const colors = ['#FF9999', '#85D6FF', '#99FF99'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `background-color: ${randomColor}`;
}

function editSubmit() {
  emit('edit', props.dayId, props.eventCalendar.details);
}

function deleteEvent() {
  emit('delete', props.dayId, props.eventCalendar.details);
}

function editElement() {

  if (inputValue.value.trim() === '') return;

   emit('update',
    props.dayId,
    props.eventCalendar.details,
    inputValue.value)
}

const emit = defineEmits<{
  edit: [dayId: number, details: string]
  delete: [dayId: number, details: string]
  update: [dayId: number, oldDec: string, newDec: string]
}>();

</script>

<template>
  <div>
    <div v-if="!eventCalendar.edit" class="day-event" :style="getEventBackgroundColor()">
      <span class="has-text-centered details">{{ eventCalendar.details }}</span>
      <div class="has-text-centered icons">
        <i @click="editSubmit" class="fa-solid fa-pen-to-square edit-icon"></i>
        <i @click="deleteEvent" class="fa-solid fa-trash delete-icon"></i>
      </div>
    </div>
    <div v-if="eventCalendar.edit">
      <input type="text" v-model="inputValue" :placeholder="eventCalendar.details"/>
      <div class="has-text-centered icons">
      <i @click="editElement" class="fa fa-check"></i>
    </div>
</div>
  </div>
</template>

<style lang="scss">
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;

  .details {
    display: block;
  }

  .icons.fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #FFF;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
