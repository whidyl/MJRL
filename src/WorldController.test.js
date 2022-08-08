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

  it("Doesn't move agent over boarder when moveAgentTo outside border", () => {
    let map = new Map({ w: 10, h: 10 });
    let player = new Agent({ x: 9, y: 5 }, { id: "player" });
    let worldCont = new WorldController(new World(map, [player]));

    worldCont.moveAgentTo(player, { dx: 1, dy: 0 });

    expect(player.pos).toStrictEqual({ x: 9, y: 5 });
  });

  it("Doesn't move agent over unwalkable tile when moveAgentTo unmovable tile", () => {
    let map = new Map({ w: 10, h: 10 });
    map.set({ x: 5, y: 5 }, { char: "#", isWalkable: false });
    let player = new Agent({ x: 4, y: 5 }, { id: "player" });
    let worldCont = new WorldController(new World(map, [player]));

    worldCont.moveAgentTo(player, { dx: 1, dy: 0 });

    expect(player.pos).toStrictEqual({ x: 4, y: 5 });
  });

  describe("look", () => {
    let worldCtrl;
    beforeEach(() => {
      let map = new Map({ w: 3, h: 3 });
      let world = new World(map);
      worldCtrl = new WorldController(world);
    });

    it("returns name for tile at specified location", () => {
      const map = worldCtrl.target.map;
      map.set({ x: 1, y: 1 }, { name: "bar" });
      map.set({ x: 0, y: 0 }, { name: "foo" });

      const name1 = worldCtrl.look({ x: 1, y: 1 })[0].name;
      const name2 = worldCtrl.look({ x: 0, y: 0 })[0].name;

      expect(name1).toBe("bar");
      expect(name2).toBe("foo");
    });

    it("returns name and description for tile at pos", () => {
      const map = worldCtrl.target.map;
      map.set({ x: 1, y: 1 }, { name: "bar", desc: "Typical bar." });
      map.set({ x: 0, y: 0 }, { name: "foo", desc: "Typical foo." });

      const name1 = worldCtrl.look({ x: 1, y: 1 })[0].name;
      const desc1 = worldCtrl.look({ x: 1, y: 1 })[0].desc;
      const name2 = worldCtrl.look({ x: 0, y: 0 })[0].name;
      const desc2 = worldCtrl.look({ x: 0, y: 0 })[0].desc;

      expect(name1).toBe("bar");
      expect(desc1).toBe("Typical bar.");
      expect(name2).toBe("foo");
      expect(desc2).toBe("Typical foo.");
    });

    it("Throws error looking for tile with null name", () => {
      expect(() => worldCtrl.look({ x: 1, y: 1 })).toThrow(
        "Tried to look at a tile with a null name."
      );
    });

    it("Returns '' for tile with null description but not null name", () => {
      worldCtrl.target.map.set({ x: 1, y: 1 }, { name: "foo" });

      const desc = worldCtrl.look({ x: 1, y: 1 })[0].desc;

      expect(desc).toBe("");
    });

    it.skip("returns name and description for tile and agent at pos", () => {});
  });
});
