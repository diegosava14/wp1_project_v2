<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>BUY<br>ATTACK</h1>
    </div>
  </header>
  <main>
    <div class="scroll-list">
      <a href="#" v-for="item in items" :key="item.attack_ID">
        <div class="item-content">
          <div class="item-field item-field1">{{ item.attack_ID }}</div>
          <div class="item-field item-field2">{{ item.positions }}</div>
          <div class="buttons">
            <CustomButton type="button" @click="() => buyButtonClicked(item.attack_ID)">{{ item.price }}$ BUY</CustomButton>
          </div>
        </div>
      </a>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
import CustomButton from "./components/CustomButton.vue";
import { ref, onMounted } from 'vue';
import {getBuyableAttacks, buyAttack} from '../services/api.js';

const items = ref([]);

onMounted(async () => {
  try {
    const attacks = await getBuyableAttacks(localStorage.getItem('token'));
    items.value = attacks.map(attack => ({
      attack_ID: attack.attack_ID,
      positions: attack.positions,
      price: attack.price
    }));
  } catch (error) {
    console.error('Error fetching attacks:', error);
  }
});

const buyButtonClicked = async (attack_ID) => {
  try {
    const response = await buyAttack(localStorage.getItem('token'), attack_ID);
    console.log('Buy attack API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
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

.title h1 {
  color: #EBEF25;
  text-align: center;
  font-family: 'Porter Sans Block';
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 40px;
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

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-left: 10px;
}

.title{
  margin-top: 20px;
  justify-content: center;
}

.scroll-list {
  background-color: #133973;
  overflow-y: auto;
  white-space: nowrap;
  max-height: 600px;
}

.scroll-list a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  border-bottom: 4px solid #133973;
  background: #eeeeee;
  width: 275px;
  border-radius: 15px;
}

.scroll-list a:last-child {
  border-bottom: none; /* Remove the border from the last item */
}

.scroll-list a:hover {
  background-color: #777;
}

.item-content {
  text-align: left;
}

.item-field {
  text-align: left;
}

.item-field1 {
  font-weight: bold;
  font-size: 1.2em;
}

.item-field2 {
  font-weight: bold;
  font-size: 1.2em;
}

.buttons {
  text-align: end;
}
</style>