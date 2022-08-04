import Pos from "./ParamClasses/Pos.js";

export default class Agent {
  constructor(pos = new Pos(5, 5), info) {
    this.pos = pos;
    if (info) {
      this.char = info.char || "@";
      this.id = info.id || "";
    }
  }

  goN(d) {
    this.pos.y -= d;
  }

  goE(d) {
    this.pos.x += d;
  }

  goS(d) {
    this.pos.y += d;
  }

  goW(d) {
    this.pos.x -= d;
  }
}
