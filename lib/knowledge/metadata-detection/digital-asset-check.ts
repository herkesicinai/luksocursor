import { ERC725 } from "@erc725/erc725.js";
import lsp4Schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";

const assetContractAddress = "0xbA712C92C6e10f22d7C737f9BC7dAa22B65548F7";

// Initatiate erc725.js
const erc725js = new ERC725(
  lsp4Schema,
  assetContractAddress,
  "https://4201.rpc.thirdweb.com",
  {}
);

const data = await erc725js.getData("SupportedStandards:LSP4DigitalAsset");
const isLSP4 = data.value !== null;

if (isLSP4) {
  console.log(
    `✅ The contract: ${assetContractAddress} supports the LSP4DigitalAsset standard`
  );
} else {
  console.log(
    `❌ The address: ${assetContractAddress} does not supports the LSP4DigitalAsset standard`
  );
}
