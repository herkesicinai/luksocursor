import { ERC725 } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

// Initatiate erc725.js
const erc725js = new ERC725(
  lsp3ProfileSchema,
  "0x9bbb461307B7C1D45C9677f6019AeD5c15f58E6f", // UP Contract Address
  "https://4201.rpc.thirdweb.com",
  {
    ipfsGateway: "https://api.universalprofile.cloud/ipfs",
  }
);

// 💡 Note: You can debug any smart contract by using the ERC725 Tools
// 👉 https://erc725-inspect.lukso.tech/inspector?address=0xEda145b45f76EDB44F112B0d46654044E7B8F319&network=testnet

// Download and verify the profile metadata JSON file
const profileMetaData = await erc725js.fetchData("LSP3Profile");
console.log(JSON.stringify(profileMetaData, undefined, 2));

// Fetch all of the profile's issued assets
const issuedAssetsDataKey = await erc725js.fetchData("LSP12IssuedAssets[]");
console.log(issuedAssetsDataKey);

// Fetch all owned assets of the profile
const receivedAssetsDataKey = await erc725js.fetchData("LSP5ReceivedAssets[]");
console.log(receivedAssetsDataKey);

// Fetch the profile's universal receiver
const universalReceiverDataKey = await erc725js.fetchData(
  "LSP1UniversalReceiverDelegate"
);
console.log(universalReceiverDataKey);
