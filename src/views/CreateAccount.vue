<template>
  <main>
    <header>
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
            <option value="public/images/pfp1.jpg">Mike</option>
          </select>
        </div>
      </div>
      <div class="buttons">
        <button type="button" @click="createButtonClicked">CREATE</button>
      </div>
    </article>
  </main>
</template>

<script setup>
import axios from 'axios';
import { registerAPI } from '../services/api.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Define reactive data properties
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
    }
  }catch (error) {
    console.error('Error:', error);
    console.error('Response Data:', error.response.data);
    throw error;
  }
  //router.push("/mainmenu");
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
  align-items: center;
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
