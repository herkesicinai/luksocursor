import { ethers } from "ethers";
import { ERC725 } from "@erc725/erc725.js";
import lsp4Schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import { INTERFACE_IDS } from "@lukso/lsp-smart-contracts";

/*
Supported interfaces from lsp-smart-contracts library:
https://docs.lukso.tech/tools/lsp-smart-contracts/constants
*/

const SAMPLE_ASSET_CONTRACT_ADDRESS =
  "0xbA712C92C6e10f22d7C737f9BC7dAa22B65548F7";

const RPC_URL = "https://4201.rpc.thirdweb.com";

const myAsset = new ERC725(lsp4Schema, SAMPLE_ASSET_CONTRACT_ADDRESS, RPC_URL, {
  ipfsGateway: "https://api.universalprofile.cloud/ipfs",
});

const isLSP7 = await myAsset.supportsInterface(INTERFACE_IDS.LSP7DigitalAsset);

const isLSP8 = await myAsset.supportsInterface(
  INTERFACE_IDS.LSP8IdentifiableDigitalAsset
);

if (isLSP7) {
  console.log(
    `✅ The contract: ${SAMPLE_ASSET_CONTRACT_ADDRESS} supports the LSP7 interface ID`
  );
}
if (isLSP8) {
  console.log(
    `✅ The contract: ${SAMPLE_ASSET_CONTRACT_ADDRESS} supports the LSP8 interface ID`
  );
}

const provider = new ethers.JsonRpcProvider(RPC_URL);

const universalProfileContractAddress =
  "0xe65e927d0eccaaab6972170b489d3c1455955116";

// Create an instance of the Universal Profile
const myProfileContract = new ethers.Contract(
  universalProfileContractAddress,
  UniversalProfile.abi,
  provider
);

const isLSP0 = await myProfileContract.supportsInterface(
  INTERFACE_IDS.LSP0ERC725Account
);

if (isLSP0) {
  console.log(
    `✅ The contract: ${universalProfileContractAddress} supports the LSP0ERC725Account interface ID`
  );
} else {
  console.log(
    `❌ The address: ${universalProfileContractAddress} does not supports the LSP0ERC725Account interface ID`
  );
}
