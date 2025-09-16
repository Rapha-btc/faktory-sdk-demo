# Faktory Token Price Integration Test

A simple test script demonstrating how to fetch all verified token prices from Faktory's mainnet API. This shows builders how to integrate with Faktory's token ecosystem and work with the complete dataset.

## What This Does

This script fetches all verified tokens from Faktory and displays them in a clean JSON format similar to major exchanges. It demonstrates pagination handling and provides the complete token dataset that builders can use for trading interfaces, analytics, or other applications.

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

Copy the `test.js` file and run:

```bash
node test.js
```

For more SDK configuration options, see the [full documentation](https://www.npmjs.com/package/@faktoryfun/core-sdk).

## Sample Output

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

## SDK Methods Used

This test demonstrates the `getTokenPrices()` method:

```javascript
const prices = await sdk.getTokenPrices({
  limit: 50, // max 50 per request
  offset: 0, // pagination offset
});
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
