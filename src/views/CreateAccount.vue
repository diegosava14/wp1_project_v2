<template>
  <main>
    <header>
      <div class="actionButtons">
        <ImageButton class="back" type="button" @click="backButtonClicked" image-url="/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
      </div>
      <div class="title">
        <h1>CREATE<br>ACCOUNT</h1>
      </div>
    </header>
    <article>
      <div class="form">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" />
        </div>
        <div>
          <label for="options">Select an Option:</label>
          <select id="options" v-model="selectedOption">
            <option value="/images/pfp1.jpg">Mike</option>
            <option value="/images/pfp2.jpg">Stare</option>
          </select>
        </div>
      </div>
      <div class="buttons">
        <CustomButton type="button" @click="createButtonClicked">CREATE</CustomButton>
      </div>
    </article>
  </main>
</template>

<script setup>
import CustomButton from './components/CustomButton.vue';
import axios from 'axios';
import {loginAPI, registerAPI} from '../services/api.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ImageButton from "./components/ImageButton.vue";

const username = ref('');
const password = ref('');
let selectedOption = ref('');

const router = useRouter();

const createButtonClicked = async () => {
  try {
    const response = await registerAPI(username.value, password.value, selectedOption.value);
    console.log('Register API Response:', response);

    if (response.error) {
      console.error('Register failed:', response.error.message);
    } else {
      console.log('Registration successful!');

      try {
        const response2 = await loginAPI(username.value, password.value);

        if (response2.error) {
          console.error('Login failed:', response2.error.message);
        } else {
          const player_ID = response2.player_ID;
          const password = response2.password;
          const img = response2.img;
          const level = response2.level;
          const xp = response2.xp;
          const coins = response2.coins;
          const token = response2.token;

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
      }catch (error) {
        console.error('Error:', error);
        console.error('Response Data:', error.response.data);
        throw error;
      }
    }
  }catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
};

const backButtonClicked = () => {
  router.push('/');
};
</script>

<style scoped>
main {
  margin: 0;
  height: 100%;
  background: #133973;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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

.title {
  margin-bottom: 30px;
  justify-content: center;
}

.form {
  margin-bottom: 30px;
}

.form div {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.actionButtons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: auto;
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

label {
  color: #EBEF25;
  margin-bottom: 10px;
  font-size: 16px;
  display: block;
}

input, select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}
</style>
