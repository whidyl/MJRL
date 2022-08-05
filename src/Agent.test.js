import Agent from "./Agent.js";
import Pos from "./ParamClasses/Pos";

describe("Agent", () => {
  it("is positioned 0,0 by default", () => {
    let agent = new Agent();

    expect(agent.pos).toStrictEqual(new Pos(5, 5));
  });
});
