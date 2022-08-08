import { Display } from "rot-js";
import Arena from "rot-js/lib/map/arena";
import Agent from "../Agent";
import Map from "../Map";
import World from "../World";
import WorldController from "../WorldController";

function drawMap(display, map) {
  for (const [tile, pos] of map) {
    display.draw(pos.x, pos.y, tile.char);
  }
}

function drawAgents(display, agents) {
  for (const agent of agents) {
    display.draw(agent.pos.x, agent.pos.y, agent.char);
  }
}

export default class SimpleWalkingInputAndRenderingTest {
  constructor() {
    const map = new Map({ w: 100, h: 50 });
    const player = new Agent({ x: 25, y: 25 }, { char: "@", id: "player" });
    this.world = new World(map, [player]);
    this.worldCtrl = new WorldController(this.world);
    this.display = new Display({ width: 100, height: 50 });

    //generate arena with part of wall removed
    const arenaGen = new Arena(15, 15);
    arenaGen.create((x, y, isWall) => {
      const wall = { char: "#", isWalkable: false };
      const floor = { char: ".", isWalkable: true };
      map.set({ x: x + 10, y: y + 10 }, isWall ? wall : floor);
    });
    map.set({ x: 16, y: 10 }, { char: ".", isWalkable: true });
    map.set({ x: 17, y: 10 }, { char: ".", isWalkable: true });
    map.set({ x: 18, y: 10 }, { char: ".", isWalkable: true });

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown")
        this.worldCtrl.moveAgentTo(player, { dx: 0, dy: 1 });
      else if (e.key === "ArrowUp")
        this.worldCtrl.moveAgentTo(player, { dx: 0, dy: -1 });
      else if (e.key === "ArrowRight")
        this.worldCtrl.moveAgentTo(player, { dx: 1, dy: 0 });
      else if (e.key === "ArrowLeft")
        this.worldCtrl.moveAgentTo(player, { dx: -1, dy: 0 });
      this.draw();
    });
  }

  draw() {
    drawMap(this.display, this.world.map);
    drawAgents(this.display, this.world.agents);
  }
}
