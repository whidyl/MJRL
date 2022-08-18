import Pos from "./ParamClasses/Pos.js";

export default class Agent {
  constructor(pos = { x: 0, y: 0 }, info) {
    this.pos = pos;
    if (info) {
      this.char = info.char || "@";
      this.id = info.id || null;
      this.name = info.name || null;
      this.desc = info.desc || null;
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
    const folderName = this.name.replace(" ", "_");
    const fileName = this.name.replace(" ", "_").toLowerCase();
    return `./Images/Agents/${folderName}/${fileName}1.png`;
  }
}
