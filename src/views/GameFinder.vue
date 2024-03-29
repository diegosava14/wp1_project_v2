<template>
  <html>
  <body>
  <!-- Header Section -->
  <header>
    <div class="title">
      <h1>GAME<br>FINDER</h1>
    </div>
  </header>

  <!-- Main Section -->
  <main>
    <!-- Buttons for Available and Finished Games -->
    <div class="buttons">
      <CustomButton type="button" @click="() => availableGamesButtonClicked()">AVAILABLE GAMES</CustomButton>
      <CustomButton type="button" @click="() => finishedGamesButtonClicked()">FINISHED GAMES</CustomButton>
      <br>
      <br>
    </div>

    <!-- List of Game Items -->
    <div class="scroll-list">
      <a href="#" v-for="item in items" :key="item.id">
        <div class="item-content">
          <!-- Display Game ID -->
          <div class="item-field item-field1">{{ item.game_ID }}</div>
          <!-- Display Game Size and HP -->
          <div class="item-field item-field2">SIZE: {{ item.size }} HP: {{ item.HP_max }}</div>
          <!-- Display Game Creation Date -->
          <div class="item-field">
            {{ item.creation_date }}
          </div>
          <!-- Button to Join the Game -->
          <div class="buttons1">
            <CustomButton type="buttons1" @click="() => joinGameButtonClicked(item.game_ID)">JOIN</CustomButton>
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
import { onMounted, ref } from "vue";
import { createGame, getAvailableGames, joinGame } from "../services/api.js";
import router from "../router/index.js";

// Reactive variable for game items
const items = ref([]);

// Fetch available games on component mount
onMounted(async () => {
  try {
    const games = await getAvailableGames(localStorage.getItem('token'));
    items.value = games
        .filter(game => !game.finished)
        .filter(game => !game.start)
        .map(games => ({
          game_ID: games.game_ID,
          size: games.size,
          creation_date: new Date(games.creation_date).toLocaleString(),
          HP_max: games.HP_max
        }));
  } catch (error) {
    console.error('Error fetching attacks:', error);
  }
});

// Handler for button click to fetch and display available games
const availableGamesButtonClicked = async () => {
  try {
    const games = await getAvailableGames(localStorage.getItem('token'));
    items.value = games
        .filter(game => !game.finished)
        .filter(game => !game.start)
        .map(games => ({
          game_ID: games.game_ID,
          size: games.size,
          creation_date: new Date(games.creation_date).toLocaleString(),
          HP_max: games.HP_max
        }));
  } catch (error) {
    console.error('Error fetching attacks:', error);
  }
};

// Handler for button click to join a game
const joinGameButtonClicked = async (game_ID) => {
  try {
    const response = await joinGame(localStorage.getItem('token'), game_ID);

    // Redirect to replay page
    router.push('/replay');
    console.log('Create game API Response:', response);

    if (response.error) {
      console.error('Create game failed:', response.error.message);
    } else {
      // Redirect to replay page after successful join
      router.push('/replay');
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response?.data);
    throw error;
  }
};

// Handler for button click to fetch and display finished games
const finishedGamesButtonClicked = async () => {
  try {
    const games = await getAvailableGames(localStorage.getItem('token'));
    items.value = games
        .filter(game => game.finished)  // Filter out finished games
        .map(games => ({
          game_ID: games.game_ID,
          size: games.size,
          creation_date: new Date(games.creation_date).toLocaleString(),
          HP_max: games.HP_max
        }));
  } catch (error) {
    console.error('Error fetching attacks:', error);
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
  margin-bottom: 40px;
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

.title {
  margin-top: 20px;
  justify-content: center;
}

/* Styling for the game list */
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
  background: #EBEF25;
  height: 90px;
  width: 275px;
  border-radius: 15px;
}

.scroll-list a:last-child {
  border-bottom: none;
}

.scroll-list a:hover {
  background-color: #777;
}

/* Styling for the form */
.form {
  width: 200px;
  display: flex;
  align-items: center;
}

/* Styling for the item content and fields */
.item-content {
  text-align: left;
}

.item-field {
  text-align: center;
}

.item-field1 {
  font-weight: bold;
  font-size: 1.2em;
}

.item-field2 {
  font-size: 1.2em;
  color: #435283;
}

/* Styling for the join button */
.buttons1 {
  text-align: end;
  position: relative;
  bottom: 0;
  right: 0;
}
</style>
