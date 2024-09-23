import { ERC725 } from "@erc725/erc725.js";

import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const myUniversalProfileAddress = "0x9bbb461307B7C1D45C9677f6019AeD5c15f58E6f";

// Initatiate erc725.js
const erc725js = new ERC725(
  lsp3ProfileSchema,
  myUniversalProfileAddress,
  "https://4201.rpc.thirdweb.com",
  {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

// Get all data keys from the profile smart contract
const profileData = await erc725js.getData();
console.log(profileData);
