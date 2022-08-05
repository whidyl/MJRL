import Pos from "./ParamClasses/Pos.js";

export default class Agent {
  constructor(pos = new Pos(5, 5), info) {
    this.pos = pos;
    if (info) {
      this.char = info.char || "@";
      this.id = info.id || "";
    }
  }
}
