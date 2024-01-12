<template>
  <section>
    <nav>
      <button>&larr;</button>
      <time datetime="2023-11-07">7/11/23</time>
    </nav>
    <article>
      <table>
        <thead>
        <tr>
          <th scope="col" v-for="n in grid[0].length" :key="n"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" :class="{ 'filled': isCellActiveForAnyPlayer(cellIndex, rowIndex) }">
            <img v-if="players[0].position.x === cellIndex && players[0].position.y === rowIndex" class="player-dot" src="./images/greenCircle.png" :style="{ transform: 'rotate(' + players[0].rotation + 'deg)' }" />
            <img v-if="players[1].position.x === cellIndex && players[1].position.y === rowIndex" class="player-dot" src="./images/redCircle.png" :style="{ transform: 'rotate(' + players[1].rotation + 'deg)' }" />
          </td>
        </tr>
        </tbody>
      </table>
    </article>
    <footer>
      <div class="players">
        <div class="player" v-for="(player, index) in players" :key="player.name">
          <h2 :class="{'player-name-green': index === 0, 'player-name-red': index === 1}">{{ player.name }}</h2>
          <progress :value="player.hp" max="30"></progress>
          <span>{{ player.hp }}/30HP</span>
        </div>
      </div>
      <ol>
        <CustomButton type="button">PLAY</CustomButton>
      </ol>
    </footer>
  </section>
</template>

<script>

import CustomButton from "./components/CustomButton.vue";

/* here we should load the record from memory and play it after user presses play*/
export default {

  name: 'Game',
  components: {CustomButton},
  data() {
    return {
      grid: this.createGrid(10, 10),
      players: [
        { name: 'MANOLITO', hp: 30, position: { x: 1, y: 1 }, direction: 'right', rotation: 90,},
        { name: 'PEPITTtO', hp: 30, position: { x: 3, y: 5 }, direction: 'down',  rotation: 270,},
      ],

    };
  },



  methods: {
    createGrid(rows, cols) {
      return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
    },


    //checks either of the player's highlighted cells
    isCellActiveForAnyPlayer(cellX, cellY) {
      return this.players.some(player => this.isCellActive(cellX, cellY, player));
    },

    ///checks what cell to highlight
    isCellActive(cellX, cellY, player) {

      const playerDirection = this.getDirectionFromRotation(player.rotation);

      const directionOffsets = {
        right: { x: 1, y: 0 },
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
      };
      const offset = directionOffsets[playerDirection];
      if (!offset) return false;

      for (let x = player.position.x + offset.x, y = player.position.y + offset.y;
           x < this.grid[0].length && y < this.grid.length && x >= 0 && y >= 0;
           x += offset.x, y += offset.y) {
        if (x === cellX && y === cellY) return true;
      }
      return false;
    },

    //identifies how much to turn the image representing each player
    getDirectionFromRotation(rotation) {
      const directions = {0: 'right', 270: 'up', 180: 'left', 90: 'down'};
      return directions[rotation];
    },

  },
};
</script>


<style scoped>

section {
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


nav {
  display: flex;
  justify-content: space-between;
  width: 90%;
}


table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  margin: auto;
}


td {
  background-color: #D9D9D9;
  width: 20px;
  height: 20px;
  position: relative;
  border: 2px solid #000;
}

td::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #EBEF25;
  opacity: 0;
}

td.filled::after {
  opacity: 1;
}

.players {
  display: flex;
  justify-content: space-around;
  width: 100%;
}


.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 45%;
  margin: 0.5rem;
}

.player-name-green {
  color: #31bc37;
}

.player-name-red {
  color: #a82828;
}


progress {
  width: 100%;
}

.player-dot {
  max-width: 100%;
  max-height: 100%;
  display: block;
}


</style>

