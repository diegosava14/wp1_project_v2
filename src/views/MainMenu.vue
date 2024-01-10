<template>
  <main>
    <header>
      <div class="actionButtons">
        <ImageButton class="account" type="button" @click="accountButtonClicked" image-url="/images/account_circle_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
        <ImageButton class="back" type="button" image-url="/images/logout_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
      </div>
      <div class="title">
        <h1>BATTLE<br>ARENA</h1>
      </div>
    </header>
    <article>
      <div class="buttons">
        <CustomButton type="button" @click="gameButtonClicked">PLAY</CustomButton>
        <CustomButton type="button" @click="gameFinderButtonClicked">GAME FINDER</CustomButton>
        <CustomButton type="button" @click="gameCreationButtonClicked">CREATE GAME</CustomButton>
        <CustomButton type="button" @click="statisticsButtonClicked">STATISTICS</CustomButton>
        <CustomButton type="button" @click="rankingButtonClicked">RANKING</CustomButton>
        <CustomButton type="button" @click="storeButtonClicked">STORE</CustomButton>
      </div>
    </article>
  </main>
</template>

<script setup>
import CustomButton from './components/CustomButton.vue';
import ImageButton from "./components/ImageButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const gameCreationButtonClicked = () => {
  router.push('/gamecreation');
};
const gameFinderButtonClicked = () => {
  router.push('/gamefinder');
};

const gameButtonClicked = () => {
  router.push('/game');
}

console.log(localStorage.getItem('token'), localStorage.getItem('player_ID'),
    localStorage.getItem('password'), localStorage.getItem('img'), localStorage.getItem('level'),
    localStorage.getItem('xp'), localStorage.getItem('coins'));

const storeButtonClicked = () => {
  router.push('/store');
};

const accountButtonClicked = () => {
  router.push('/account');
};

const rankingButtonClicked = () => {
  router.push('/ranking');
};

const statisticsButtonClicked = () => {
  router.push('/statistics');
};
</script>

<style scoped>
main{
  margin:0;
  height: 100%;
}

main{
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
  rotate: 180deg;
}

.account {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-right: 10px;
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

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
