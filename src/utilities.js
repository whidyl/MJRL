export function offsettedPos(pos, dpos) {
  return {
    x: pos.x + dpos.dx,
    y: pos.y + dpos.dy
  };
}

export function posEqual(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function copy(object) {
  return JSON.parse(JSON.stringify(object));
}
