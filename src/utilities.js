export function offsettedPos(pos, dpos) {
  return {
    x: pos.x + dpos.dx,
    y: pos.y + dpos.dy
  };
}

export function copy(object) {
  return JSON.parse(JSON.stringify(object));
}
