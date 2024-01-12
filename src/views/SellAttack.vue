<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>SELL<br>ATTACK</h1>
    </div>
  </header>
  <main>
    <div class="form">
      <select id="attack" v-model="selectedAttack" class="custom-dropdown">
        <option v-for="attackOption in attackOptions" :key="attackOption.attack_ID" :value="attackOption.attack_ID">
          {{ attackOption.attack_ID }}
        </option>
      </select>
      <input type="text" id="price" v-model="price" placeholder="price" />
    </div>
    <div class="buttons">
      <CustomButton type="button" @click="() => sellButtonClicked(selectedAttack, price)">SELL</CustomButton>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
import CustomButton from "./components/CustomButton.vue";
import TextInput from "./components/TextInput.vue";
import { ref, onMounted } from "vue";
import {buyAttack, getPlayerAttacks, sellAttack} from "../services/api.js";
import router from "../router/index.js";

const attackOptions = ref([]);
const selectedAttack = ref("");
const price = ref("");

onMounted(async () => {
  try {
    const attacks = await getPlayerAttacks(
        localStorage.getItem("token"),
        localStorage.getItem("player_ID")
    );
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

const sellButtonClicked = async (attack_ID, price) => {
  try {
    const numericPrice = parseInt(price);

    console.log(attack_ID);
    console.log(numericPrice);
    const response = await sellAttack(localStorage.getItem('token'), attack_ID, numericPrice);
    console.log('Sell attack API Response:', response);

    router.push('/store');

    if (response.error) {
      console.error('Sold failed:', response.error.message);
    } else {
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
};

</script>

<style scoped>
html, body{
  margin:0;
  height: 100%;
}

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

.form {
  margin-bottom: 30px;
}

.buttons {
  align-items: center;
}

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

input {
  box-sizing: border-box; /* Ensure proper alignment */
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