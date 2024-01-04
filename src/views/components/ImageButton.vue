<template>
  <button :type="type" class="image-button">
    <img :src="imageUrl" alt="Button Image" class="button-image" />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  imageUrl: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.image-button {
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #EBEF25;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  overflow: hidden; /* Ensures the image doesn't overflow the button */
  position: relative; /* Enables absolute positioning for the image */
}

.button-image {
  width: 100%; /* Make the image fill the button */
  height: 100%; /* Make the image fill the button */
  object-fit: cover; /* Maintain aspect ratio and cover the button */
  position: absolute; /* Position the image absolutely within the button */
  top: 0; /* Position from the top of the button */
  left: 0; /* Position from the left of the button */
}

.image-button:hover {
  background-color: #D4D7A6;
}
</style>
