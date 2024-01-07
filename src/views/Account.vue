<template>
<main>
  <header>
    <div class="actionButtons">
      <ImageButton class="back" type="button" @click="backButtonClicked" image-url="/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
    </div>
    <div class="title">
      <h1>Xx_YOU_xX</h1>
    </div>
  </header>
  <article>
    <div class="image">
      <img class="account_image" src="/images/pfp1.jpg"/>
    </div>
    <div class="labels">
      <CustomLabel id="Xp" :labelText="textXp"></CustomLabel>
      <CustomLabel id="Lvl" :labelText="textLvl"></CustomLabel>
      <CustomLabel id="Coins" :labelText="textCoins"></CustomLabel>
    </div>
    <div class="attacks">
      <select>
        <option value="Option1">Attack1</option>
        <option value="Option2">Attack2</option>
        <option value="Option3">Attack3</option>
      </select>
      <select>
        <option value="Option1">Attack1</option>
        <option value="Option2">Attack2</option>
        <option value="Option3">Attack3</option>
      </select>
      <select>
        <option value="Option1">Attack1</option>
        <option value="Option2">Attack2</option>
        <option value="Option3">Attack3</option>
      </select>
    </div>
    <div class="buttons">
      <CustomButton type="button" @click="backpackButtonClicked">BACKPACK</CustomButton>
      <CustomButton type="button">DELETE</CustomButton>
    </div>
  </article>
</main>
</template>

<script setup>
import ImageButton from "./components/ImageButton.vue";
import CustomButton from './components/CustomButton.vue';
import CustomLabel from './components/CustomLabel.vue';
import { useRouter } from "vue-router";

let textXp = 'XP';
let textLvl = 'LVL';
let textCoins = 'COINS';

const router = useRouter();

const backButtonClicked = () => {
  router.push('/mainmenu');
};

const backpackButtonClicked = () => {
  router.push('/account/backpack');
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

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

</style>