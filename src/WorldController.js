import { offsettedPos, posEqual } from "./utilities";

export default class WorldController {
  constructor(world) {
    if (!world) {
      throw new Error(
        "WorldController needs to be constructed with a World object"
      );
    }
    this.target = world;
  }

  findAgentFromCondition(condition, errorMsg) {
    for (const agent of this.target.agents) {
      if (condition(agent)) {
        return agent;
      }
    }

    throw new Error(errorMsg);
  }

  findAgentFromId(id) {
    return this.findAgentFromCondition(
      (agent) => agent.id === id,
      `could not find agent with id '${id}'`
    );
  }

  findAgentFromPos(pos) {
    return this.findAgentFromCondition(
      (agent) => posEqual(pos, agent.pos),
      `could not find agent with pos (${pos.x}, ${pos.y})`
    );
  }

  findAgent(info) {
    if (info.id) return this.findAgentFromId(info.id);
    if (info.pos) return this.findAgentFromPos(info.pos);
  }

  agentExistsWithPos(pos) {
    for (const agent of this.target.agents) {
      if (posEqual(pos, agent.pos)) {
        return true;
      }
    }

    return false;
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
    let seen = [];

    if (this.agentExistsWithPos(pos)) {
      const agent = this.findAgentFromPos(pos);
      seen.push(agent.look());
    }

    const tile = this.tgtMap.get(pos);
    seen.push(tile.look());

    return seen;
  }
}
