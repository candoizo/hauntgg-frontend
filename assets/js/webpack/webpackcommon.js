import {calc_rsm, all_items} from "./src/gotchi";

import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';

// const {
//   ethers
// } = require("ethers");
// (async () => {
//   let provider = await detectEthereumProvider();
//   if (provider) {
//     // From now on, this should always be true:
//     // provider === window.ethereum
//     // startApp(provider); // initialize your app
//     console.log("eth provider detected!", provider.networkVersion, provider );
//   } else {
//     console.log('Please install MetaMask!');
//   }
// })()

// prob migrate from .mm
// import { potion_types } from "./src/metamask";
// export {potion_types};


// export function get_provider() {
//   return new ethers.providers.Web3Provider(window.ethereum)
// }

// ignore these in the wearable listings thing
// only add these in the potion section
import { potion_types } from "./src/erc1155";
export {potion_types};
// export function potion_types() {
//   return [126,127,128,129]
// }

// export function get_network() {
//   return new ethers.providers.JsonRpcProvider({
//     url: "https"
//   });
// }

// export function get_block(e) {
//   return get_provider().getBlock(e || null)
// }

//// testing things

// const daiAddress = "dai.tokens.ethers.eth";
//
// // The ERC-20 Contract ABI, which is a common contract interface
// // for tokens (this is the Human-Readable ABI format)
// const daiAbi = [
//   // Some details about the token
//   "function name() view returns (string)",
//   "function symbol() view returns (string)",
//
//   // Get the account balance
//   "function balanceOf(address) view returns (uint)",
//
//   // Send some of your tokens to someone else
//   "function transfer(address to, uint amount)",
//
//   // An event triggered whenever anyone transfers to someone else
//   "event Transfer(address indexed from, address indexed to, uint amount)"
// ];
// // The Contract object
// const daiContract = new ethers.Contract(daiAddress, daiAbi, get_provider());
//
// export function dai_contract() {
//   return daiContract
// }
//
//
// export async function listen_for_block() {
//   let prov = await get_provider();
//
//   prov.on("block", (e) => {
//     console.log("new block: ", e);
//   });
//
// }

// const aavegotchi_ERC1155MarketplaceFact_string = "0xC057c4f2b12e3E0F35e03a4851063FB39A1850cD";
// const aavegotchi_contact = new ethers.Contract(aavegotchi_ERC1155MarketplaceFact, daiAbi, get_provider());
// export async function aavegotchi_ERC1155MarketplaceFact() {
//
//   const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
//   console.log("getting contract");
//   // const diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', diamondAddress)
//   let diamond = await new ethers.Contract(aavegotchi_ERC1155MarketplaceFact_string, daiAbi, get_provider())
//
//   console.log("got", diamond)
//   return diamond
//   // const tx = await diamond.cancelERC1155Listings(listingIds);
//   // return daiContract
// }

// export async function dumb_test() {
//   let diamondCreationBlock = 11516320
//   const aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
//   // let diamond
//   // diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)
//   let diamond = await new ethers.Contract(aavegotchiDiamondAddress, require("./aavegotchi/diamond"), get_provider())
//   let result = await diamond.getAavegotchi(7401);
//   // let other = await diamond
//   let value = await diamond.aavegotchiNameAvailable('CASPER THE FRIENDLY GHOST')
//   console.log("name avail:", value)
//   console.log(result)
//
//
//   let result1 = await diamond.getERC1155Listing(1273)
//   console.log(result1)
//   console.log(result1.erc1155TypeId.toString())
//
//   // let result2 = await diamond.balanceOf('0xa9bA6A24C6aeA0612d044c8Bd6727F694c84D3Ab', 65)
//   // console.log(result2.toString())
//
//
//   let min = 35000;
//   let max = 36000;
//   for (let i = min; i < max; i++) {
//     if (i % 500 === 0) {
//       console.log('counter 500 tries', i)
//     }
//
//     try {
//       const r3 = await diamond.getAavegotchiListing(i)
//       console.log("gotchi listing:", i, r3);
//       if (r3.listing_.cancelled === true || !r3.listing_.timePurchased.eq(0)) {
//         continue
//       } else {
//         if (r3.listing_.seller !== r3.aavegotchiInfo_.owner) {
//           console.log('Listing ID:', r3.listing_.listingId.toString(), ' | TokenId:', r3.listing_.erc721TokenId.toString())
//           console.log('Listing ID:', r3.listing_.listingId.toString(), ' | TokenId:', r3.listing_.erc1155TokenId.toString())
//         }
//       }
//     } catch (e) {
//       console.log("Error after ", i, "\nno more listing?", e);
//       break
//     }
//
//   }
//
//
// }

