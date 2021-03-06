// ignore these in the wearable listings thing
// only add these in the potion section

/*

  erc1155 covers:
  - wearables
  - consumables
  - raffle tickets

*/

import {
  ethers
} from "ethers";
import {
  aavegotchi_diamond
} from "./diamond";
import {
  all_items,
  calc_rsm
} from "./gotchi";

// when we listen for new listings it returns a mix
// easier to track potions
export function potion_types() {
  return [126, 127, 128, 129]
};

// shares a name with the other erc method for reusability
export async function get_listings(type, status, count) {
  return await get_erc1155_listings(type, status, count);
}

export async function get_erc1155_listings(
  type, // 0 is wearable, 1 is badge, 2 is consumable, 3 is tickets
  status, // "listed" or "purchased"
  count, // number of listings to try and fetch
) {
  let diamond = await aavegotchi_diamond();
  return await diamond.getERC1155Listings(
    type, status, count
  );
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
  console.log("parse_listing ", e);
  let listing_info = e
  let price = ethers.utils.formatEther(listing_info.priceInWei);
  let listing_id = ethers.BigNumber.from(e.listingId).toNumber();

  // quantity listed, but not quanity in circulation
  let qty = ethers.BigNumber.from(e.quantity).toNumber();
  let type = ethers.BigNumber.from(listing_info.erc1155TypeId).toNumber();
  let item_info = (await all_items())[type];
  // let circulating = (await all_items())[type].maxQuantity;
  let rarity = {
    1: "Common",
    2: "Uncommon",
    5: "Rare",
    10: "Legendary",
    20: "Mythical",
    50: "Godlike"
  } [calc_rsm(item_info.maxQuantity)];
  // switch rarity:
  //   case 1 =>

  // let listing_id = ethers.BigNumber.from(e).toNumber();
  let listing_dict = {
    // maybe discern from ERC1155 and ERC721
    name: item_info.name, // something to lookup id -> regular name?
    href: listing_id,
    type: type,
    quantity: qty,
    price: price,
    rarity: rarity
  }
  return listing_dict;
  // return await get_erc1155_listings(0, status, count);
}

export async function get_wearables(
  status,
  count
) {
  console.log("trying to fetch wearables");
  return await get_erc1155_listings(0, status, count);
}

export async function get_badges(
  status,
  count
) {
  console.log("trying to fetch tickets");
  return await get_erc1155_listings(1, status, count);
}

export async function get_consumables(
  status,
  count
) {
  console.log("trying to fetch consumables");
  return await get_erc1155_listings(2, status, count);
}

export async function get_tickets(
  status,
  count
) {
  console.log("trying to fetch tickets");
  return await get_erc1155_listings(3, status, count);
}

export async function export_new_listings(type, callback) {
  // type is the type of listing requested initialy
  // 0 - 3, can represent erc721 or erc1155 indexes
  // in erc1155 we use to filter between wearables, badges, consumables, tickets
  // ERC1155ListingAdd
  let diamond = await aavegotchi_diamond();
  diamond.on("ERC1155ListingAdd", async (e) => {

    let listing_id = ethers.BigNumber.from(e).toNumber();
    console.log("ERC1155ListingAdd should export for type ? ", type, listing_id);
    let listing_info = await diamond.getERC1155Listing(e);
    let category = ethers.BigNumber.from(listing_info.category).toNumber();
    // let parsed = await parse_listing(listing_info);
    console.log("new listing parsed!", listing_info);

    if (type != category) {
      console.log("category of item did not match type", type, category, listing_info)
      return;
    }

    let parsed = await parse_listing(listing_info);
    console.log("new listing parsed!", parsed);

    if (type != 3 && parsed.type == 0) {
      // void item, actually a raffle ticket
      console.log("Not looking for raffle tickets, this is likely a common ticket", parsed, listing_info);
    }
    else if (type == 2 && !potion_types().includes(parsed.type)) {
      // check that its only between 125-129
      console.log("should only show consumables", e);
      // break;
    }
    else if (type == 0 && potion_types().includes(parsed.type)) {
      // wearables, so exclude tickets and consumables
      console.log("should only show wearables, this looks like a potion");
      // break;
    } else parse_new_listing(parsed,callback)

  });
}

async function parse_new_listing(parsed,cb) {
  // // ERC1155ListingAdd
  // let listing_id = ethers.BigNumber.from(e).toNumber();
  // // console.log("new listing received", listing_id);
  // console.log("parse new listing id:", e, listing_id);
  // let diamond = await aavegotchi_diamond();
  // let listing_info = await diamond.getERC1155Listing(listing_id);
  // let parsed = await parse_listing(listing_info);
  console.log("new listing parsed!", parsed);
  cb(parsed);
}
