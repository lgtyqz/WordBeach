import { Component, useContext } from "react";
import { GameContext } from "./GameContext.js";
import { cloneGameState, cloneEnemy } from "./GameContext.js";
import UI_SCREENS from "./UI_SCREENS";
import TileElement from "./TileElement";
import PlayerControls from "./PlayerControls.js";
import './BattleScreen.css';
import { INITIAL_GAME_STATE } from "./App.js";


export default class BattleScreen extends Component {
  static contextType = GameContext;
  constructor(props){
    super(props);
    this.setGameState = props.setGameState;
  }

  componentDidMount(){

  }

  resetGame(){
    let newGameState = cloneGameState(this.context);
    newGameState = INITIAL_GAME_STATE;
    this.setGameState(newGameState);
  }

  render(){
    let battleScreenClasses = "";
    if(this.context.uiScreen !== UI_SCREENS.BATTLE){
      battleScreenClasses += "hidden";
    }

    let youLoseClasses = "hidden";
    if(this.context.playerHP <= 0){
      youLoseClasses = "";
    }

    let youWinClasses = "hidden";
    if(this.context.currentEnemyData.hp <= 0 && this.context.fightCount >= this.context.totalFights&&
      this.context.bossData.name === this.context.currentEnemyData.name
    ){
      youWinClasses = "";
    }

    return (
      <section id="battle" className={battleScreenClasses}>
        <div id="enemy-info">
          <div id="enemy-ability-holder">
            <h1>ABILITY</h1>
            <p id="enemy-ability-info">{this.context.currentEnemyData.abilityDescription}</p>
          </div>
          <div id="enemy-tiles-and-hp">
            <div id="enemy-tiles">
              {
                this.context.currentEnemyData.tiles.map((tile, index) => {
                  return (
                    <TileElement
                      letter={tile.letter}
                      key={tile.letter + tile.usesLeft + "/" + index}
                      modifier={tile.modifier}
                      usesLeft={tile.usesLeft}
                      eternal={tile.eternal}
                      playerTile={false}
                    ></TileElement>
                  )
                })
              }
            </div>
            <div id="enemy-hp">
              HP: {this.context.currentEnemyData.hp}/{this.context.currentEnemyData.maxHP}
            </div>
          </div>
          <div id="enemy-turn-holder">
            <h1>ATTACKS AFTER:</h1>
            <p id="enemy-turn-info">{this.context.currentEnemyData.currentAttackDelay}/{this.context.currentEnemyData.totalAttackDelay} turns</p>
          </div>
        </div>
        <img src={this.context.currentEnemyData.enemyImgSrc}></img>
        <PlayerControls setGameState={this.setGameState}></PlayerControls>
        <div id="you-died" className={youLoseClasses}>
          <h1>YOU DIED</h1>
          <button onClick={() => {this.resetGame()}}>
            <p>Try again?</p>
          </button>
        </div>
        <div id="you-win" className={youWinClasses}>
          <h1>YOU WIN!</h1>
          <h2>Words used: {this.context.wordsUsed.join(", ")}</h2>
          <button onClick={() => {this.resetGame()}}>
            <p>Play again?</p>
          </button>
        </div>
      </section>
    )
  }
}