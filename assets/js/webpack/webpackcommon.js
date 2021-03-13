// const Web3 = require("web3");
//
// export function eth_enabled () {
//   if (window.web3) {
//     window.web3 = new Web3(window.web3.currentProvider);
//
//     return true;
//   }
//   return false
// }

import detectEthereumProvider from '@metamask/detect-provider';
(async () => {

  const provider = await detectEthereumProvider();

  if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    // startApp(provider); // initialize your app
    console.log("eth provider detected!", provider);
  } else {
    console.log('Please install MetaMask!');
  }
})()


const {
  ethers
} = require("ethers");

export function get_provider() {
  return new ethers.providers.Web3Provider(window.ethereum)
}

// export function get_network() {
//   return new ethers.providers.JsonRpcProvider({
//     url: "https"
//   });
// }

// export function get_block(e) {
//   return get_provider().getBlock(e || null)
// }



//// testing things

const daiAddress = "dai.tokens.ethers.eth";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
// The Contract object
const daiContract = new ethers.Contract(daiAddress, daiAbi, get_provider());

export function dai_contract() {
  return daiContract
}


export async function listen_for_block() {
  let prov = await get_provider();

  prov.on("block", (e) => {
    console.log("new block: ", e);
  });

}


const aavegotchi_ERC1155MarketplaceFact_string = "0xC057c4f2b12e3E0F35e03a4851063FB39A1850cD";
const aavegotchi_contact = new ethers.Contract(aavegotchi_ERC1155MarketplaceFact, daiAbi, get_provider());

export async function aavegotchi_ERC1155MarketplaceFact() {

  const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'

  console.log("getting contract")

  // const diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', diamondAddress)
  let diamond = await new ethers.Contract(aavegotchi_ERC1155MarketplaceFact_string, daiAbi, get_provider())

  console.log("got", diamond)
  return diamond
  // const tx = await diamond.cancelERC1155Listings(listingIds);
  // return daiContract
}

export async function dumb_test() {
  let diamondCreationBlock = 11516320
  const aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  // let diamond
  // diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)
  let diamond = await new ethers.Contract(aavegotchiDiamondAddress, require("./aavegotchi/diamond"), get_provider())
  let result = await diamond.getAavegotchi(7401);
  // let other = await diamond
  let value = await diamond.aavegotchiNameAvailable('CASPER THE FRIENDLY GHOST')
  console.log("name avail:", value)
  console.log(result)


  let result1 = await diamond.getERC1155Listing(1273)
  console.log(result1)
  console.log(result1.erc1155TypeId.toString())

  // let result2 = await diamond.balanceOf('0xa9bA6A24C6aeA0612d044c8Bd6727F694c84D3Ab', 65)
  // console.log(result2.toString())


  let min = 35000;
  let max = 36000;
  for (let i = min; i < max; i++) {
    if (i % 500 === 0) {
      console.log('counter 500 tries', i)
    }

    try {
      const r3 = await diamond.getAavegotchiListing(i)
      console.log("gotchi listing:", i, r3);
      if (r3.listing_.cancelled === true || !r3.listing_.timePurchased.eq(0)) {
        continue
      } else {
        if (r3.listing_.seller !== r3.aavegotchiInfo_.owner) {
          console.log('Listing ID:', r3.listing_.listingId.toString(), ' | TokenId:', r3.listing_.erc721TokenId.toString())
          console.log('Listing ID:', r3.listing_.listingId.toString(), ' | TokenId:', r3.listing_.erc1155TokenId.toString())
        }
      }
    } catch (e) {
      console.log("Error after ", i, "\nno more listing?", e);
      break
    }

  }


}

const remaning_closed = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
export async function market_test() {

  let diamondCreationBlock = 11516320;
  let diamond = await aavegotchi_diamond();
  // const erc1155Marketplace = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
  // const itemsFacet = await ethers.getContractAt('contracts/Aavegotchi/facets/ItemsFacet.sol:ItemsFacet', aavegotchiDiamondAddress)


  // // diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
  // let filter = diamond.filters.ERC1155ListingAdd()
  // let results = await diamond.queryFilter(filter, diamondCreationBlock)
  // let count = 0;
  // for (const result of results) {
  //   count++
  //   console.log('diamond.filters.ERC1155ListingAdd()', result);
  //   if (result.args.erc1155TypeId.eq(65)) {
  //     console.log(result.args)
  //   }
  // }
  // console.log(count)

  // diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)


  // on page load

  const result1 = await diamond.getERC1155Listing(29302)
  console.log('diamond.filters.getERC1155Listing(29302)', result1)
  console.log(result1.erc1155TypeId.toString())

  let thousands = await diamond.getERC1155Listing(30000);
  console.log('diamond.filters.getERC1155Listing(30000)', thousands)


  for (let i = 0; i < 35000; i++) {
    if (i % 100 === 0) {
      console.log(i)
    }
    const result = await diamond.getERC1155Listing(i);
    console.log(result);

    if (result.sold === false && result.cancelled === false) {

      if (result.quantity.eq(0)) {
        console.log('Open listing has quantity as 0. ListingId:', result.listingId.toString())
      } else {

        const amount = await diamond.balanceOf(result.seller, result.erc1155TypeId)
        if (result.quantity.gt(amount)) {
          console.log('Open listing quantity greater than users balance. ListingId: ', result.listingId.toString())
          console.log(result.quantity.toString(), ' and ', amount.toString())
        }


      }


    }
  }
}

export async function aavegotchi_diamond() {
  let aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  // let diamond
  // diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)
  return await new ethers.Contract(aavegotchiDiamondAddress, require("./aavegotchi/diamond"), get_provider())
}

// dont loop through all the potential 29000 listings
const snapshot_base = 29000;

export async function baazaar_1155() {
  // for (let i = 0; i)
  try {

  } catch (e) {
    console.log("error, so i hope no more listings for now!");
  }
  let diamond = await aavegotchi_diamond();
  const result1 = await diamond.getERC1155Listing(29302)
  console.log('diamond.filters.getERC1155Listing(29302)', result1)
  console.log(result1.erc1155TypeId.toString())
}

const listings = [];
export function current_listings() {
  return listings;
}

import moment from "moment";
export async function listen_market_events() {
  // ERC1155ListingAdd
  let diamond = await aavegotchi_diamond();
  diamond.on("ERC1155ListingAdd", async (e) => {

    let listing_id = ethers.BigNumber.from(e).toNumber();
    let listing_info = await diamond.getERC1155Listing(listing_id);
    let price = ethers.utils.formatEther(listing_info.priceInWei);
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'), ". new listing: ", "https://aavegotchi.com/baazaar/erc1155/"+listing_id, "! check it right naoo!", `price: ${price}`, ethers.BigNumber.from(listing_info.erc1155TypeId).toNumber(), listing_info);
    current_listings().push(listing_id);

    // document.querySelector("#list").add
  });
}

// pass a funtion to get the arg pased to it, add to UI when called
export async function export_new_listings(e) {
  // ERC1155ListingAdd
  let diamond = await aavegotchi_diamond();
  diamond.on("ERC1155ListingAdd", e);
}

// seems to work for looking at transaciton, but returns 4000...
// window.EntryPoint.common.get_provider().getTransactionCount("0x86935F11C86623deC8a25696E1C19a8659CbF95d")
