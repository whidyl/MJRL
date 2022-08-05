import World from "./World";
import Map from "./Map";
import Dims from "./ParamClasses/Dims";
import Pos from "./ParamClasses/Pos";
import Agent from "./Agent";

describe("World", () => {
  it("can't construct without map", () => {
    expect(() => {
      new World();
    }).toThrow("A World needs at least a Map in its args to construct.");
  });

  it("can modify and access its map after constructing", () => {
    let world = new World(new Map(new Dims(10, 10)));

    world.map.setChar(new Pos(5, 5), "@");

    expect(world.map.getChar(new Pos(5, 5))).toBe("@");
  });

  it("fails to construct with agent out of map", () => {
    let agent = new Agent({ x: 15, y: 15 });
    let map = new Map({ w: 11, h: 11 });

    expect(() => {
      new World(map, [agent]);
    }).toThrow("Can't construct World with out of bounds agent.");
  });
});
