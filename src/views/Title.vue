<template>
  <main>
    <header>
      <div class="title">
        <h1>BATTLE<br>ARENA</h1>
      </div>
    </header>
    <article>
      <div class="form">
        <TextInput id="username" placeholder="Username" v-model="username" />
        <TextInput id="password" placeholder="Password" v-model="password" />
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

let username = '';
let password = '';

const router = useRouter();

const joinButtonClicked = () => {
  router.push('/mainmenu');
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