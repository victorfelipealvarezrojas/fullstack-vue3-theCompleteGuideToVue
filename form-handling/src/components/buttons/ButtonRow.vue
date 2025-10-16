<script setup lang="ts">
const onButtonClick = (evt: Event) => {
  const button = evt.target as HTMLButtonElement;
  console.log(`The user clicked ${button.name}: ${button.value}`);
};
</script>

<template>
  <div class="button-list">
    <button
      @click="onButtonClick"
      name="button-hoodie"
      value="fullstack-hoodie"
      class="ui button"
    >
      Hoodie
    </button>
    <button
      @click="onButtonClick"
      name="button-tee"
      value="fullstack-tee"
      class="ui button"
    >
      Tee
    </button>
    <button
      @click="onButtonClick"
      name="button-fitted-cap"
      value="fullstack-fitted-cap"
      class="ui button"
    >
      Fitted Cap
    </button>
    <button
      @click="onButtonClick"
      name="button-jacket"
      value="fullstack-jacket"
      class="ui button"
    >
      Jacket
    </button>
  </div>
</template>

<style scoped>
.button-list {
  display: flex;
  gap: 1rem;
}
</style>
