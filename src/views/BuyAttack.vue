<template>
  <html>
  <body>
  <!-- Header Section -->
  <header>
    <div class="title">
      <h1>BUY<br>ATTACK</h1>
    </div>
  </header>

  <!-- Main Section -->
  <main>
    <!-- Attack List -->
    <div class="scroll-list">
      <a href="#" v-for="item in items" :key="item.attack_ID">
        <div class="item-content">
          <div class="item-field item-field1">{{ item.attack_ID }}</div>
          <div class="item-field item-field2">{{ item.positions }}</div>
          <div class="buttons">
            <!-- Custom Button for Buying -->
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
import { getBuyableAttacks, buyAttack } from '../services/api.js';
import router from "../router/index.js";

// Reactive data for attack items
const items = ref([]);

// Fetch buyable attacks on component mount
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

// Handler for buy button click
const buyButtonClicked = async (attack_ID) => {
  try {
    const response = await buyAttack(localStorage.getItem('token'), attack_ID);
    console.log('Buy attack API Response:', response);

    if (response.error) {
      console.error('Buy failed:', response.error.message);
    } else {
      router.push('/store');
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
html, body {
  margin: 0;
  height: 100%;
}

/* Styling for title in the header */
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

/* Styling for the body section */
body {
  background: #133973;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 30px;
}

/* Styling for the back button and title */
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-left: 10px;
}

.title {
  margin-top: 20px;
  justify-content: center;
}

/* Styling for the attack list */
.scroll-list {
  background-color: #133973;
  overflow-y: auto;
  white-space: nowrap;
  max-height: 600px;
}

/* Styling for individual attack items */
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

/* Removing border from the last attack item */
.scroll-list a:last-child {
  border-bottom: none;
}

/* Hover effect for attack items */
.scroll-list a:hover {
  background-color: #777;
}

/* Styling for attack item content and fields */
.item-content {
  text-align: left;
}

.item-field {
  text-align: left;
}

.item-field1,
.item-field2 {
  font-weight: bold;
  font-size: 1.2em;
}

/* Styling for buttons section */
.buttons {
  text-align: end;
}
</style>
