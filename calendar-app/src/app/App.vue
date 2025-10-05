<script setup lang="ts">
import CalendarEntry from './components/CalendarEntry.vue';
import CalendarWeek from './components/CalendarWeek.vue';


</script>

<template>
  <div id="app">
    <CalendarWeek />
    <CalendarEntry />
  </div>
</template>


<style lang="scss">
html, body, #app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  margin: 0 auto;
  padding: 5% 0 5% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #6e6e6e;
}
</style>
