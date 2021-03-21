import * as diamond from "./diamond";
import * as erc721 from "./erc721";

// perfect pet all button!
// await window.EntryPoint.special.interact()
export async function interact(
) {
  let contract = await diamond.aavegotchi_diamond_signed();
  let acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
  let mygot = await contract.tokenIdsOfOwner(acc[0]);
  mygot = mygot.filter(item => item !== 6086) // all but participant get pet
  return await contract.interact(mygot);
}

export async function check_name(
  check // name to check
) {
  let contract = await diamond.aavegotchi_diamond();
  return await contract.aavegotchiNameAvailable(check);
}

import * as ethers from "ethers";
export async function relist_erc721(
  id // tokenId
) {
  let contract = await diamond.aavegotchi_diamond();
  let signed = await diamond.aavegotchi_diamond_signed();

  // et aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  // let diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)

  let erc721_marketplace_facet = "0xFDdC3009B5AF4502DA6d9c1187Fa79db32ECF394";
  // let signer = new ethers.providers.Web3Provider(window.ethereum).getSigner()
  // let signed = new ethers.Contract(erc721_marketplace_facet, require("../aavegotchi/diamond"), signer)


  // aaverage = 5656 id number
  let gotchi_to_sell = await contract.getAavegotchi(5656);
  console.log(gotchi_to_sell);
  await signed.getApproved(gotchi_to_sell.tokenId);
  let acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
  let rest = await signed.addERC721Listing(erc721_marketplace_facet, gotchi_to_sell.tokenId, ethers.utils.parseEther('1'));
  console.log(rest);
  //
  // let orig = await contract.getERC721Listing(47402) // getAavegotchi by listing id
  // console.log('47402', orig);
  // let listingId = ethers.BigNumber.from(orig.listingId);
  // let origPrice = orig.priceInWei;
  // let tokenAddy = orig.erc721TokenAddress;
  // let tokenId = orig.erc721TokenId;
  // await contract.cancelERC721Listing(47402);

  // getERC721Listing
// getERC721ListingFromToken
  // let orig = await contract.getERC1155Listing();

  // cancell old orig
  // await contract.cancelERC1155Listing() //listing id

  // cancelERC721ListingByToken
// cancelERC721Listing
//addERC721Listing( tokenAddress, tokenId, priceInWei )

  // repost it
  await contract.addERC721Listing()

}

export async function buy_portals(

) {
  let contract = await diamond.aavegotchi_diamond_signed();
  let acc = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return await contract.interact(acc[0], 100); // buys 1 portal
}

// export async function buy_portal(
//
// )
