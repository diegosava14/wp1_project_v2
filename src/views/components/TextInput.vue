<template>
  <div class="text-input">
    <input :type="type" :id="id" :name="id" v-model="inputValue" :placeholder="placeholder" required />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: "text"
  },
  placeholder: String,
  modelValue: String
});
</script>

<style scoped>
.text-input {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: black;
}
</style>
