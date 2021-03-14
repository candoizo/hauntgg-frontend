import { ethers } from 'ethers';

export function get_provider() {
  return new ethers.providers.Web3Provider(window.ethereum)
}

export async function aavegotchi_diamond() {
  let aavegotchiDiamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  // let diamond = await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', aavegotchiDiamondAddress)
  return await new ethers.Contract(aavegotchiDiamondAddress, require("../aavegotchi/diamond"), get_provider())
}
