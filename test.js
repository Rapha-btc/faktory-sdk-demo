import { FaktorySDK } from "@faktoryfun/core-sdk";

const sdk = new FaktorySDK({
  network: "mainnet",
});

async function getAllTokenPrices() {
  try {
    console.log("Fetching ALL token prices...");

    let allTokens = [];
    let offset = 0;
    const limit = 50;

    while (true) {
      const batch = await sdk.getTokenPrices({ limit, offset });
      allTokens = [...allTokens, ...batch.data];

      console.log(`Fetched ${batch.data.length} tokens (offset: ${offset})`);

      // If we got less than the limit, we're done
      if (batch.data.length < limit) {
        break;
      }

      offset += limit;
    }

    console.log(`\nTotal tokens fetched: ${allTokens.length}`);

    // Display as JSON like Velar
    const result = {
      limit: 50,
      offset: 0,
      total: allTokens.length,
      data: allTokens,
    };

    console.log("\nJSON Response (like Velar):");
    console.log(JSON.stringify(result, null, 2));

    // Quick stats
    const tokensWithChanges = allTokens.filter(
      (token) => token.price24hChanges !== null
    );
    console.log(`\n--- Stats ---`);
    console.log(`Total tokens: ${allTokens.length}`);
    console.log(`Tokens with 24h changes: ${tokensWithChanges.length}`);
    console.log(`DAO tokens: ${allTokens.filter((t) => t.daoToken).length}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getAllTokenPrices();
