import { Component } from 'react';
import TILE_MODIFIERS from './TILE_MODIFIERS';
import './Tile.css';
import { GameContext } from './GameContext';

export default class TileElement extends Component {
  static contextType = GameContext;
  constructor(props){
    super(props);
    this.letter = props.letter;
    this.modifier = props.modifier;
    this.usesLeft = props.usesLeft;
    this.eternal = props.eternal;
    this.playerTile = props.playerTile;
    this.selectable = props.selectable;
    this.onClick = props.onClick;
  }

  render(){
    let tileDisplayClassName = "tile";
    switch(this.modifier){
      case TILE_MODIFIERS.EXTRA_DAMAGE:
        tileDisplayClassName += " extra-damage";
        break;
      case TILE_MODIFIERS.BOMB:
        tileDisplayClassName += " bomb";
        break;
      case TILE_MODIFIERS.WEAK:
        tileDisplayClassName += " weak";
        break;
    }
    if(this.playerTile){
      tileDisplayClassName += " player";
    }
    return (
      <div className={tileDisplayClassName} onClick={this.onClick}>
        <p className="tileLetter">{this.modifier === TILE_MODIFIERS.WILD ? "?" : this.letter}</p>
        <p className="usesLeft">{this.eternal ? "∞" : this.usesLeft}</p>
      </div>
    );
  }
}