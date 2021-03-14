import aavegotchi_diamond from "./diamond";

export async function get_erc721_listings(
  type,  // 0 == portal, 1 == vrf pending, 1 == open portal, 2 == Aavegotchi.
  status, // "listed" or "purchased"
  count
) {
  let diamond = await aavegotchi_diamond();
  return await diamond.getERC721Listings(
    type, status, count
  )
}