// const remaning_closed = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
// export async function market_test() {
//
//   let diamondCreationBlock = 11516320;
//   let diamond = await aavegotchi_diamond();
//   // const erc1155Marketplace = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
//   // const itemsFacet = await ethers.getContractAt('contracts/Aavegotchi/facets/ItemsFacet.sol:ItemsFacet', aavegotchiDiamondAddress)
//
//
//   // // diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
//   // let filter = diamond.filters.ERC1155ListingAdd()
//   // let results = await diamond.queryFilter(filter, diamondCreationBlock)
//   // let count = 0;
//   // for (const result of results) {
//   //   count++
//   //   console.log('diamond.filters.ERC1155ListingAdd()', result);
//   //   if (result.args.erc1155TypeId.eq(65)) {
//   //     console.log(result.args)
//   //   }
//   // }
//   // console.log(count)
//
//   // diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
//   // on page load
//
//   const result1 = await diamond.getERC1155Listing(29302)
//   console.log('diamond.filters.getERC1155Listing(29302)', result1)
//   console.log(result1.erc1155TypeId.toString())
//
//   let thousands = await diamond.getERC1155Listing(30000);
//   console.log('diamond.filters.getERC1155Listing(30000)', thousands)
//
//
//   for (let i = 0; i < 35000; i++) {
//     if (i % 100 === 0) {
//       console.log(i)
//     }
//     const result = await diamond.getERC1155Listing(i);
//     console.log(result);
//
//     if (result.sold === false && result.cancelled === false) {
//
//       if (result.quantity.eq(0)) {
//         console.log('Open listing has quantity as 0. ListingId:', result.listingId.toString())
//       } else {
//
//         const amount = await diamond.balanceOf(result.seller, result.erc1155TypeId)
//         if (result.quantity.gt(amount)) {
//           console.log('Open listing quantity greater than users balance. ListingId: ', result.listingId.toString())
//           console.log(result.quantity.toString(), ' and ', amount.toString())
//         }
//       }
//     }
//   }
// }

// export async function aavegotchi_diamond() {
//   let aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
//   // let diamond
//   // diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)
//   return await new ethers.Contract(aavegotchiDiamondAddress, require("./aavegotchi/diamond"), get_provider())
// }

import { aavegotchi_diamond } from "./src/diamond";

// // dont loop through all the potential 29000 listings
// const snapshot_base = 29000;
// export async function baazaar_1155() {
//   // for (let i = 0; i)
//   try {
//
//   } catch (e) {
//     console.log("error, so i hope no more listings for now!");
//   }
//   let diamond = await aavegotchi_diamond();
//   const result1 = await diamond.getERC1155Listing(29302)
//   console.log('diamond.filters.getERC1155Listing(29302)', result1)
//   console.log(result1.erc1155TypeId.toString())
// }

// const listings = [];
// export function current_listings() {
//   return listings;
// }

// // import moment from "moment";
// export async function listen_market_events() {
//
//   let diamond = await aavegotchi_diamond();
//
//   diamond.on("ERC1155ListingAdd", async (e) => {
//
//     let listing_id = ethers.BigNumber.from(e).toNumber();
//     let listing_info = await diamond.getERC1155Listing(listing_id);
//     let price = ethers.utils.formatEther(listing_info.priceInWei);
//     let listing_dict = {
//       name: "", // something to lookup id -> regular name?
//       href: "https://aavegotchi.com/baazaar/erc1155/" + listing_id,
//       type: ethers.BigNumber.from(listing_info.erc1155TypeId).toNumber(),
//       quantity: ethers.BigNumber.from(listing_info.quantity).toNumber(),
//       price: price
//     }
//     console.log(
//       // moment().format('MMMM Do YYYY, h:mm:ss a'),
//       ". new listing: ",
//       listing_dict,
//       listing_info
//     );
//     current_listings().push(listing_dict);
//
//   });
//
//   // sold listing
//   diamond.on("ERC1155ExecutedListing", async (e) => {
//     console.log("sold listing", e);
//   });
//
//   // // cancelled listing
//   // diamond.on("ERC1155ListingCancelled", async (e) => {
//   //   console.log("cancelled listing", e);
//   // });
//
//   // 0 is wearable, 1 is badge, 2 is consumable, 3 is tickets
//   // let r = await diamond.getERC1155Listings(0 , "listed", 250);
//   // // console.log(r);
//   // for (let i in r) {
//   //   let listing = r[i];
//   //   console.log(r[i]);
//   // }
//
//
//   let wearables = await get_erc1155_listings(0, "listed", 200);
//   let consumables = await get_erc1155_listings(1, "listed", 100);
//   let tickets = await get_erc1155_listings(2, "listed", 100);
//
//   console.log(wearables, consumables, tickets);
//
// }

import * as erc721 from "./src/erc721";
export { erc721 };

import * as erc1155 from "./src/erc1155";
export { erc1155 };

// export async function get_erc1155_listings(
//   type, // 0 is wearable, 1 is badge, 2 is consumable, 3 is tickets
//   status, // "listed" or "purchased"
//   count, // number of listings to try and fetch
// ) {
//   let diamond = await aavegotchi_diamond();
//   return await diamond.getERC1155Listings(
//     type, status, count
//   )
// }

