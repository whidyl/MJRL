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

    throw new Error("could not find agent with id 'playa'");
  }

  findAgent(info) {
    if (info.id) return this.findAgentFromId(info.id);
  }

  moveAgentTo(agent, dpos) {
    const newPos = { x: agent.pos.x + dpos.dx, y: agent.pos.y + dpos.dy };
    if (!this.target.map.posOutOfBounds(newPos)) {
      agent.pos = newPos;
    }
  }
}
