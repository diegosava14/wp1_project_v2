<template>
  <html>
  <body>
  <!-- Header Section -->
  <header>
    <div class="title">
      <h1>GAME<br>CREATION</h1>
    </div>
  </header>

  <!-- Main Section -->
  <main>
    <!-- Form for Game Creation -->
    <div class="content">
      <div class="labels">
        <!-- Input for Game Name -->
        <input type="text" id="game_ID" v-model="game_ID" placeholder="Name" />

        <!-- Green Rectangle for Arena Size -->
        <div class="greenRectangle">
          <CustomLabel id="Arena's size" :labelText="textArenaSize"></CustomLabel>
          <select id="options" v-model="selectedSize">
            <!-- Options for Arena Size -->
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

        <!-- Green Rectangle for Player's HP -->
        <div class="greenRectangle">
          <CustomLabel id="Player's HP" :labelText="textPlayersHP"></CustomLabel>
          <select id="options" v-model="selectedHP">
            <!-- Options for Player's HP -->
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <!-- Button for Entering Game -->
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

// Initial values for custom labels
let textArenaSize = 'Arena size';
let textPlayersHP = 'Player HP';

// Reactive variables for form inputs
const game_ID = ref('');
let selectedSize = ref('');
let selectedHP = ref('');

// Handler for create game button click
const createGameButtonClicked = async (game_ID, selectedSize, selectedHP) => {
  try {
    const token = localStorage.getItem('token');
    const numericSize = parseInt(selectedSize);
    const numericHP = parseInt(selectedHP);

    console.log(game_ID);
    console.log(numericSize);
    console.log(numericHP);

    // Redirect to the game page
    router.push('/game');

    // Call API to create game
    const response = await createGame(token, game_ID, numericSize, numericHP);
    console.log('Create game API Response:', response);

    if (response.error) {
      console.error('Create game failed:', response.error.message);
    } else {
      // Initialize gameGrid and redirect to the game page
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
/* Resetting styles for HTML and body */
html, body {
  margin: 0;
  height: 100%;
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

/* Styling for select elements */
select {
  margin-left: 5px;
}

/* Styling for labels section */
.labels {
  margin-bottom: 15px;
}

/* Styling for buttons section */
.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

/* Styling for content section */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling for green rectangles */
.greenRectangle {
  background-color: #EBEF25; /* Green color */
  padding: 10px; /* Adjust padding as needed */
  border-radius: 5px; /* Optional: Add rounded corners */
  margin-bottom: 15px; /* Add margin between pairs */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styling for input fields */
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
