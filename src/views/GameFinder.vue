<template>
  <html>
  <body>
  <header>
    <div class="title">
      <h1>GAME<br>FINDER</h1>
    </div>
  </header>
  <main>
    <div class="buttons">
      <CustomButton2 type="button">AVAILABLE GAMES</CustomButton2>
      <CustomButton2 type="button">FINISHED GAMES</CustomButton2>
      <br>
      <br>
    </div>
    <div class="form">
      <ImageButton class="search" type="button" image-url="../../public/images/8666693_search_icon.svg"></ImageButton>
      <TextInput id="date" placeholder="Date" v-model="date" />
    </div>
    <div class="scroll-list">
      <a href="#" v-for="item in items" :key="item.id">
        <div class="item-content">
          <div class="item-field item-field1">{{ item.field1 }}</div>
          <div class="item-field item-field2">{{ item.field2 }}</div>
          <div class="item-field">
            {{ item.field3 }}
            <br />
            {{ item.field4 }}
          </div>
        </div>
      </a>
    </div>
  </main>
  </body>
  </html>
</template>

<script setup>
import TextInput from "./components/TextInput.vue";
import CustomButton2 from "./components/CustomButton2.vue";
import ImageButton from "./components/ImageButton.vue";

let avaliableGames = 'AVAILABLE GAMES';
let finishedGames = 'FINISHED GAMES';
let date = 'DATE';

const items = [];
let i;

const randomDates = Array.from({ length: 50 }, () => {
  const randomTime = Math.random() * Date.now();
  const randomDate = new Date(randomTime);
  return randomDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
});


for (i = 0; i < 50; i++) {
  items.push({
    id: i,
    field1: randomDates[i],
    field2: '1/2' + '    |    ' + '2X2' + '    |    ' + '40HP',
  });
}
</script>

<style scoped>
html, body{
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

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: auto;
  margin-top: 10px;
  margin-left: 10px;
}

.search {
  width: 30px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 20px;
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
  height: 60px;
  width: 275px;
  border-radius: 15px;
}

.scroll-list a:last-child {
  border-bottom: none; /* Remove the border from the last item */
}

.scroll-list a:hover {
  background-color: #777;
}

.form {
  width: 200px;
  display: flex;
  align-items: center;
}

.item-content {
  text-align: left;
}

.item-field {
  text-align: center;
}

.item-field1 {
  font-weight: bold;
  font-size: 1.2em;
}

.item-field2 {
  font-size: 1.2em;
  color: #435283;
}
</style>