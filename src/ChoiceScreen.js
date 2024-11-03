import { Component, useContext } from "react";
import { cloneGameState, GameContext, cloneEnemy } from "./GameContext.js";
import UI_SCREENS from "./UI_SCREENS";
import TileElement from "./TileElement";
import './ChoiceScreen.css';

export default class ChoiceScreen extends Component {
  static contextType = GameContext;
  constructor(props){
    super(props);
    this.setGameState = props.setGameState;
  }

  render(){
    if(this.context.uiScreen !== UI_SCREENS.CHOICE){
      return (
        <section id="battle"></section>
      );
    }

    if(this.context.fightCount < this.context.totalFights){
      return (
        <section id="choice">
          <h1 id="fights-left-count">{this.context.totalFights - this.context.fightCount}</h1>
          <h2>fights left until {this.context.bossData.name}!</h2>

          <p id="boss-ability">(Ability: {this.context.bossData.abilityDescription})</p>
  
          <h2>Choose your next fight:</h2>
          <div id="fight-choice">
            <div id="choice-a" onClick={() => {
              let newGameState = cloneGameState(this.context);
              newGameState.fightCount++;
              newGameState.currentEnemyData = cloneEnemy(newGameState.currentChoice[0]);
              newGameState.uiScreen = UI_SCREENS.BATTLE;
              this.setGameState(newGameState);
            }}>
              <div className="tile-holder">
                {
                  this.context.currentChoice[0].tiles.map((tile, index) => {
                    return (
                      <TileElement
                        letter={tile.letter}
                        modifier={tile.modifier}
                        usesLeft={tile.usesLeft}
                        eternal={tile.eternal}
                        playerTile={false}
                        key={tile.letter + tile.usesLeft + "/" + index}
                        selectable={tile.selectable}
                        onClick={() => {}}
                      ></TileElement>
                    )
                  })
                }
              </div>
              <img src={this.context.currentChoice[0].enemyImgSrc}></img>
              <p>Ability: {this.context.currentChoice[0].abilityDescription}</p>
            </div>
  
            <div id="choice-b" onClick={() => {
              let newGameState = cloneGameState(this.context);
              newGameState.fightCount++;
              newGameState.currentEnemyData = cloneEnemy(newGameState.currentChoice[1]);
              newGameState.uiScreen = UI_SCREENS.BATTLE;
              this.setGameState(newGameState);
            }}>
              <div className="tile-holder">
                {
                  this.context.currentChoice[1].tiles.map((tile, index) => {
                    return (
                      <TileElement
                        letter={tile.letter}
                        modifier={tile.modifier}
                        usesLeft={tile.usesLeft}
                        eternal={tile.eternal}
                        playerTile={false}
                        key={tile.letter + tile.usesLeft + "/" + index}
                        selectable={tile.selectable}
                        onClick={() => {}}
                      ></TileElement>
                    )
                  })
                }
              </div>
              <img src={this.context.currentChoice[1].enemyImgSrc}></img>
              <p>Ability: {this.context.currentChoice[1].abilityDescription}</p>
            </div>
          </div>
        </section>
      ); 
    }else{
      return (
        <section id="choice">
          <h2>No more running. Time to fight {this.context.bossData.name}!</h2>
          <button onClick={() => {
            let newGameState = cloneGameState(this.context);
            newGameState.currentEnemyData = cloneEnemy(newGameState.bossData);
            newGameState.uiScreen = UI_SCREENS.BATTLE;
            this.setGameState(newGameState);
          }}><p>Continue</p></button>
        </section>
      )
    }
  }
}