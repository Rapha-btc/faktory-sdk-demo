# Faktory Token Price Integration Test

A simple test script demonstrating how to fetch all verified token prices from Faktory's mainnet API. This shows builders how to integrate with Faktory's token ecosystem and work with the complete dataset.

## What This Does

This repository contains scripts that:

1. Fetch all verified tokens from Faktory and display them in a clean JSON format similar to major exchanges
2. Retrieve detailed information about specific DEX and token contracts

Both scripts demonstrate different aspects of the Faktory API integration for trading interfaces, analytics, or other applications.

## Quick Start

```bash
git clone <this-repo>
cd faktory-test
npm install
node test.js
```

Or set it up yourself:

```bash
mkdir faktory-test
cd faktory-test
npm init -y
npm install @faktoryfun/core-sdk
```

Add to `package.json`:

```json
{
  "type": "module"
}
```

Run either script:

```bash
# For the token price list
node test.js

# For specific DEX contract information
node test-getToken.js
```

For more SDK configuration options, see the [full documentation](https://www.npmjs.com/package/@faktoryfun/core-sdk).

## Token Price List (test.js)

### Sample Output

The script will fetch all tokens and display them like this:

```
Fetching ALL token prices...
Fetched 50 tokens (offset: 0)
Fetched 50 tokens (offset: 50)
Fetched 22 tokens (offset: 100)

Total tokens fetched: 122

JSON Response (like Velar):
{
  "limit": 50,
  "offset": 0,
  "total": 122,
  "data": [
    {
      "symbol": "LUNACAT",
      "name": "LunaCat Nebula Nibs",
      "tokenContract": "SP14FSJ...faktory",
      "supply": 1000000000,
      "decimals": 6,
      "price": 0.000001913166375601056,
      "price24hChanges": null,
      "tradingVolume": 4675886651,
      "logoUrl": "https://...",
      "twitter": "https://x.com/Luna_Sage68",
      "website": "",
      "telegram": "",
      "discord": "",
      "denomination": "stx",
      "daoToken": false
    }
    // ... all other tokens
  ]
}

--- Stats ---
Total tokens: 122
Tokens with 24h changes: 0
DAO tokens: 15
```

## DEX Contract Information (test-getToken.js)

### Sample Output

The script retrieves complete information about specified DEX contracts:

```json
FAKFUN DEX Contract Info:
{
  "success": true,
  "data": {
    "symbol": "FAKFUN",
    "name": "faktory fun",
    "dexContract": "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.sbtc-fakfun-amm-lp-v1",
    "tokenContract": "SPV9K21TBFAK4KNRJXF5DFP8N7W46G4V9RCJDC22.fakfun-faktory",
    "price": 3.3506525860372977e-10,
    "tradingVolume": 62810070,
    // Full contract details...
  }
}

B DEX Contract Info:
{
  "success": true,
  "data": {
    "symbol": "B",
    "name": "Blocks",
    "dexContract": "SPV9K21TBFAK4KNRJXF5DFP8N7W46G4V9RCJDC22.b-faktory-pool",
    "tokenContract": "SPV9K21TBFAK4KNRJXF5DFP8N7W46G4V9RCJDC22.b-faktory",
    "price": 7.755664226813156e-10,
    "tradingVolume": 84341438,
    // Full contract details...
  }
}

Available SDK Methods:
[...list of SDK methods...]
```

### Why This Script Helps

This script is useful for retrieving specific DEX contract information for graduated tokens trading on AMMs. It demonstrates the proper approach when working with tokens that have moved beyond the bonding curve phase.

The common error `Unchecked(UndefinedFunction("get-buyable-tokens"))` occurs because `getIn()` only works with bonding curve contracts, not with graduated tokens on AMM contracts. This script shows how to use `getToken()` instead to get the necessary contract information.

## Data Fields

Each token includes these fields optimized for trading applications:

- `symbol` - Token ticker (e.g. "LUNACAT")
- `name` - Full token name
- `tokenContract` - Stacks contract address
- `supply` - Total token supply
- `decimals` - Token decimal places
- `price` - Current price in STX/BTC
- `price24hChanges` - 24-hour price change percentage (may be null)
- `tradingVolume` - Trading volume
- `logoUrl` - Token logo image URL
- `twitter/website/telegram/discord` - Social links
- `denomination` - "stx" or "btc"
- `daoToken` - Boolean indicating if it's a DAO token

## Integration Examples

### Basic Price Display

```javascript
const { data: tokens } = await sdk.getTokenPrices({ limit: 20 });
tokens.forEach((token) => {
  console.log(`${token.symbol}: $${token.price}`);
});
```

### Filter by Type

```javascript
// Get only DAO tokens
const daoTokens = allTokens.filter((t) => t.daoToken);

// Get STX-denominated tokens
const stxTokens = allTokens.filter((t) => t.denomination === "stx");
```

### Build Trading Interface

```javascript
// Sort by volume
const topByVolume = allTokens.sort((a, b) => b.tradingVolume - a.tradingVolume);

// Filter tokens with logos
const tokensWithLogos = allTokens.filter((t) => t.logoUrl);
```

### Get DEX Contract Information

```javascript
// Get specific DEX contract details
const dexInfo = await sdk.getToken(
  "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS.sbtc-fakfun-amm-lp-v1"
);
console.log(dexInfo.data.symbol, dexInfo.data.price);
```

## SDK Methods Used

This repository demonstrates these SDK methods:

```javascript
// Get token prices (with pagination)
const prices = await sdk.getTokenPrices({
  limit: 50, // max 50 per request
  offset: 0, // pagination offset
});

// Get specific token/DEX information
const tokenInfo = await sdk.getToken(
  "SPV9K21TBFAK4KNRJXF5DFP8N7W46G4V9RCJDC22.fakfun-faktory"
);
```

## API Details

- **Authentication**: Default API key included in SDK
- **Pagination**: 50 tokens maximum per request
- **Rate Limits**: Reasonable usage expected

## Use Cases

- **Trading Platforms**: Display token prices and market data
- **Portfolio Trackers**: Monitor token values and holdings
- **Analytics Dashboards**: Analyze market trends and volumes
- **Token Explorers**: Browse Faktory's token ecosystem
- **DeFi Applications**: Access metadata for swaps and liquidity

## Production Usage

For production applications, obtain your own API key:

```javascript
const sdk = new FaktorySDK({
  network: "mainnet",
  apiKey: "your-production-key",
});
```

## Resources

- [Faktory SDK Documentation](https://www.npmjs.com/package/@faktoryfun/core-sdk)
- [Faktory Platform](https://faktory.fun)
- [Stacks Blockchain](https://stacks.co)
