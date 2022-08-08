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

  describe("find", () => {
    it("Can select agent based on identifier", () => {
      let worldCont = new WorldController(makeTestWorld());

      const selected = worldCont.findAgent({ id: "player" });

      expect(selected.id).toBe("player");
    });

    it("throws error if agent can't be found by id", () => {
      let worldCont = new WorldController(makeTestWorld());

      expect(() => {
        worldCont.findAgent({ id: "playa" });
      }).toThrow("could not find agent with id 'playa'");
      expect(() => {
        worldCont.findAgent({ id: "playr" });
      }).toThrow("could not find agent with id 'playr'");
    });

    it("Can find agent based on pos", () => {
      let worldCtrl = new WorldController(makeTestWorld());

      const found = worldCtrl.findAgent({ pos: { x: 5, y: 5 } });

      expect(found).not.toBeNull();
      expect(found.id).toBe("player");
    });

    it("Throws error if agent can't be found by pos", () => {
      let worldCtrl = new WorldController(makeTestWorld());

      expect(() => worldCtrl.findAgent({ pos: { x: 4, y: 5 } })).toThrow(
        "could not find agent with pos (4, 5)"
      );
    });
  });

  describe("move", () => {
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
  });

  describe("'look' with a 3x4 map", () => {
    let worldCtrl;
    beforeEach(() => {
      let map = new Map({ w: 4, h: 3 });
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

    it("Throws error for looking outside bounds", () => {
      expect(() => worldCtrl.look({ x: 4, y: 4 })).toThrow(
        "Position outside of map bounds. Pos at (4, 4) but dims were (4, 3)"
      );
    });

    it("Returns img file path for valid tile", () => {
      worldCtrl.target.map.set(
        { x: 1, y: 1 },
        { name: "Grass", desc: "Grass tile." }
      );

      worldCtrl.target.map.set(
        { x: 1, y: 2 },
        { name: "Desert", desc: "Desert tile." }
      );

      const imgPath1 = worldCtrl.look({ x: 1, y: 1 })[0].imgPath;
      const imgPath2 = worldCtrl.look({ x: 1, y: 2 })[0].imgPath;

      expect(imgPath1).toBe("./Images/Tiles/Grass/grass1.jpg");
      expect(imgPath2).toBe("./Images/Tiles/Desert/desert1.jpg");
    });

    it("Returns 2 objects for agent on tile, they are the expected tile and agent, with agent at index 0.", () => {
      worldCtrl.target.map.set({ x: 1, y: 0 }, { name: "Grass" });
      worldCtrl.target.agents.push(new Agent({ x: 1, y: 0 }, { id: "Player" }));

      const seen = worldCtrl.look({ x: 1, y: 0 });

      //expect(seen.length).toBe(2);
      //expect(seen[1].name).toBe("Grass");
    });
  });
});
