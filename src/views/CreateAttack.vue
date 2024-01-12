<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>CREATE<br>ATTACK</h1>
    </div>
  </header>
  <main>
    <div class="form">
      <input type="text" id="xCord" v-model="xCord" placeholder="xCord" />
      <input type="text" id="name" v-model="name" placeholder="Name" />
      <input type="text" id="yCord" v-model="yCord" placeholder="yCord" />
    </div>
    <div class="buttons">
      <CustomButton type="button" @click="() => createAttackButtonClicked(name, xCord, yCord, 'public/images/fireball_image.jpg')">CREATE</CustomButton>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
  import CustomButton from "./components/CustomButton.vue";
  import {createAttack} from '../services/api.js';
  import {ref} from "vue";
  import router from "../router/index.js";

  const name = ref("");
  const xCord = ref("");
  const yCord = ref("");
  const createAttackButtonClicked = async (name, xCord, yCord, img) => {
    try {
      const token = localStorage.getItem('token');
      const positions = '(' + xCord + ',' + yCord + ')';

      const response = await createAttack(token, name, positions, img);
      console.log('Create attack API Response:', response);

      if (response.error) {
        console.error('Create failed:', response.error.message);
      }
      router.push('/store');
    } catch (error) {
      console.error('Error:', error);
      console.error('Response Data:', error.response.data);
      throw error;
    }
  };

</script>

<style scoped>
html, body{
  margin:0;
  height: 100%;
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

.form {
  margin-bottom: 30px;
}

.buttons {
  align-items: center;
}

input {
  box-sizing: border-box; /* Ensure proper alignment */
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  margin-bottom: 30px;
}
</style>