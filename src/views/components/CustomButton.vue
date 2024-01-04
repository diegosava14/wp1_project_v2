<template>
  <button :type="type" class="custom-button">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  }
});
</script>

<style scoped>
.custom-button {
  padding: 10px 20px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  background-color: #EBEF25;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #D4D7A6;
}
</style>
