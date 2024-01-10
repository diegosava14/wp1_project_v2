<template>
  <main>
    <header>
      <div class="actionButtons">
        <ImageButton class="back" type="button" @click="backButtonClicked" image-url="/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
      </div>
      <div class="title">
        <h1>CHOOSE ATTACK</h1>
        <h2>{{ selected }}</h2>
      </div>
    </header>
    <article>
      <div class="scroll-list">
        <div @click="itemClicked($event, item.id)" v-for="item in items" :key="item.id" class="item-container">
          <a href="#">
            <p class="item-name">{{ item.text.attack }}</p>
            <p class="item-name">{{ item.text.positions }}</p>
            <p class="item-power">{{ item.text.power }}</p>
            <p class="item-equipped">{{ item.text.equipped }}</p>
            <p class="item-sale">{{ item.text.on_sale }}</p>
          </a>
        </div>
      </div>
      <div class="buttons">
        <CustomButton type="button" @click="unequipButtonClicked">UNEQUIP</CustomButton>
      </div>
    </article>
  </main>
</template>

<script setup>
import ImageButton from "./components/ImageButton.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {equipAttack, getMyAttacksAPI, swapAttack, unequipAttack} from "../services/api.js";
import CustomButton from "./components/CustomButton.vue";

const router = useRouter();

const selected = localStorage.getItem('selectedAttack');

let items = ref([]);

onMounted(async () => {
  try {
    const response = await getMyAttacksAPI(localStorage.getItem(('token')));

    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      items.value = response.filter(attack => !attack.equipped).map(attack => ({
            id: attack.attack_ID,
            text: {
              attack: attack.attack_ID,
              positions: 'Positions: ' + attack.positions,
              power: 'Power: ' + attack.power,
              equipped: 'Equipped: ' + attack.equipped,
              on_sale: 'On sale: ' + attack.on_sale
            }
          }));
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
});

const itemClicked = async (event, clickedId) => {
  event.preventDefault();

  try {
    let response;

    if(localStorage.getItem('selectedAttack') == 'None') {
      response = await equipAttack(localStorage.getItem(('token')), clickedId);
    }else{
      response = await swapAttack(localStorage.getItem(('token')), clickedId, localStorage.getItem('selectedAttack'));
    }

    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      console.log('Attack equipped!');
      router.push('/account');
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
}

const unequipButtonClicked = () => {
  if(localStorage.getItem('selectedAttack') == 'None') {
    router.push('/account');
  }else{
    try {
      const response = unequipAttack(localStorage.getItem(('token')), localStorage.getItem('selectedAttack'));
      console.log('Register API Response:', response);

      if (response.error) {
        console.error('Register failed:', response.error.message);
      } else {
        console.log('Attack unequipped!');
        router.push('/account');
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Response Data:', error.response.data);
      throw error;
    }
  }
};

const backButtonClicked = () => {
  router.push('/account');
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
  margin-bottom: 40px;
}

.title h2 {
  color: #EBEF25;
  text-align: center;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 40px;
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

.scroll-list {
  background-color: #133973;
  overflow-y: auto;
  white-space: nowrap;
  max-height: 600px;
}

.scroll-list a {
  display: block;
  color: black;
  text-align: left;
  padding: 10px;
  text-decoration: none;
  background: #EBEF25;
  width: 250px;
  border-radius: 15px;
}

.scroll-list a:last-child {
  border-bottom: none;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.item-container {
  margin-bottom: 6px;
}

.item-name {
  font-weight: bold;
  color: steelblue;
  font-size: 1.2em;
}
</style>