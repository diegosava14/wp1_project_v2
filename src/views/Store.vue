<template>
  <html>
  <body>
  <!-- Main container for the store page -->
  <div class="container">

    <!-- Action buttons for account and exit -->
    <div class="actionButtons">
      <ImageButton class="account" type="button" @click="accountButtonClicked" image-url="/images/account_circle_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
    </div>

    <!-- Title section -->
    <div class="title">
      <h1>STORE</h1>
    </div>

    <!-- Buttons section for various store actions -->
    <div class="buttons">
      <CustomButton type="button" @click="createAttackButtonClicked">CREATE ATTACK</CustomButton>
      <CustomButton type="button" @click="buyButtonClicked">BUY ATTACK</CustomButton>
      <CustomButton type="button" @click="sellButtonClicked">SELL ATTACK</CustomButton>
    </div>

  </div>
  </body>
  </html>
</template>


<script setup>
import { useRouter } from 'vue-router';
import CustomButton from './components/CustomButton.vue';
import ImageButton from "./components/ImageButton.vue";

// Access the Vue router instance
const router = useRouter();

// Handlers for button clicks to navigate to different pages
const createAttackButtonClicked = () => {
  router.push('/store/createattack');
};

const sellButtonClicked = () => {
  router.push('/store/sellattack');
};

const buyButtonClicked = () => {
  router.push('/store/buyattack');
};

const accountButtonClicked = () => {
  router.push('/account');
};

</script>


<style scoped>
/* Resetting styles for HTML and body */
html, body{
  margin:0;
  height: 100%;
}

/* Styling for the main container */
.container {
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

/* Styling for the exit button */
.exit {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-left: 10px;
}

/* Styling for the account button */
.account {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-right: 10px;
}

/* Styling for the title */
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

/* Styling for the buttons section */
.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
