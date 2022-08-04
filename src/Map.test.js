import Map from "./Map.js";
import Dims from "./ParamClasses/Dims.js";
import Pos from "./ParamClasses/Pos.js";

test("nothing", () => {});

describe("map", () => {
  it("can't be constructed without dims", () => {
    expect(() => {
      new Map();
    }).toThrow("A new map must be provided with a dims object.");
  });

  it("has expected data when char added center", () => {
    let map = new Map(new Dims(10, 10));

    map.setChar(new Pos(5, 5), "@");

    expect(map.getChar(new Pos(5, 5))).toBe("@");
    expect(map.getChar(new Pos(4, 5))).toBe("");
  });

  it("has expected data when char added top right", () => {
    let map = new Map(new Dims(10, 10));

    map.setChar(new Pos(9, 9), "@");

    expect(map.getChar(new Pos(9, 9))).toBe("@");
  });

  it("has empty string in center when no char added", () => {
    let map = new Map(new Dims(10, 10));

    expect(map.getChar(new Pos(5, 5))).toBe("");
  });

  it("throws informative error when set out of bounds bottom right", () => {
    let map = new Map(new Dims(10, 10));

    expect(() => {
      map.setChar(new Pos(10, 10), "@");
    }).toThrow(
      `Position outside of map bounds. Pos at (10, 10) but dims were (10, 10)`
    );
  });

  it("throws informative error when set out of bounds top left", () => {
    let map = new Map(new Dims(5, 5));

    expect(() => {
      map.setChar(new Pos(-1, -1), "@");
    }).toThrow(
      `Position outside of map bounds. Pos at (-1, -1) but dims were (5, 5)`
    );
  });

  it("throws informative error when getting char out of bounds top right", () => {
    let map = new Map(new Dims(5, 5));

    expect(() => {
      map.getChar(new Pos(6, 6));
    }).toThrow(
      `Position outside of map bounds. Pos at (6, 6) but dims were (5, 5)`
    );
  });

  it("gets expected values after construct", () => {
    let map = new Map({ w: 5, h: 5 });

    expect(map.get({ x: 3, y: 3 }).char).toBe("");
  });

  it("gets expected values after construct set", () => {
    let map = new Map({ w: 5, h: 5 });

    map.set({ x: 3, y: 3 }, { char: "#" });
    map.set({ x: 4, y: 4 }, { char: "@" });

    expect(map.get({ x: 3, y: 3 }).char).toBe("#");
    expect(map.get({ x: 2, y: 3 }).char).toBe("");
    expect(map.get({ x: 4, y: 3 }).char).toBe("");
    expect(map.get({ x: 4, y: 4 }).char).toBe("@");
  });

  it("throws descriptive error when set out of bounds", () => {
    let map = new Map({ w: 5, h: 5 });

    expect(() => {
      map.set({ x: -1, y: -1 }, { char: "@" });
    }).toThrow(
      `Position outside of map bounds. Pos at (-1, -1) but dims were (5, 5)`
    );
  });

  it("throws descriptive error when get out of bounds", () => {
    let map = new Map({ w: 5, h: 5 });

    expect(() => {
      map.get({ x: 6, y: 5 }, { char: "@" });
    }).toThrow(
      `Position outside of map bounds. Pos at (6, 5) but dims were (5, 5)`
    );
  });

  it("by default makes newly set tiles with chars unwalkable", () => {
    let map = new Map({ w: 5, h: 5 });

    map.set({ x: 3, y: 3 }, { char: "@" });

    expect(map.get({ x: 3, y: 3 }).isWalkable).toBe(false);
  });
});
