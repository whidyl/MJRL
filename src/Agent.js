import Pos from "./ParamClasses/Pos.js";

export default class Agent {
  constructor(pos = { x: 0, y: 0 }, info) {
    this.pos = pos;
    if (info) {
      this.char = info.char || "@";
      this.id = info.id || "";
    }
  }
}
