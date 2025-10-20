<script setup lang="ts">
import ButtonRow from "./components/buttons/ButtonRow.vue";
import InputForm from "./components/text/InputForm.vue";
</script>

<template>
  <div class="title">
    <h1>FORM - HANDLING</h1>
  </div>
  <div class="buttons">
    <ButtonRow />
  </div>
    <div class="buttons">
    <InputForm />
  </div>
</template>

<style scoped>


.title{
  margin: 0 auto;
  text-align: center;
}

.buttons {
  margin: 2rem;
}
</style>
