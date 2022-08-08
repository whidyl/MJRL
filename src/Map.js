import { copy } from "./utilities";

class Tile {
  constructor(info) {
    this.char = info.char || "";
    this.isWalkable = info.isWalkable || false;
    this.name = info.name || null;
    this.desc = info.desc || null;
  }
}

function initEmptyMtx(dims) {
  return [...Array(dims.h)].map((_) => Array(dims.w));
}

export default class Map {
  constructor(dims) {
    if (!dims) {
      throw new Error("A new map must be provided with a dims object.");
    }
    this.tiles = initEmptyMtx(dims);
    for (var x = 0; x < this.tiles[0].length; x++) {
      for (var y = 0; y < this.tiles.length; y++) {
        this.tiles[y][x] = new Tile({ char: "", isWalkable: true });
      }
    }
  }

  setChar(pos, char) {
    this.get(pos).char = char;
  }

  guardPosOutOfBounds(pos) {
    if (this.posOutOfBounds(pos)) {
      throw new Error(this.makeOutOfBoundsMsg(pos));
    }
  }

  makeOutOfBoundsMsg(pos) {
    return (
      `Position outside of map bounds. ` +
      `Pos at (${pos.x}, ${pos.y}) but dims were ` +
      `(${this.getWidth()}, ${this.getHeight()})`
    );
  }

  posOutOfBounds(pos) {
    return (
      pos.x < 0 ||
      pos.x >= this.getWidth() ||
      pos.y < 0 ||
      pos.y >= this.getHeight()
    );
  }

  getWidth() {
    return this.tiles[0].length;
  }

  getHeight() {
    return this.tiles.length;
  }

  getChar(pos) {
    return this.get(pos).char;
  }

  set(pos, tileInfo) {
    this.guardPosOutOfBounds(pos);
    this.tiles[pos.y][pos.x] = new Tile(tileInfo);
  }

  get(pos) {
    this.guardPosOutOfBounds(pos);
    return this.tiles[pos.y][pos.x];
  }

  [Symbol.iterator]() {
    //This is (-1, 0) initially because we return the value after incrementing.
    let currentPos = { x: -1, y: 0 };
    const makeReturn = (options) => {
      return {
        value: [this.get(currentPos), copy(currentPos)],
        done: options.isDone
      };
    };

    const onNext = () => {
      //if its hugging the right edge and not the bottom edge, we should jump to the next line.
      if (
        currentPos.y < this.getHeight() - 1 &&
        currentPos.x === this.getWidth() - 1
      ) {
        currentPos.y++;
        currentPos.x = 0;

        return makeReturn({ isDone: false });
      }
      //if not hugging the right edge or bottom edge, we move one to the right
      if (currentPos.x < this.getWidth() - 1) {
        currentPos.x++;

        return makeReturn({ isDone: false });
      }

      // if its hugging the right edge and bottom edge, we are done iterating.
      return makeReturn({ isDone: true });
    };

    return {
      next: onNext
    };
  }
}
