<template>
  <button :type="type" class="custom-button">
    <i class="fas fa-search"></i>
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
  background-color: #f5efef;
  color: #242323;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button i {
  margin-right: 5px; /* Adjust the margin as needed */
}

</style>
