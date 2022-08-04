export default class World {
  constructor(map, agents = []) {
    if (!map) {
      throw new Error("A World needs at least a Map in its args to construct.");
    }

    for (const agent of agents) {
      if (map.posOutOfBounds(agent.pos)) {
        throw new Error("Can't construct World with out of bounds agent.");
      }
    }

    this.agents = agents;
    this.map = map;
  }

  moveAgent(agent, offset) {
    agent.pos.x += offset.x;
    agent.pos.y += offset.y;
  }
}
