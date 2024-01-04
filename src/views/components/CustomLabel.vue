<template>
  <div class="custom-label">
    <label :for="id" v-text="labelText"></label>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: String,
  labelText: String
});
</script>

<style scoped>
.custom-label {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 7px;
  margin-bottom: 10px;
}

.custom-label label {
  display: block;
  font-weight: bold;
}
</style>
