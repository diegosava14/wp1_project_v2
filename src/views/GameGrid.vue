<template>
  <section>
    <nav>
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
          <span>{{ player.hp }}/50HP</span>
          <ol>
            <li v-for="attack in player.attacks" :key="attack" @click="attackClicked(attack, player)">
              {{ attack }}
            </li>
          </ol>
          <div class="controls">
            <div class="arrow-up"><button class="arrow" @click="movePlayer('up', index)">&uarr;</button></div>
            <div class="arrow-left"><button class="arrow" @click="movePlayer('left', index)">&larr;</button></div>
            <div class="arrow-down"><button class="arrow" @click="movePlayer('down', index)">&darr;</button></div>
            <div class="arrow-right"><button class="arrow" @click="movePlayer('right', index)">&rarr;</button></div>
          </div>
        </div>
      </div>
      <button class="leave-game-button" @click="leaveGame()" > Leave Game </button>
    </footer>
  </section>
</template>

<script>
  import { ref } from "vue";
  import { getCurrentGame, leaveGame } from "../services/api.js";
  import router from "../router/index.js";

  //this data would be used if the api would be functional
  export default {
    data() {
      return {
      gameId: null,
      size: null,
      creationDate: null,
      finished: null,
      HPMax: null,
      start: null,
      playersGames: [],
    };
  },
  async created() {
    await this.initializeGameData();
  },

    //data to hardcore the initialisation
  data() {
    return {
      grid: this.createGrid(10, 10),
      players: [
        { name: 'MELONITO', hp: 25, attacks: ['Fireball', 'Magic Flush', 'Pit of Doom'], position: { x: 1, y: 1 }, direction: 'right', rotation: 0,},
        { name: 'PEPITO', hp: 10, attacks: ['Wing', 'Kick', 'Teleport'], position: { x: 8, y: 8 }, direction: 'down',  rotation: 270,},
      ],

    };
  },

  methods: {

      //this function would work with API calls to build the screen using the API info
    async initializeGameData() {
      const token = localStorage.getItem('token');
      try {
        const gameDataArray = await getCurrentGame(token);
        if (gameDataArray && gameDataArray.length > 0) {
          const gameData = gameDataArray[0];
          this.gameId = gameData.game_ID;
          this.size = gameData.size;
          this.creationDate = new Date(gameData.creation_date);
          this.finished = gameData.finished;
          this.HPMax = gameData.HP_max;
          this.start = gameData.start;
          this.playersGames = gameData.players_games;

          this.createGrid(this.size, this.size);

        } else {
          console.error('Failed to fetch game data or data is empty');
        }
      } catch (error) {
        console.error('Error initializing game data:', error);
      }
    },

    //allows user to exit the game
    leaveGame(){
      const token = localStorage.getItem('token');

      const response1 = leaveGame(token, this.gameId);

      console.log('Leave game API Response:', response1);

      if (response1.error) {
        console.error('Leave game failed:', response1.error.message);
      } else {
        router.push('/mainmenu');
      }

    },

    //initialises the playing grid
    createGrid(rows, cols) {
      return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
    },

    //controlls player's movements
    movePlayer(direction, playerIndex) {
      const player = this.players[playerIndex];
      const currentDirection = this.getDirectionFromRotation(player.rotation);

      //move
      if (currentDirection === direction) {
        const directionOffsets = {
          right: { x: 1, y: 0 },
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
        };

        //makes sure  player stays within the boundaries
        const newX = player.position.x + directionOffsets[direction].x;
        const newY = player.position.y + directionOffsets[direction].y;

        if (newX >= 0 && newX < this.grid[0].length && newY >= 0 && newY < this.grid.length) {
          player.position.x = newX;
          player.position.y = newY;
        }
      } else {
        //rotate
        const rotations = { right: 0, up: 270, left: 180, down: 90 };
        player.rotation = rotations[direction];
      }
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

    //action performed when attacks gets used (right now is hardcoded)
    attackClicked(attack, player) {
      if (attack === "Fireball"){
        player.position.y++;
        player.position.x += 3;

      } else if (attack === "Pit of Doom"){
        player.position.y -= 2;
        player.position.x ++;
      }

      //Should decrease the health if attack is successful

    },
  },
};
</script>


<style scoped>


ol li {
  cursor: pointer;
}


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
.controls {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  margin-top: 10px; /* adjust as needed */
}

.arrow-up {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.arrow-left {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.arrow-down {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.arrow-right {
  grid-column: 3 / 3;
  grid-row: 2 / 3;
}

.arrow {
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #133973;
}

.leave-game-button {
  background-color: #EBEF25;
  color: #133973;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.leave-game-button:hover {
  background-color: #d9534f;
}


</style>

