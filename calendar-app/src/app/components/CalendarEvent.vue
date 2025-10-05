<script lang="ts" setup>

defineProps<{
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

</script>

<template>
  <div>
    <div class="day-event" :style="getEventBackgroundColor()">
      <span class="has-text-centered details">{{ eventCalendar.details }}</span>
      <div class="has-text-centered icons">
        <i class="fa-solid fa-pen-to-square edit-icon"></i>
        <i class="fa-solid fa-trash delete-icon"></i>
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
