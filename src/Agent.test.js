import Agent from "./Agent.js";
import Pos from "./ParamClasses/Pos";

describe("Agent", () => {
  it("is positioned 0,0 by default", () => {
    let agent = new Agent();

    expect(agent.pos).toStrictEqual({ x: 0, y: 0 });
  });

  it("Has properties provided in info after constructing", () => {
    let agent = new Agent(
      { x: 1, y: 1 },
      { id: "Player", name: "Player", char: "@" }
    );

    expect(agent.id).toBe("Player");
    expect(agent.char).toBe("@");
    expect(agent.name).toBe("Player");
  });
});
