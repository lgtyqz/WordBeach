import { Component } from "react";
import { cloneGameState, GameContext, cloneEnemy } from "./GameContext.js";
import TileElement from "./TileElement";
import './PlayerControls.css';
import rawDictionary from './words_alpha.txt';
import UI_SCREENS from "./UI_SCREENS.js";
import TILE_MODIFIERS from "./TILE_MODIFIERS.js";
import ENEMY_LIST from "./ENEMY_LIST.js";

const HARD_LETTERS = ["J", "K", "Q", "X", "Z"];
const COMMON_LETTERS = ["A", "E", "I", "O", "U", "S", "T", "R", "L", "N"];
const VOWELS = ["A", "E", "I", "O", "U"];
const ELITE_CHANCE = 0.25;

export default class PlayerControls extends Component {
  static contextType = GameContext;
  constructor(props){
    super(props);
    this.DICTIONARY = [];
    this.setGameState = props.setGameState;

    this.state = {
      viewingBag: false
    }
  }

  componentDidMount(){
    // let rawDictionary = "";
    fetch(rawDictionary)
      .then(response => response.text())
      .then(text => {
        this.DICTIONARY = text.split("\r\n");
        console.log(this.DICTIONARY);
      });
  }

  showBag(){
    this.setState({
      viewingBag: true
    })
  };

  hideBag(){
    this.setState({
      viewingBag: false
    })
  }

  collectWord(){
    // Collect word from tiles
    let word = "";

    let hasWild = false;
    for(let i = 0; i < this.context.currentWord.length; i++){
      // Check for wilds

      // Otherwise, add letter as normal
      word += this.context.currentWord[i].letter;
    }
    word = word.toLowerCase();
    return word;
  }

  isValidWord(){
    // Collect word from tiles
    let word = this.collectWord();

    let hasWild = false;

    // Words must be 3 or more letters long to be valid
    if(this.context.currentWord.length < 3){
      return false;
    }
    // If wilds exist, convert to regex

    // Check if word is in dictionary
    if(!hasWild){
      for(let i = 0; i < this.DICTIONARY.length; i++){
        if(word === this.DICTIONARY[i]){
          return true;
        }
      }
    }
    return false;
  }

  calculateWordDamage(){
    let totalDamage = 0;
    let word = this.collectWord();
    for(let i = 0; i < this.context.currentWord.length; i++){
      let tileDamage = 2;
      if(HARD_LETTERS.includes(this.context.currentWord[i].letter)){
        tileDamage = 5;
      }else if(COMMON_LETTERS.includes(this.context.currentWord[i].letter)){
        tileDamage = 1;
      }

      if(this.context.currentWord[i].modifier === TILE_MODIFIERS.EXTRA_DAMAGE){
        tileDamage *= 3;
      }else if(
        this.context.currentWord[i].modifier === TILE_MODIFIERS.BOMB &&
        this.context.currentWord[i].usesLeft === 0
      ){
        tileDamage *= 4;
      }else if(this.context.currentWord[i].modifier === TILE_MODIFIERS.WEAK){
        tileDamage = Math.floor(tileDamage/2);
      }

      totalDamage += tileDamage;
    }

    totalDamage *= word.length;
    return totalDamage;
  }

  rerollTiles(){
    // Add all tiles in word & hand to bag
    // Then draw 9 from bag

    let newGameState = cloneGameState(this.context);

    for(let i = newGameState.currentWord.length - 1; i >= 0; i--){
      newGameState.playerBag.push(newGameState.currentWord[i]);
      console.log(newGameState.currentWord[i]);
      newGameState.currentWord.splice(i, 1);
    }

    for(let i = newGameState.playerHand.length - 1; i >= 0; i--){
      newGameState.playerBag.push(newGameState.playerHand[i]);
      console.log(newGameState.playerHand[i]);
      newGameState.playerHand.splice(i, 1);
    }

    for(let i = 0; i < 9; i++){
      // Choose random from bag
      let bagIndex = Math.floor(Math.random() * newGameState.playerBag.length);
      let tile = newGameState.playerBag.splice(bagIndex, 1)[0];
      newGameState.playerHand.push(tile);
      console.log(tile);
    }

    newGameState.playerRerollsLeft--;

    this.setGameState(newGameState);
  }

