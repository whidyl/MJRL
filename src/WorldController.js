import { offsettedPos } from "./utilities";

export default class WorldController {
  constructor(world) {
    if (!world) {
      throw new Error(
        "WorldController needs to be constructed with a World object"
      );
    }
    this.target = world;
  }

  findAgentFromId(id) {
    for (const agent of this.target.agents) {
      if (agent.id === id) {
        return agent;
      }
    }

    throw new Error(`could not find agent with id '${id}'`);
  }

  findAgentFromPos(pos) {
    for (const agent of this.target.agents) {
      if (agent.pos.x === pos.x && agent.pos.y === pos.y) {
        return agent;
      }
    }
  }

  findAgent(info) {
    if (info.id) return this.findAgentFromId(info.id);
    if (info.pos) return this.findAgentFromPos(info.pos);
  }

  moveAgentTo(agent, dpos) {
    const newPos = offsettedPos(agent.pos, dpos);
    if (
      !this.tgtMap.posOutOfBounds(newPos) &&
      this.tgtMap.get(newPos).isWalkable
    ) {
      agent.pos = newPos;
    }
  }

  get tgtMap() {
    //this function exists for shorthand.
    return this.target.map;
  }

  look(pos) {
    const tile = this.tgtMap.get(pos);
    if (tile.name === null) {
      throw new Error("Tried to look at a tile with a null name.");
    }
    let ret = [
      {
        name: tile.name,
        desc: tile.desc || "",
        imgPath: `./Images/Tiles/${tile.name}/${tile.name.toLowerCase()}1.jpg`
      }
    ];

    try {
      let agent = this.findAgentFromPos(pos);
      ret.push(agent);
    } catch {}

    return ret;
  }
}
