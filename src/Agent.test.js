import Agent from "./Agent.js";
import Pos from "./ParamClasses/Pos";

describe("Agent", () => {
  it("is positioned 0,0 by default", () => {
    let agent = new Agent();

    expect(agent.pos).toStrictEqual(new Pos(5, 5));
  });

  it("moves north 1 when goN called.", () => {
    let agent = new Agent({ x: 5, y: 5 });

    agent.goN(1);

    expect(agent.pos).toStrictEqual({ x: 5, y: 4 });
  });

  it("moves as expected when several goX are called.", () => {
    let agent = new Agent({ x: 5, y: 5 });

    agent.goN(1);
    agent.goN(1);
    agent.goE(3);
    agent.goE(1);
    agent.goS(2);
    agent.goS(1);
    agent.goW(1);

    expect(agent.pos).toStrictEqual({ x: 8, y: 6 });
  });
});
