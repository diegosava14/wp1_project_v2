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
    </div>
    <div class="attacks">
      <CustomButton type="button" @click="equipAttack1">{{ 'Attack1: '+attacks[0] }}</CustomButton>
      <CustomButton type="button" @click="equipAttack2">{{ 'Attack2: '+attacks[1] }}</CustomButton>
      <CustomButton type="button" @click="equipAttack3">{{ 'Attack3: '+attacks[2] }}</CustomButton>
    </div>
    <div class="buttons">
      <CustomButton type="button" @click="backpackButtonClicked">BACKPACK</CustomButton>
      <CustomButton type="button" @click="deleteButtonClicked">DELETE</CustomButton>
    </div>
  </article>
</main>
</template>

<script setup>
import ImageButton from "./components/ImageButton.vue";
import CustomButton from './components/CustomButton.vue';
import CustomLabel from './components/CustomLabel.vue';
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import {
  getAttacksAPI,
  getUserAPI,
  loginAPI,
  getUsersAPI,
  deleteUserAPI,
  getMyAttacksAPI,
  getBuyableAttacks,
  buyAttack
} from "../services/api.js";

let textXp = 'XP: '+localStorage.getItem('xp');
let textLvl = 'LVL: '+localStorage.getItem('level');
let textCoins = 'COINS: '+localStorage.getItem('coins');
let pageTitle = localStorage.getItem('player_ID');
let attacks = ref(['None','None','None']);

const img = localStorage.getItem('img');

const router = useRouter();

onMounted(async () => {
  try {
    const response = await getMyAttacksAPI(localStorage.getItem(('token')));

    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      let counter = 0;
      for (let i = 0; i < response.length; i++) {
        if(response[i].equipped == true){
          attacks.value[counter] = response[i].attack_ID;
          counter++;
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
});

const backButtonClicked = () => {
  router.push('/mainmenu');
};

const backpackButtonClicked = () => {
  router.push('/account/backpack');
};

const equipAttack1 = () => {
  localStorage.setItem('selectedAttack', attacks.value[0]);
  router.push('/account/chooseattack');
};

const equipAttack2 = () => {
  localStorage.setItem('selectedAttack', attacks.value[1]);
  router.push('/account/chooseattack');
};

const equipAttack3 = () => {
  localStorage.setItem('selectedAttack', attacks.value[2]);
  router.push('/account/chooseattack');
};

const deleteButtonClicked = async () => {
  try {
    const response = await deleteUserAPI(localStorage.getItem(('token')));
    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      console.log('Deletion successful!');
      router.push('/title');
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
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

select{
  margin-left: 5px;
  margin-right: 5px;
}

.labels{
  margin-bottom: 15px;
}

.attacks{
  margin-bottom: 30px;
}

.custom-button {
  text-transform: none;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

</style>