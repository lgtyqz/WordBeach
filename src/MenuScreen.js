import { Component, useContext } from "react";
import { cloneGameState, cloneEnemy, GameContext } from "./GameContext.js";
import UI_SCREENS from "./UI_SCREENS";
import './MenuScreen.css';
import ENEMY_LIST from "./ENEMY_LIST.js";

export default class MenuScreen extends Component {
  static contextType = GameContext;
  constructor(props){
    super(props);
    this.setGameState = props.setGameState;
  }

  render(){
    let showClass = "";
    if(this.context.uiScreen !== UI_SCREENS.MENU){
      showClass = "hidden";
    }
    return (
      <section id="menu" className={showClass}>
        <h1>wordbeach</h1>
        <button onClick={() => {
          let newGameState = cloneGameState(this.context);
          newGameState.uiScreen = UI_SCREENS.BATTLE;

          for(let i = 0; i < 9 - this.context.playerHand.length; i++){
            // Choose random from bag
            if(newGameState.playerBag.length > 0){
              let bagIndex = Math.floor(Math.random() * newGameState.playerBag.length);
              let tile = newGameState.playerBag.splice(bagIndex, 1)[0];
              newGameState.playerHand.push(tile);
            }
          }

          // Set boss info
          newGameState.bossData = cloneEnemy(ENEMY_LIST.bosses[Math.floor(Math.random() * ENEMY_LIST.bosses.length)]);
          newGameState.currentEnemyData = cloneEnemy(ENEMY_LIST.enemies[Math.floor(Math.random() * ENEMY_LIST.enemies.length)])
          this.setGameState(newGameState);
        }}>
          <p>Play!</p>
        </button>
      </section>
    )
  }
}