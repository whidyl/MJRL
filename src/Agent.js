import Pos from "./ParamClasses/Pos.js";

export default class Agent {
  constructor(pos = { x: 0, y: 0 }, info) {
    this.pos = pos;
    if (info) {
      this.char = info.char || "@";
      this.id = info.id || null;
      this.name = info.name || null;
    }
  }

  look() {
    this.guardAgainstNullName();
    return {
      name: this.name,
      desc: this.desc || "",
      imgPath: this.imgPath
    };
  }

  guardAgainstNullName() {
    if (this.name === null) {
      throw new Error("Tried to look at agent with a null name.");
    }
  }

  get imgPath() {
    return `./Images/Agents/${this.name}/${this.name.toLowerCase()}1.jpg`;
  }
}
