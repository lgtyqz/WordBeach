import { createContext } from "react";
import Tile from "./TileData";

export const GameContext = createContext();

export function cloneTiles(tileList){
  return tileList.map(tile => new Tile(
    tile.letter,
    tile.usesLeft,
    tile.modifier,
    tile.eternal,
    tile.selectable
  ));
}

export function cloneEnemy(enemyData){
  let newEnemy = Object.assign({}, enemyData);
  newEnemy.tiles = cloneTiles(enemyData.tiles);
  return newEnemy;
}

export function cloneGameState(gameState){
  let newGameState = Object.assign({}, gameState);
  // clone bag, hand, enemy data
  newGameState.playerBag = cloneTiles(gameState.playerBag);
  newGameState.playerHand = cloneTiles(gameState.playerHand);
  newGameState.currentEnemyData.tiles = cloneTiles(gameState.currentEnemyData.tiles);
  return newGameState;
}