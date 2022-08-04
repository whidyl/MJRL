class Tile {
  constructor(info) {
    this.char = info.char || "";
    this.isWalkable = info.isWalkable || false;
  }
}

export default class Map {
  constructor(dims) {
    if (!dims) {
      throw new Error("A new map must be provided with a dims object.");
    }
    this.tiles = [...Array(dims.h)].map((_) =>
      Array(dims.w).fill(new Tile({ char: "", isWalkable: true }))
    );
  }

  setChar(pos, char) {
    if (this.posOutOfBounds(pos)) {
      throw new Error(this.makeOutOfBoundsMsg(pos));
    }
    this.get(pos).char = char;
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
    if (this.posOutOfBounds(pos)) {
      throw new Error(this.makeOutOfBoundsMsg(pos));
    }
    return this.get(pos).char;
  }

  set(pos, tileInfo) {
    this.tiles[pos.x][pos.y] = new Tile(tileInfo);
  }

  get(pos) {
    return this.tiles[pos.x][pos.y];
  }
}
