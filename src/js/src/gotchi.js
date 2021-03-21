// from aavegotchi-contracts/*/itemTypes.js
// not exported normally
export function calc_rsm (maxQuantity) {
  if (maxQuantity >= 1000) return 1
  if (maxQuantity >= 500) return 2
  if (maxQuantity >= 250) return 5
  if (maxQuantity >= 100) return 10
  if (maxQuantity >= 10) return 20
  if (maxQuantity >= 1) return 50
  return 0
};

const itemTypes = import("../aavegotchi/itemTypes");
// const itemTypes;
export async function all_items() {
  return (await itemTypes).itemTypes;
}
