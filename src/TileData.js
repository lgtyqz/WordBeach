import TILE_MODIFIERS from './TILE_MODIFIERS';

export default class Tile {
  constructor(letter, usesLeft=1, modifier=TILE_MODIFIERS.NONE, eternal=false, selectable=true){
    this.letter = letter;
    this.modifier = modifier;
    this.usesLeft = usesLeft;
    this.eternal = eternal;
    this.selectable = selectable;
  }

  use(){
    this.usesLeft--;
  }
}