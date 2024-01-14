<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>STATISTICS</h1>
    </div>
  </header>
  <main>
    <div class="labels">
      <CustomLabel id="Xp" :labelText="games_played"></CustomLabel>
      <CustomLabel id="Lvl" :labelText="games_won"></CustomLabel>
    </div>
    <div class="scroll-list">
      <a href="#" v-for="item in items" :key="item.id">
        <div class="item-content">
          <div class="item-field item-field1">{{ item.field1 }}</div>
          <div class="item-field item-field2">{{ item.field2 }}</div>
          <div class="item-field">
            {{ item.field3 }}
            <br />
            {{ item.field4 }}
          </div>
        </div>
      </a>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
import CustomLabel from "./components/CustomLabel.vue";
import {onMounted, ref} from "vue";
import {getStatisticsAPI} from "../services/api.js";

const games_played = ref('');
const games_won = ref('');

onMounted(async () => {
  try {
    const statistics = await getStatisticsAPI(localStorage.getItem('token'));

    games_played.value = 'TOTAL GAMES: ' + statistics.games_played;
    games_won.value = 'GAMES WON: ' + statistics.games_won;

  } catch (error) {
    console.error('Error fetching attacks:', error);
  }

});

const items = [];
let i;

const randomDates = Array.from({ length: 50 }, () => {
  const randomTime = Math.random() * Date.now();
  const randomDate = new Date(randomTime);
  return randomDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
});

const randomNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
  'Kelly', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ryan', 'Sophia', 'Tom',
  'Ursula', 'Vincent', 'Wendy', 'Xander', 'Yvonne', 'Zane'
];

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * randomNames.length);
  return randomNames[randomIndex];
};

const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 200) + 1;
  return randomNumber;
}

for (i = 0; i < 50; i++) {
  items.push({
    id: i,
    field1: randomDates[i],
    field2: getRandomNumber() +' HP',
    field3: getRandomName() + '        +' + getRandomNumber() + 'XP        +' + getRandomNumber() + '$' + '        Fireball' + '        W',
    field4: getRandomName() + '        +' + getRandomNumber() + 'XP        +' + getRandomNumber() + '$' + '        -' + '        L',
  });
}
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
  background: #EBEF25;
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
  font-size: 1.2em;
  color: steelblue;
}
</style>