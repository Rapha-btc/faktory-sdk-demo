import { FaktorySDK } from "@faktoryfun/core-sdk";

const sdk = new FaktorySDK({
  network: "mainnet",
});

async function testTokens() {
  try {
    console.log("Testing getVerifiedTokens...");

    const tokens = await sdk.getVerifiedTokens({
      limit: 5,
    });

    console.log("Response structure:");
    console.log(JSON.stringify(tokens, null, 2));

    if (tokens.data && tokens.data[0]) {
      console.log("\nFirst token fields:");
      console.log(Object.keys(tokens.data[0]));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testTokens();
