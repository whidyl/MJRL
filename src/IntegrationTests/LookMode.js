// 1. A map that is populated with various different type of terrain, and a few characters.
// 2. A side panel that changes based on what is being "looked at".
// 3. The user can enter a look mode to navigate using a cursor and view properties of the world.
// 4. The side panel can be cycled if the cursor is on more than one thing.
// 5. When not looking, the panel provides general information, for now, just empty.

import { Display } from "rot-js";
import Arena from "rot-js/lib/map/arena";
import Agent from "../Agent";
import Map from "../Map";
import { copy } from "../utilities";
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

export default class LookModeTest {
  makeWorld() {
    const map = new Map({ w: 50, h: 30 });
    for (const [tile] of map) {
      tile.name = "Grass";
      tile.desc =
        "A patch of grass, about knee-high. It's a little overgrown, but still soft and green.";
    }

    const arenaGen = new Arena(15, 15);
    const STONE_WALL = {
      char: "#",
      name: "Stone Wall",
      desc:
        "A rough stone wall, about waist-high. It's covered in moss and lichen, and looks like it hasn't been maintained in a long time.",
      isWalkable: false
    };
    const WOOD_FLOOR = {
      char: ".",
      name: "Wood Floor",
      desc:
        "The wood floor is old and worn, with scratches and gouges all over it. It's still sturdy, but it's definitely seen better days.",
      isWalkable: true
    };
    arenaGen.create((x, y, isWall) => {
      map.set({ x: x + 10, y: y + 10 }, isWall ? STONE_WALL : WOOD_FLOOR);
    });
    map.set({ x: 16, y: 10 }, WOOD_FLOOR);
    map.set({ x: 17, y: 10 }, WOOD_FLOOR);
    map.set({ x: 18, y: 10 }, WOOD_FLOOR);

    this.player = new Agent(
      { x: 25, y: 25 },
      {
        char: "@",
        id: "player",
        name: "John Doe",
        desc:
          "John Doe is a human male who is in his early thirties. He is of average height and build. He has brown hair and eyes. He is wearing a pair of jeans and a t-shirt. He has a leather jacket on. He has a sword at his side."
      }
    );
    const wizard = new Agent(
      { x: 20, y: 5 },
      {
        char: "^",
        name: "Wise Wizard",
        desc:
          "The wise wizard is an old man with a long beard. He's wearing a pointy hat and a long cloak, and he has a staff in one hand. He looks like he knows what he's doing."
      }
    );
    this.world = new World(map, [this.player, wizard]);
    this.worldCtrl = new WorldController(this.world);
  }

  constructor() {
    this.makeWorld();
    this.display = new Display({ width: 50, height: 30 });
    document.body.appendChild(this.display.getContainer());
    this.lookMode = false;
    this.lookCursorPos = { x: 5, y: 5 };
    this.makeLookPanel();

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        if (this.lookMode) {
          this.lookCursorPos.y += 1;
        } else {
          this.worldCtrl.moveAgentTo(this.player, { dx: 0, dy: 1 });
        }
      } else if (e.key === "ArrowUp") {
        if (this.lookMode) {
          this.lookCursorPos.y -= 1;
        } else {
          this.worldCtrl.moveAgentTo(this.player, { dx: 0, dy: -1 });
        }
      } else if (e.key === "ArrowRight") {
        if (this.lookMode) {
          this.lookCursorPos.x += 1;
        } else {
          this.worldCtrl.moveAgentTo(this.player, { dx: 1, dy: 0 });
        }
      } else if (e.key === "ArrowLeft") {
        if (this.lookMode) {
          this.lookCursorPos.x -= 1;
        } else {
          this.worldCtrl.moveAgentTo(this.player, { dx: -1, dy: 0 });
        }
      } else if (e.key === "l") {
        this.lookCursorPos = copy(this.player.pos);
        this.lookMode = !this.lookMode;
        this.lookDescElement.innerHTML = "";
        this.lookNameElement.innerHTML = "";
        this.lookImgElement.setAttribute("src", "");
      }
      this.draw();
    });

    this.draw();
  }

  makeLookPanel() {
    this.lookNameElement = document.createElement("h3");
    this.lookNameElement.innerHTML = "hello world";
    document.body.append(this.lookNameElement);

    this.lookDescElement = document.createElement("div");
    this.lookDescElement.innerHTML = "hello world";
    document.body.append(this.lookDescElement);

    this.lookImgElement = document.createElement("img");
    this.lookImgElement.setAttribute("style", "max-width: 200px");
    this.lookImgElement.innerHTML = "hello world";
    document.body.append(this.lookImgElement);
  }

  draw() {
    drawMap(this.display, this.world.map);
    drawAgents(this.display, this.world.agents);
    if (this.lookMode) {
      const seen = this.worldCtrl.look(this.lookCursorPos)[0];

      this.lookNameElement.innerHTML = seen.name;
      this.lookDescElement.innerHTML = seen.desc;
      this.lookImgElement.setAttribute("src", seen.imgPath);

      this.display.drawOver(
        this.lookCursorPos.x,
        this.lookCursorPos.y,
        null,
        null,
        "#0f0"
      );
    }
  }
}
