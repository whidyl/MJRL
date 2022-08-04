import World from "./World";
import Map from "./Map";
import Dims from "./ParamClasses/Dims";
import Pos from "./ParamClasses/Pos";
import Agent from "./Agent";
import Offset from "./ParamClasses/Offset";

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

  it("can modify and access its agents after constructing", () => {
    let world = new World(new Map(new Dims(10, 10)), [
      new Agent(new Pos(5, 5)),
      new Agent(new Pos(1, 1))
    ]);

    world.moveAgent(world.agents[0], new Offset(0, -1));
    world.moveAgent(world.agents[1], new Offset(1, 0));

    expect(world.agents[0].pos).toStrictEqual(new Pos(5, 4));
    expect(world.agents[1].pos).toStrictEqual(new Pos(2, 1));
  });

  it("fails to construct with agent out of map", () => {
    let agent = new Agent({ x: 15, y: 15 });
    let map = new Map({ w: 11, h: 11 });

    expect(() => {
      new World(map, [agent]);
    }).toThrow("Can't construct World with out of bounds agent.");
  });
});