// export async function get_erc721_listings(
//   type,  // 0 == portal, 1 == vrf pending, 1 == open portal, 2 == Aavegotchi.
//   status, // "listed" or "purchased"
//   count
// ) {
//   let diamond = await aavegotchi_diamond();
//   return await diamond.getERC721Listings(
//     type, status, count
//   )
// }

// from aavegotchi-contracts/*/itemTypes.js
// not exported normally
// export function calc_rsm (maxQuantity) {
//   if (maxQuantity >= 1000) return 1
//   if (maxQuantity >= 500) return 2
//   if (maxQuantity >= 250) return 5
//   if (maxQuantity >= 100) return 10
//   if (maxQuantity >= 10) return 20
//   if (maxQuantity >= 1) return 50
//   return 0
// }


// export async function parse_listing_array(
//   array
// ) {
//   let res = array.map(async x => await erc1155.parse_listing(x));
//   return res;
// }

// export async function parse_listing(
//   e
// ) {
//
//   console.log("parse_listing ", e);
//   let listing_info = e
//   let price = ethers.utils.formatEther(listing_info.priceInWei);
//   let listing_id = ethers.BigNumber.from(e.listingId).toNumber();
//
//   // quantity listed, but not quanity in circulation
//   let qty = ethers.BigNumber.from(e.quantity).toNumber();
//
//   let type = ethers.BigNumber.from(listing_info.erc1155TypeId).toNumber();
//
//   let item_info = (await all_items())[type];
//   let circulating = (await all_items())[type].maxQuantity;
//   let rarity = {
//     1: "Common",
//     2: "Uncommon",
//     5: "Rare",
//     10: "Legendary",
//     20: "Mythical",
//     50: "Godlike"
//   }[calc_rsm(circulating)];
//   // switch rarity:
//   //   case 1 =>
//
//   // let listing_id = ethers.BigNumber.from(e).toNumber();
//   let listing_dict = {
//     // maybe discern from ERC1155 and ERC721
//     name: item_info.name, // something to lookup id -> regular name?
//     href: listing_id,
//     type: type,
//     quantity: qty,
//     price: price,
//     rarity: rarity
//   }
//   // console.log(
//   //   // moment().format('MMMM Do YYYY, h:mm:ss a'),
//   //   ". new listing: ",
//   //   listing_dict,
//   //   listing_info
//   // );
//   // current_listings().push(listing_dict);
//
//   return listing_dict;
//   // return await get_erc1155_listings(0, status, count);
// }

// export async function get_portals(
//   status,
//   count
// ) {
//   console.log("trying to fetch portals");
//   return await get_erc721_listings(0, status, count);
// }

// export async function get_wearables(
//   status,
//   count
// ) {
//   console.log("trying to fetch wearables");
//   return await get_erc1155_listings(0, status, count);
// }
//
// export async function get_badges(
//   status,
//   count
// ) {
//   console.log("trying to fetch tickets");
//   return await get_erc1155_listings(1, status, count);
// }
//
// export async function get_consumables(
//   status,
//   count
// ) {
//   console.log("trying to fetch consumables");
//   return await get_erc1155_listings(2, status, count);
// }
//
// export async function get_tickets(
//   status,
//   count
// ) {
//   console.log("trying to fetch tickets");
//   return await get_erc1155_listings(3, status, count);
// }

// let listing_1155_callback;
//
// // pass a funtion to get the arg pased to it, add to UI when called
// export async function export_new_listings(callback) {
//   // ERC1155ListingAdd
//   let diamond = await aavegotchi_diamond();
//   listing_1155_callback = callback;
//   diamond.on("ERC1155ListingAdd", parse_new_listing);
// }

// let listing_721_callback;
//
// export async function export_new_721_listings(callback) {
//   // ERC1155ListingAdd
//   let diamond = await aavegotchi_diamond();
//   listing_721_callback = callback;
//   diamond.on("ERC721ListingAdd", parse_new_listing);
// }
//
//
// // pass a funtion to get the arg pased to it, add to UI when called
// export async function parse_new_listing(e) {
//   // ERC1155ListingAdd
//   // let diamond = await aavegotchi_diamond();
//   // diamond.on("ERC1155ListingAdd", e);
//   let listing_id = ethers.BigNumber.from(e).toNumber();
//   // console.log("new listing received", listing_id);
//   console.log("parse new listing id:", e, listing_id);
//   let diamond = await aavegotchi_diamond();
//   let listing_info = await diamond.getERC1155Listing(listing_id);
//   let parsed = await parse_listing(listing_info);
//   console.log("new listing parsed!", parsed);
//   new_listing_callback(parsed);
// }


// export async function on_metamask_matic_network() {
//   let provider = await detectEthereumProvider();
//   if (provider) {
//     return provider.networkVersion == 137;
//   }
//   return false;
// }


// const itemTypes = import("./aavegotchi/itemTypes");
//
// // const itemTypes;
// export async function export_items() {
//   return (await itemTypes).itemTypes;
// }

// seems to work for looking at transaciton, but returns 4000...
// window.EntryPoint.common.get_provider().getTransactionCount("0x86935F11C86623deC8a25696E1C19a8659CbF95d")
