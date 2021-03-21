import {
  ethers
} from "ethers";
import {
  aavegotchi_diamond
} from "./diamond";


// shares a name with the other erc method for reusability
export async function get_listings(type, status, count) {
  return await get_erc721_listings(type, status, count);
}

export async function get_erc721_listings(
  type, // 0 == portal, 1 == vrf pending, 1 == open portal, 2 == Aavegotchi.
  status, // "listed" or "purchased"
  count
) {
  console.log("get_erc721_listings", type, status, count);
  let diamond = await aavegotchi_diamond();
  if (type == 3) {
    // get the aavegotchi specific call to avoid extra call
    return await diamond.getAavegotchiListings(
      type, status, count
    );
  }
  else
  return await diamond.getERC721Listings(
    type, status, count
  )
}

export async function parse_listing_array(
  array
) {

  // if (array.length >= 100) {
  //
  //   function resolve_new(id) {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(async () => {
  //         let info = await parse_listing(id);
  //         console.log('trying to resolve promise', info);
  //         resolve(info);
  //       }, 2000);
  //     });
  //   }
  //
  //   // sequentially resolves promises rather than queuing all simoutaniously
  //   // array.reduce((prom, next_id) => prom.then(resolve_new(next_id)), Promise.resolve());
  //   // console.log("parse big listing map", array);
  //   // for (let v in array) {
  //   //   await array[v]
  //   // }
  //   // array.map()
  //   // array.reduce((item_before, item_after) => item_before.then(resolve_new(item_after)));
  //   // console.log("parse listing array length over 100", array);
  //
  //   let res = array.map(async x => await resolve_new(x));
  //   console.log('fatparse res', res);
  //   return res
  //   // return array;
  //
  //
  //   // }).
  //
  //   // let arr = array;
  //   // let chunked = require('../utils').chunk_iter(arr,arr.length/5);
  //   // console.log("chunked version:", chunked);
  //   //
  //   // chunked.map(arr => arr.map(async x => await parse_listing(x)));
  //
  //
  //   // return arr;
  //
  // }



  let res = array.map(async x => await parse_listing(x));
  return res;
}

export async function parse_listing(
  e
) {
  console.log("parse_listing of ERC721! ", e);


  let listing_info = e.listing_;
  if (!listing_info) // probably a normal thing
  listing_info = e;


  // if (!e.listing_ || !e.aavegotchiInfo_){
  //   console.log("no proper info on e", e);
  //   return {};
  // }

  let price = ethers.utils.formatEther(listing_info.priceInWei);
  let listing_id = ethers.BigNumber.from(listing_info.listingId).toNumber();
  //
  // // quantity listed, but not quanity in circulation
  // let qty = ethers.BigNumber.from(e.quantity).toNumber();
  //
  let num = ethers.BigNumber.from(listing_info.erc721TokenId).toNumber();
  let category = ethers.BigNumber.from(listing_info.category).toNumber();
  console.log(`price: ${price}, listing: ${listing_id}, num: ${num}, category: ${category} which is closed, pending, opened, or gotchi`);

  let extra_info = {};
  if (category == 3 && e.aavegotchiInfo_) {
    console.log("aavegotchi should have info already", e);
    // load additional gotchi info
    // let diamond = await aavegotchi_diamond();
    // let info = await diamond.getAavegotchi(listing_info.erc721TokenId);
    let info = e.aavegotchiInfo_;
    let mrs = ethers.BigNumber.from(info.modifiedRarityScore).toNumber();
    if (!mrs)
    console.log("no mrs, hmm", e);
    let rarity = "Common";
    if (mrs >= 580) rarity = "Godlike";
    else if (mrs >= 525) rarity = "Mythical";
    else if (mrs >= 450) rarity = "Rare";

    extra_info = {
      brs: ethers.BigNumber.from(info.baseRarityScore).toNumber(),
      mrs: mrs,
      name: info.name,
      number: ethers.BigNumber.from(info.tokenId).toNumber(),
      haunt: ethers.BigNumber.from(info.hauntId).toNumber(),
      rarity: rarity, // not a real rarity but for bg css class
    };
  }


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
    ...extra_info
  };
}

export async function get_svg(
  token_id
) {
  let diamond = await aavegotchi_diamond();
  return diamond.getAavegotchiSvg(token_id);
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

export async function export_new_listings(type, callback) {

  // ERC1155ListingAdd
  let diamond = await aavegotchi_diamond();
  diamond.on("ERC721ListingAdd", async (e) => {

    let listing_info = await diamond.getERC721Listing(e);
    let parsed = await parse_listing(listing_info);

    // if (parsed.type == 3) {
    //   console.log("trying to show a gotchi!", listing_info);
    //   let svg = await diamond.getAavegotchiSvg(parsed.number);
    //   console.log('gothci svg', svg);
    // }

    if (parsed.type == type)
      parse_new_listing(parsed, callback)
    else console.log("type did not match", type, parsed.type)

  });
}

async function parse_new_listing(parsed, cb) {
  // // ERC721ListingAdd
  // let listing_id = ethers.BigNumber.from(e).toNumber();
  // // console.log("new listing received", listing_id);
  // console.log("parse new listing id:", e, listing_id);
  // let diamond = await aavegotchi_diamond();
  // let listing_info = await diamond.getERC721Listing(listing_id);
  // let parsed = await parse_listing(listing_info);
  console.log("new listing parsed!", parsed);
  cb(parsed);
}

// export async function get_gotchi(e) {
//   let diamond = await aavegotchi_diamond();
//   let info = await diamond.getAavegotchi(e);
//
//   // 560 < = godlike color
//   // 520 - 559 = mythical color
//   // 450 - 520 - blue
//   // 360 - 449 = purple
//
//   let mrs = ethers.BigNumber.from(info.modifiedRarityScore).toNumber();
//   let rarity = "Common";
//   if (mrs >= 560) rarity = "Godlike";
//   else if (mrs >= 520) rarity = "Mythical";
//   else if (mrs >= 450) rarity = "Rare";
//
//   return {
//     brs: ethers.BigNumber.from(info.baseRarityScore).toNumber(),
//     mrs: mrs,
//     name: info.name,
//     number: ethers.BigNumber.from(info.tokenId).toNumber(),
//     haunt: ethers.BigNumber.from(info.hauntId).toNumber(),
//     rarity: rarity, // not a real rarity but for bg css class
//   };
// }
