import { FaktorySDK } from "@faktoryfun/core-sdk";

const sdk = new FaktorySDK({
  network: "mainnet",
});

// Get complete token/DEX information
async function getTokenInfo() {
  try {
    // Get FAKFUN DEX info
    console.log("FAKFUN DEX Contract Info:");
    const fakfunDex = await sdk.getToken(
      "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.sbtc-fakfun-amm-lp-v1"
    );

    // Print complete response
    console.log(JSON.stringify(fakfunDex, null, 2));

    // Get B DEX info
    console.log("\nB DEX Contract Info:");
    const bDex = await sdk.getToken(
      "SPV9K21TBFAK4KNRJXF5DFP8N7W46G4V9RCJDC22.b-faktory-pool"
    );

    // Print complete response
    console.log(JSON.stringify(bDex, null, 2));

    // List all available SDK methods to help troubleshoot
    console.log(
      "\nAll SDK Methods: https://www.npmjs.com/package/@faktoryfun/core-sdk"
    );
    console.log(Object.keys(sdk));
  } catch (error) {
    console.error("Error:", error);
  }
}

getTokenInfo();
