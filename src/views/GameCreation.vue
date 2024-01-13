<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>GAME<br>CREATION</h1>
    </div>
  </header>
  <main>
    <div class="content">
      <div class="labels">
        <input type="text" id="game_ID" v-model="game_ID" placeholder="Name" />
        <div class="greenRectangle">
          <CustomLabel id="Arena's size" :labelText="textArenaSize"></CustomLabel>
          <select id="options" v-model="selectedSize">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="greenRectangle">
          <CustomLabel id="Player's HP" :labelText="textPlayersHP"></CustomLabel>
          <select id="options" v-model="selectedHP">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div class="buttons">
        <CustomButton type="button" @click="() => createGameButtonClicked(game_ID, selectedSize, selectedHP)">ENTER GAME</CustomButton>
      </div>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
import CustomButton from './components/CustomButton.vue';
import CustomLabel from './components/CustomLabel.vue';
import { ref } from "vue";
import { createGame } from "../services/api.js";
import router from "../router/index.js";
import gameGrid from "./GameGrid.vue";

let textArenaSize = 'Arena size';
let textPlayersHP = 'Player HP';

const game_ID = ref('');
let selectedSize = ref('');
let selectedHP = ref('');

const createGameButtonClicked = async (game_ID, selectedSize, selectedHP) => {
  try {
    const token = localStorage.getItem('token');
    const numericSize = parseInt(selectedSize);
    const numericHP = parseInt(selectedHP);

    console.log(game_ID);
    console.log(numericSize);
    console.log(numericHP);

    router.push('/game');

    const response = await createGame(token, game_ID, numericSize, numericHP);

    console.log('Create game API Response:', response);

    if (response.error) {
      console.error('Create game failed:', response.error.message);
    } else {
      gameGrid.init(game_ID, numericSize, numericHP);
      router.push('/game');
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response?.data);
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
  margin-bottom: 20px;
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

select{
  margin-left: 5px;
  margin-right: 5px;
}

.labels{
  margin-bottom: 15px;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

select {
  margin-left: 5px;
}

.greenRectangle {
  background-color: #EBEF25; /* Green color */
  padding: 10px; /* Adjust padding as needed */
  border-radius: 5px; /* Optional: Add rounded corners */
  margin-bottom: 15px; /* Add margin between pairs */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  box-sizing: border-box; /* Ensure proper alignment */
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-bottom: 30px;
}
</style>