  advanceGameState(){
    console.log(this.context);
    let newGameState = cloneGameState(this.context);

    // Calculate, then Deal damage to enemy
    let word = this.collectWord();
    if(this.isValidWord()){
      let wordDamage = this.calculateWordDamage();
      if(this.context.currentEnemyData.damageModifier){
        newGameState.currentEnemyData.hp -= this.context.currentEnemyData.damageModifier(word, wordDamage);
      }else{
        newGameState.currentEnemyData.hp -= wordDamage;
      }
      newGameState.wordsUsed.push(word);
    }

    // Set rerolls to 1
    newGameState.playerRerollsLeft = 1;

    // Use up tiles that went into the attack, then return them to bag
    for(let i = newGameState.currentWord.length - 1; i >= 0; i--){
      if(!newGameState.currentWord[i].eternal){
        newGameState.currentWord[i].usesLeft--;
      }
      if(newGameState.currentWord[i].usesLeft > 0 || newGameState.currentWord[i].eternal){
        newGameState.playerBag.push(newGameState.currentWord[i]);
      }
      newGameState.currentWord.splice(i, 1);
    }

    // Draw tiles until you hit 9
    for(let i = 0; i < 9 - this.context.playerHand.length; i++){
      // Choose random from bag
      if(newGameState.playerBag.length > 0){
        let bagIndex = Math.floor(Math.random() * newGameState.playerBag.length);
        let tile = newGameState.playerBag.splice(bagIndex, 1)[0];
        newGameState.playerHand.push(tile);
      }
    }
    

    // If enemy dead, add enemy tiles to bag & heal to full
    if(newGameState.currentEnemyData.hp <= 0){
      newGameState.playerBag = newGameState.playerBag.concat(newGameState.currentEnemyData.tiles);
      newGameState.playerHP = 10;
      // Then go to choice screen
      // Select two new random enemies to face
      if(newGameState.fightCount <= newGameState.totalFights &&
        newGameState.currentEnemyData.name !== newGameState.bossData.name
      ){
        newGameState.uiScreen = UI_SCREENS.CHOICE;
      }
      for(let i = 0; i < 2; i++){
        if(Math.random() < ELITE_CHANCE){
          newGameState.currentChoice[i] = ENEMY_LIST.elites[Math.floor(Math.random() * ENEMY_LIST.elites.length)];
        }else{
          newGameState.currentChoice[i] = ENEMY_LIST.enemies[Math.floor(Math.random() * ENEMY_LIST.enemies.length)];
        }
      }
    }else{
      // If not, advance their turn timer by 1
      newGameState.currentEnemyData.currentAttackDelay--;

      // If it goes to zero, they attack! -> then reset timer
      if(newGameState.currentEnemyData.currentAttackDelay <= 0){
        newGameState.playerHP -= newGameState.currentEnemyData.damage;
        // Apply any additional debuffs as necessary
        if(newGameState.playerHP <= 0){

        }
        newGameState.currentEnemyData.currentAttackDelay = newGameState.currentEnemyData.totalAttackDelay;
      }
    }

    // Check if you are dead & respond appropriately

    this.setGameState(newGameState);
  }

  render(){
    
    return (
      <div id="player-controls">
        <div id="word-holder">
          {this.context.currentWord.map((tile, index) => {
            return (
              <TileElement
                letter={tile.letter}
                modifier={tile.modifier}
                usesLeft={tile.usesLeft}
                eternal={tile.eternal}
                playerTile={true}
                key={tile.letter + tile.usesLeft + "/" + index}
                selectable={tile.selectable}
                onClick={() => {
                  // Remove letter from word
                  let newGameState = cloneGameState(this.context);
                  let selectedTile = newGameState.currentWord.splice(index, 1)[0];
                  newGameState.playerHand.push(selectedTile);
                  this.setGameState(newGameState);
                }}
              ></TileElement>
            )
          })}
        </div>
        <div id="lower-controls">
          <div id="left-controls">
            <button id="reroll-button" disabled={this.context.playerRerollsLeft > 0 ? null : "disabled"} onClick={() => this.rerollTiles()}>
              <p>Reroll ({this.context.playerRerollsLeft} left)</p>
            </button>
            <button id="skip-button" onClick={() => this.advanceGameState()}>
              <p>Skip turn</p>
            </button>
          </div>
          <div id="letters-holder">
            {this.context.playerHand.map((tile, index) => {
              return (
                <TileElement
                  letter={tile.letter}
                  modifier={tile.modifier}
                  usesLeft={tile.usesLeft}
                  eternal={tile.eternal}
                  playerTile={true}
                  key={tile.letter + tile.usesLeft + "/" + index}
                  selectable={tile.selectable}
                  onClick={() => {
                    // Add letter to word
                    let newGameState = cloneGameState(this.context);
                    console.log(newGameState.playerHand);
                    console.log(tile.letter);
                    console.log(index);
                    let selectedTile = newGameState.playerHand.splice(index, 1)[0];
                    console.log(newGameState.playerHand);
                    newGameState.currentWord.push(selectedTile);
                    this.setGameState(newGameState);
                  }}
                ></TileElement>
              )
            })}
          </div>
          <div id="right-side-buttons">
            <button id="submit-button" disabled={this.isValidWord() ? null : "disabled"} onClick={() => this.advanceGameState()}>
              <p>Submit Word</p>
            </button>
            <button id="view-bag-button" onClick={() => this.showBag()}>
              <p>View Bag</p>
            </button>
          </div>
        </div>
        <div id="health-display">
          Your HP: {this.context.playerHP}/10
        </div>
        <div id="bag-overlay" onClick={() => this.hideBag()} className={!this.state.viewingBag ? "hidden-overlay" : ""}>
          <div id="bag-tiles">
            {
              this.context.playerBag.map((tile, index) => {
                return (
                  <TileElement
                    letter={tile.letter}
                    modifier={tile.modifier}
                    usesLeft={tile.usesLeft}
                    eternal={tile.eternal}
                    playerTile={false}
                    key={tile.letter + tile.usesLeft + "/" + index}
                    selectable={tile.selectable}
                    onClick={() => {
                      
                    }}
                  ></TileElement>
                )
              })
            }
          </div>
          <p>Click anywhere to exit.</p>
        </div>
      </div>
    )
  }
}