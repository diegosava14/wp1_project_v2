<template>
    <main>
      <header>
        <div class="actionButtons">
          <ImageButton class="back" type="button" @click="backButtonClicked" image-url="/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
        </div>
        <div class="title">
          <h1>{{ pageTitle }}</h1>
        </div>
      </header>
      <article>
        <div class="image">
          <img class="account_image" :src="img"/>
        </div>
        <div class="labels">
          <CustomLabel id="Xp" :labelText="textXp"></CustomLabel>
          <CustomLabel id="Lvl" :labelText="textLvl"></CustomLabel>
          <CustomLabel id="Coins" :labelText="textCoins"></CustomLabel>
          <CustomLabel id="Wins" :labelText="wins"></CustomLabel>
          <CustomLabel id="Games" :labelText="games"></CustomLabel>
        </div>
      </article>
    </main>
</template>

<script setup>
import CustomLabel from './components/CustomLabel.vue';
import ImageButton from "./components/ImageButton.vue";
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import {getStatsAPI, getUserAPI} from "../services/api.js";

const router = useRouter();

let textXp = ref('');
let textLvl = ref('');
let textCoins = ref('');
let wins = ref('');
let games = ref('');
let pageTitle = localStorage.getItem('otherPlayer_ID');
let img = ref('');

onMounted(async () => {
  try {
    const response = await getUserAPI(localStorage.getItem(('token')), localStorage.getItem(('otherPlayer_ID')));
    console.log('Register API Response:', response);

    if (response.error) {
      console.error(response.error.message);
    } else {
      textXp.value = 'XP: ' + response.xp.toString();
      textLvl.value = 'LVL: ' + response.level.toString();
      textCoins.value = 'COINS: ' + response.coins.toString();
      img.value = response.img.toString();
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }

  try {
    const response = await getStatsAPI(localStorage.getItem(('token')), localStorage.getItem(('otherPlayer_ID')));
    console.log('Register API Response:', response);

    if (response.error) {
      console.error(response.error.message);
    } else {
      let percentage = (response.games_won/response.games_played*100);

      if (isNaN(percentage)){
        percentage = 0;
      }

      wins.value = "WON: "+ percentage.toString() + "%";
      games.value = "Finished Games: "+response.games_played.toString();
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
});

console.log(localStorage.getItem('otherPlayer_ID'));

const backButtonClicked = () => {
  router.push('/ranking');
};
</script>

<style scoped>
main{
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

main {
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

.image {
  margin-bottom: 30px;
}

.account_image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
</style>