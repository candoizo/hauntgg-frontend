import {
  ethers
} from "ethers";
import {
  aavegotchi_diamond
} from "./diamond";

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

export async function parse_listing_array(
  array
) {
  let res = array.map(async x => await parse_listing(x));
  return res;
}

export async function parse_listing(
  e
) {
  console.log("parse_listing of ERC721! ", e);
  let listing_info = e

  let price = ethers.utils.formatEther(listing_info.priceInWei);
  let listing_id = ethers.BigNumber.from(e.listingId).toNumber();
  //
  // // quantity listed, but not quanity in circulation
  // let qty = ethers.BigNumber.from(e.quantity).toNumber();
  //
  let num = ethers.BigNumber.from(listing_info.erc721TokenId).toNumber();
  let category = ethers.BigNumber.from(listing_info.category).toNumber();
  console.log(`price: ${price}, listing: ${listing_id}, num: ${num}, category: ${category} which is closed, pending, opened, or gotchi`);
  //
  // let item_info = (await all_items())[type];
  // let circulating = (await all_items())[type].maxQuantity;
  // let rarity = {
  //   1: "Common",
  //   2: "Uncommon",
  //   5: "Rare",
  //   10: "Legendary",
  //   20: "Mythical",
  //   50: "Godlike"
  // } [calc_rsm(circulating)];
  // // switch rarity:
  // //   case 1 =>
  //
  // // let listing_id = ethers.BigNumber.from(e).toNumber();
  // let listing_dict = {
  //   // maybe discern from ERC1155 and ERC721
  //   name: item_info.name, // something to lookup id -> regular name?
  //   href: listing_id,
  //   type: type,
  //   quantity: qty,
  //   price: price,
  //   rarity: rarity
  // }
  // return listing_dict;
  // return listing_info;
  return {
    price: price,
    number: num,
    href: listing_id,
    type: category,
  };
}



export async function get_closed_portals(
  status,
  count
) {
  console.log("trying to fetch closed portals");
  return await get_erc721_listings(0, status, count);
}

export async function get_vrf_pending_portals(
  status,
  count
) {
  console.log("trying to fetch vrf pending portals");
  return await get_erc721_listings(1, status, count);
}

export async function get_opened_portals(
  status,
  count
) {
  console.log("trying to fetch opened portals");
  return await get_erc721_listings(2, status, count);
}

export async function get_aavegotchis(
  status,
  count
) {
  console.log("trying to fetch aavegotchis");
  return await get_erc721_listings(3, status, count);
}

export async function export_new_listings(callback) {
  // ERC1155ListingAdd
  let diamond = await aavegotchi_diamond();
  // listing_1155_callback = callback;
  diamond.on("ERC721ListingAdd", (e) => parse_new_listing(e,callback));
}

async function parse_new_listing(e,cb) {
  // ERC1155ListingAdd
  // let diamond = await aavegotchi_diamond();
  // diamond.on("ERC1155ListingAdd", e);
  let listing_id = ethers.BigNumber.from(e).toNumber();
  // console.log("new listing received", listing_id);
  console.log("parse new listing id:", e, listing_id);
  let diamond = await aavegotchi_diamond();
  let listing_info = await diamond.getERC721Listing(listing_id);
  let parsed = await parse_listing(listing_info);
  console.log("new listing parsed!", parsed);
  cb(parsed);
}
