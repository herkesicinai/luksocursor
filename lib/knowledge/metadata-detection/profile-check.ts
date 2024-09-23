import { ERC725 } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

const profileContractAddress = "0x9bbb461307B7C1D45C9677f6019AeD5c15f58E6f";

// Initatiate erc725.js
const erc725js = new ERC725(
  lsp3ProfileSchema,
  profileContractAddress,
  "https://4201.rpc.thirdweb.com",
  {}
);

const data = await erc725js.getData("SupportedStandards:LSP3Profile");
const isLSP3 = data.value !== null;

if (isLSP3) {
  console.log(
    `✅ The contract: ${profileContractAddress} supports the LSP3Profile standard`
  );
} else {
  console.log(
    `❌ The address: ${profileContractAddress} does not supports the LSP3Profile standard`
  );
}
