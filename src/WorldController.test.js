import WorldController from "./WorldController.js";
import World from "./World.js";
import Map from "./Map.js";
import Agent from "./Agent.js";

function makeTestWorld() {
  let map = new Map({ w: 10, h: 10 });
  let player = new Agent({ x: 5, y: 5 }, { id: "player", char: "@" });
  return new World(map, [new Agent(), new Agent(), player]);
}

describe("WorldController", () => {
  it("fails to construct without world arg", () => {
    expect(() => {
      new WorldController();
    }).toThrow("WorldController needs to be constructed with a World object");
  });

  it("Can select agent based on identifier", () => {
    let worldCont = new WorldController(makeTestWorld());

    const selected = worldCont.findAgent({ id: "player" });

    expect(selected.id).toBe("player");
  });

  it("throws error if agent can't be found", () => {
    let worldCont = new WorldController(makeTestWorld());

    expect(() => {
      worldCont.findAgent({ id: "playa" });
    }).toThrow("could not find agent with id 'playa'");
  });

  it("moves agent as expected when moveAgentTo called", () => {
    let worldCont = new WorldController(makeTestWorld());
    let player = worldCont.findAgent({ id: "player" });

    worldCont.moveAgentTo(player, { dx: 1, dy: -1 });

    expect(player.pos).toStrictEqual({ x: 6, y: 4 });
  });

  it("Doesn't move agent over boarder when moveAgentTo called", () => {
    let map = new Map({ w: 10, h: 10 });
    let player = new Agent({ x: 9, y: 5 }, { id: "player" });
    let worldCont = new WorldController(new World(map, [player]));

    worldCont.moveAgentTo(player, { dx: 1, dy: 0 });

    expect(player.pos).toStrictEqual({ x: 9, y: 5 });
  });
});
