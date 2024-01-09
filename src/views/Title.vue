<template>
  <main>
    <header>
      <div class="title">
        <h1>BATTLE<br>ARENA</h1>
      </div>
    </header>
    <article>
      <div class="form">
        <input type="text" id="username" v-model="username" placeholder="Enter your username" />
        <input type="password" id="password" v-model="password" placeholder="Enter your password" />
      </div>
      <div class="buttons">
        <CustomButton type="button" @click="joinButtonClicked">JOIN</CustomButton>
        <CustomButton type="button" @click="createbuttonClicked">CREATE</CustomButton>
      </div>
    </article>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CustomButton from './components/CustomButton.vue';
import TextInput from './components/TextInput.vue';
import {ref} from "vue";
import {loginAPI, registerAPI} from "../services/api.js";

const username = ref('');
const password = ref('');

const router = useRouter();

const joinButtonClicked = async () => {
  console.log(username.value, password.value);
  try {
    const response = await loginAPI(username.value, password.value);
    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      const player_ID = response.player_ID;
      const password = response.password;
      const img = response.img;
      const level = response.level;
      const xp = response.xp;
      const coins = response.coins;
      const token = response.token;

      localStorage.setItem('player_ID', player_ID);
      localStorage.setItem('password', password);
      localStorage.setItem('img', img);
      localStorage.setItem('level', level);
      localStorage.setItem('xp', xp);
      localStorage.setItem('coins', coins);
      localStorage.setItem('token', token);

      console.log('Login successful!');
      router.push('/mainmenu');
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
};

const createbuttonClicked = () => {
  router.push('/createaccount');
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
  margin-bottom: 60px;
  justify-content: center;
}

.form {
  margin-bottom: 30px;
}

.buttons {
  align-items: center;
}
</style>