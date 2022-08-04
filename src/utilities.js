export function offsettedPos(pos, dpos) {
  return {
    x: pos.x + dpos.dx,
    y: pos.y + dpos.dy
  };
}
