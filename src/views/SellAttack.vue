<template>
  <html>
  <body>
  <!-- Header Section -->
  <header>
    <div class="title">
      <h1>SELL<br>ATTACK</h1>
    </div>
  </header>

  <!-- Main Section -->
  <main>
    <!-- Form for Selling an Attack -->
    <div class="form">
      <!-- Dropdown to select the attack to sell -->
      <select id="attack" v-model="selectedAttack" class="custom-dropdown">
        <option v-for="attackOption in attackOptions" :key="attackOption.attack_ID" :value="attackOption.attack_ID">
          {{ attackOption.attack_ID }}
        </option>
      </select>

      <!-- Input field for entering the price -->
      <input type="text" id="price" v-model="price" placeholder="price" />
    </div>

    <!-- Buttons Section -->
    <div class="buttons">
      <!-- Button to initiate the selling process -->
      <CustomButton type="button" @click="() => sellButtonClicked(selectedAttack, price)">SELL</CustomButton>
    </div>
  </main>
  </body>
  </html>
</template>


<script setup>
import CustomButton from "./components/CustomButton.vue";
import { ref, onMounted } from "vue";
import {  getPlayerAttacks, sellAttack } from "../services/api.js";
import router from "../router/index.js";

// Reactive variables for attack options, selected attack, and price
const attackOptions = ref([]);
const selectedAttack = ref("");
const price = ref("");

// Fetch player's attacks on component mount
onMounted(async () => {
  try {
    const attacks = await getPlayerAttacks(
        localStorage.getItem("token"),
        localStorage.getItem("player_ID")
    );

    // Filter out attacks that are already on sale
    attackOptions.value = attacks
        .filter(attack => !attack.on_sale)
        .map(attack => ({
          attack_ID: attack.attack_ID,
          positions: attack.positions,
          on_sale: attack.on_sale
        }));
  } catch (error) {
    console.error("Error fetching attacks:", error);
  }
});

// Handler for the button click to sell an attack
const sellButtonClicked = async (attack_ID, price) => {
  try {
    // Parse the price as a number
    const numericPrice = parseInt(price);

    // Log selected attack_ID and price
    console.log(attack_ID);
    console.log(numericPrice);

    // Call the API to sell the attack
    const response = await sellAttack(localStorage.getItem('token'), attack_ID, numericPrice);
    console.log('Sell attack API Response:', response);

    // Redirect to the store page
    router.push('/store');

    // Log an error if the sell process failed
    if (response.error) {
      console.error('Sold failed:', response.error.message);
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
};
</script>


<style scoped>
/* Resetting styles for HTML and body */
html, body{
  margin:0;
  height: 100%;
}

/* Styling for the body section */
body {
  background: #133973;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 30px;
}

/* Styling for the title in the header */
.title h1 {
  color: #EBEF25;
  text-align: center;
  font-family: 'Porter Sans Block';
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
}

.title{
  margin-bottom: 30px;
  justify-content: center;
}

/* Styling for the form */
.form {
  margin-bottom: 30px;
}

/* Styling for the buttons */
.buttons {
  align-items: center;
}

/* Styling for the custom dropdown */
.custom-dropdown {
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-bottom: 30px;
}

/* Styling for the input field */
input {
  box-sizing: border-box;
  width: 70%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-bottom: 30px;
}
</style>
