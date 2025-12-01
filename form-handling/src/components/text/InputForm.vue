<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, toRefs } from "vue";
import type { inputFieldErrors, inputField } from "./InputFormInterfaces";
import { apiClient } from "@/api/client";

const newItemDomReference = ref<HTMLInputElement | null>(null);

const formData = reactive({
  field: {
    newItem: "",
    email: "",
    urgency: "",
    termsAndConditions: false,
  },
  fieldError: {
    newItem: undefined,
    email: undefined,
    urgency: undefined,
    termsAndConditions: undefined,
  },
  items: [] as string[],
  loading: false,
  saveStatus: "READY",
})

const { saveStatus, items, field, loading } = toRefs(formData);
const fieldErrors: inputFieldErrors = formData.fieldError;

onBeforeMount(() => {
  formData.loading = true;
  apiClient.loadItems().then((myItems: string[]) => {
    items.value.push(...myItems);
    formData.loading = false;
  });
});

const submitForm = (evt: Event) => {
  evt.preventDefault();
  const errors = validateForm(field.value);

  for (const key in fieldErrors) {
    const k = key as keyof inputFieldErrors;
    fieldErrors[k] = errors[k];
  }

  if ((Object.keys(errors).length) > 0) return;

  const allNewItems = [...formData.items, field.value.newItem];

  saveStatus.value = "SAVING";
  apiClient.saveItems(allNewItems)
    .then(() => {
      items.value = allNewItems;
      field.value.newItem = "";
      field.value.email = "";
      field.value.urgency = "";
      field.value.termsAndConditions = false;
      saveStatus.value = "SUCCESS";
    })
    .catch((err) => {
      console.log(err);
      saveStatus.value = "ERROR";
    });
};

const validateForm = (fields: inputField) => {
  const errors: Partial<inputFieldErrors> = {};

  if (!fields.newItem) errors.newItem = "New Item Required";
  if (!fields.email) errors.email = "Email Required";
  if (!fields.urgency) errors.urgency = "Urgency Required";
  if (!fields.termsAndConditions) {
    errors.termsAndConditions = "Terms and conditions have to be approved";
  }
  if (fields.email && !isEmail(fields.email)) {
    errors.email = "Invalid Email";
  }

  return errors;
};

const isEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isNewItemInputLimitExceeded = computed(() => {
  return field.value.newItem.length > 20;
});

const isNotUrgent = computed(() => {
  return field.value.urgency === "Nonessential";
});

</script>

<template>
  <div class="input-form">
    <form @submit="submitForm" class="ui form">
      <div class="field">
        <input ref="newItemDomReference" v-model="field.newItem" type="text" placeholder="Add an item!">
        <span style="color: red">{{ fieldErrors.newItem }}</span>
        <span v-if="isNewItemInputLimitExceeded" style="color: red; display: block">
          Must be under twenty characters
        </span>
      </div>
      <div class="field">
        <input v-model="field.email" type="text" placeholder="Add an email!">
        <span style="color: red">{{ fieldErrors.email }}</span>
      </div>
      <div class="field">
        <label style="color: aliceblue;">Urgency</label>
        <select v-model="field.urgency" class="ui fluid search dropdown">
          <option disabled value="">Please select one</option>
          <option>Nonessential</option>
          <option>Moderate</option>
          <option>Urgent</option>
        </select>
        <span style="color: red">{{ fieldErrors.urgency }}</span>
        <span v-if="isNotUrgent" style="color: red; display: block">
          Must be moderate to urgent
        </span>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input v-model="field.termsAndConditions" type="checkbox" />
          <label style="color: aliceblue;">I accept the terms and conditions</label>
          <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
        </div>
      </div>
      <div>
        <button v-if="saveStatus === 'SAVING'" disabled class="ui button">
          Saving...
        </button>
        <button v-if="saveStatus === 'SUCCESS'" :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">
          Saved! Submit another
        </button>
        <button v-if="saveStatus === 'ERROR'" :disabled="isNewItemInputLimitExceeded || isNotUrgent" class="ui button">
          Save Failed - Retry?
        </button>
        <button v-if="saveStatus === 'READY'" :disabled="isNewItemInputLimitExceeded || isNotUrgent" class="ui button">
          Submit
        </button>
      </div>
    </form>
    <div class="ui segment">
      <h4 class="ui header">Items</h4>
      <ul>
        <div v-if="loading" class="ui active inline loader"></div>
        <li v-for="(item, id) in items" :key="id" class="item">{{ item }}-{{ id }}</li>
      </ul>
    </div>
  </div>
  <code style="margin-top: 2rem; display: block; font-size: 1rem; white-space: pre-wrap;">
  {{ JSON.stringify(formData, null, 2) }}
</code>
</template>

<style scoped>
a .input-form {
  max-width: 30rem;
  margin: 0 auto;
}

li {
  text-align: left;
  color: black;
}
</style>
