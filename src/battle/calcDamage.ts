export default (atk: number, def: number) => {
  let damage = Math.ceil((atk * 1.1 - def * 0.4) * Math.random());
  if (damage <= 0) {
    damage = 1;
  }
  return damage;
};
