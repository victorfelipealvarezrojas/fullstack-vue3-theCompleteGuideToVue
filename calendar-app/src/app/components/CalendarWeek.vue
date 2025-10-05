<script setup lang="ts">
import { store } from '../store';
import CalendarDay from './CalendarDay.vue';

const sharedState = store.state;

</script>

<template>
  <div id="calendar-week">
    <div class="columns is-mobile">
      <calendar-day v-for="day in sharedState.data" :key="day.id" :day="day" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#calendar-week {
  margin-bottom: 50px;
  width: 90%;
  margin: 0 auto;
  .column {
    padding: 0 0 0 0;
  }
}
</style>

