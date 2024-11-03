import './App.css';
import { createContext, useState } from 'react';
import { GameContext } from './GameContext';
import Tile from './TileData';
import UI_SCREENS from './UI_SCREENS';
import BattleScreen from './BattleScreen';
import ChoiceScreen from './ChoiceScreen';
import TILE_MODIFIERS from './TILE_MODIFIERS';
import MenuScreen from './MenuScreen';


export const INITIAL_GAME_STATE = {
  uiScreen: UI_SCREENS.MENU,
  playerBag: [
    new Tile("C", 3, TILE_MODIFIERS.EXTRA_DAMAGE, true),
    new Tile("H", 3),
    new Tile("E", 3),
    new Tile("E", 3),
    new Tile("S", 3),
    new Tile("E", 3),
    new Tile("G", 3),
    new Tile("R", 3),
    new Tile("A", 3),
    new Tile("N", 3),
    new Tile("O", 3),
    new Tile("L", 3),
    new Tile("A", 3),
    new Tile("F", 3),
    new Tile("R", 3),
    new Tile("U", 3),
    new Tile("I", 3),
    new Tile("T", 3),
    new Tile("S", 3),
  ],
  playerHand: [
    
  ],
  playerHP: 10,
  playerRerollsLeft: 1,
  totalFights: 7,
  fightCount: 1,
  currentWord: [], // list of tiles
  currentEnemyData: {
    name: "slimey",
    tiles: [
      new Tile("S", 2),
      new Tile("L", 2),
      new Tile("I", 2),
      new Tile("M", 2),
      new Tile("E", 2),
      new Tile("Y", 2),
    ],
    hp: 100,
    maxHP: 100,
    currentAttackDelay: 2,
    totalAttackDelay: 2,
    damage: 1,
    abilityDescription: "No ability.",
    enemyImgSrc: require("./assets/slime.png")
  },
  bossData: {
    name: "The Red Baron",
    tiles: [
      new Tile("R"),
      new Tile("E"),
      new Tile("D"),
      new Tile("B"),
      new Tile("A"),
      new Tile("R"),
      new Tile("O"),
      new Tile("N"),
    ],
    hp: 400,
    maxHP: 400,
    currentAttackDelay: 4,
    totalAttackDelay: 4,
    damage: 5,
    abilityDescription: "Only vulnerable to words with 3 or more vowels.",
    enemyImgSrc: "",
    damageModifier: function(word, damage) {
      let vowelString = (word.match(/[aeiou]/gi));
      let vowelCount = vowelString === null ? 0 : vowelString.length;
      if(vowelCount >= 3){
        return damage;
      }else{
        return 0;
      }
    }
  },
  currentChoice: [
    {
      name: "penis",
      tiles: [
        new Tile("S", 2),
        new Tile("L", 2),
        new Tile("I", 2),
        new Tile("M", 2),
        new Tile("E", 2),
        new Tile("Y", 2),
      ],
      hp: 100,
      maxHP: 100,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 1,
      abilityDescription: "No ability.",
      enemyImgSrc: require("./assets/slime.png")
    },
    {
      name: "penis",
      tiles: [
        new Tile("A", 3),
        new Tile("E", 3),
        new Tile("I", 3),
        new Tile("O", 3),
        new Tile("U", 3),
        new Tile("S", 4),
        new Tile("N", 4)
      ],
      hp: 100,
      maxHP: 100,
      currentAttackDelay: 2,
      totalAttackDelay: 2,
      damage: 1,
      abilityDescription: "No ability.",
      enemyImgSrc: require("./assets/slime.png")
    }
  ],
  wordsUsed: []
};

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  return (
    <div>
      <GameContext.Provider value={gameState}>
        <MenuScreen setGameState={setGameState}></MenuScreen>
        <BattleScreen setGameState={setGameState}></BattleScreen>
        <section id="storytelling">

        </section>
        <ChoiceScreen setGameState={setGameState}></ChoiceScreen>
        <section id="end-screen">

        </section>
      </GameContext.Provider>
    </div>
  );
}

export default App;
