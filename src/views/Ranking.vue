<template>
  <main>
    <header>
      <div class="actionButtons">
        <ImageButton class="back" type="button" @click="backButtonClicked" image-url="/images/arrow_back_FILL0_wght400_GRAD0_opsz24.svg"></ImageButton>
      </div>
      <div class="title">
        <h1>RANKING</h1>
      </div>
    </header>
    <article>
      <div class="scroll-list">
        <a href="#" @click="itemClicked" v-for="item in items" :key="item.id">
          {{ item.text }}
        </a>
      </div>
    </article>
  </main>
</template>

<script setup>
import ImageButton from "./components/ImageButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const items = [];
let i;

for (i = 0; i < 100; i++) {
  items.push({ id: i, text: 'Player' + i });
}

const backButtonClicked = () => {
  router.push('/mainmenu');
};

const itemClicked = () => {
  router.push('/otheraccount');
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
  text-align: center;
  padding: 14px;
  text-decoration: none;
  border-bottom: 4px solid #133973;
  background: #EBEF25;
  width: 250px;
  border-radius: 15px;
}

.scroll-list a:last-child {
  border-bottom: none; /* Remove the border from the last item */
}

.scroll-list a:hover {
  background-color: #777;
}
</style>