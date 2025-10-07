<script setup lang="ts">
import type { dataInterface } from '../seed';
import CalendarEvent from './CalendarEvent.vue';
import { store } from '../store';

const props = defineProps<{
  day: dataInterface
}>()

const setActiveDaySelector = () => {
  store.actions.setActive(props.day.id);
}

</script>

<template>
  <div class="day column" @:click="setActiveDaySelector">
    <div class="day-banner has-text-centered">{{ props.day.abbvTitle }}</div>
    <div class="day-details">
      <div class="day-number">{{ props.day.id }}</div>
      <CalendarEvent v-for="(event, index) in day.events" :key="index" :event-calendar="event" />
    </div>
  </div>
</template>

<style lang="scss">
.day {
  background-color: #4A4A4A;
  color: #FFF;
  border-left: 1px solid #8F8F8F;
  border-bottom: 1px solid #8F8F8F;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: (#b32222, 3%);
  }

  .day-banner {
    background-color: #333333;
    color: #FFF;
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: 600;
  }

  .day-details {
    padding: 10px;
  }

  &:last-child {
    border-right: 1px solid #8F8F8F;
  }

  .day-event {

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
}
</style>
