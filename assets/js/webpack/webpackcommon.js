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
  const diamondCreationBlock = 11516320
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

  let diamond = await aavegotchi_diamond();
  // const erc1155Marketplace = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
  // const itemsFacet = await ethers.getContractAt('contracts/Aavegotchi/facets/ItemsFacet.sol:ItemsFacet', aavegotchiDiamondAddress)


  // diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
  let filter = diamond.filters.ERC1155ListingAdd()
  let results = await diamond.queryFilter(filter, diamondCreationBlock)
  let count = 0;
  for (const result of results) {
    count++
    console.log('diamond.filters.ERC1155ListingAdd()', result);
    if (result.args.erc1155TypeId.eq(65)) {
      console.log(result.args)
    }
  }
  console.log(count)

  diamond = await ethers.getContractAt('ERC1155MarketplaceFacet', aavegotchiDiamondAddress)
  const result1 = await diamond.getERC1155Listing(1273)
  console.log(result1)
  console.log(result1.erc1155TypeId.toString())



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

// seems to work for looking at transaciton, but returns 4000...
// window.EntryPoint.common.get_provider().getTransactionCount("0x86935F11C86623deC8a25696E1C19a8659CbF95d")
