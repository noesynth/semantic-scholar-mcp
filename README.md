# semantic-scholar-mcp

Lightweight MCP server wrapping the [Semantic Scholar Academic Graph API](https://api.semanticscholar.org/graph/v1).

## Installation

```bash
npm install @noesynth/semantic-scholar-mcp
```

Or use directly with `npx`:

```bash
npx @noesynth/semantic-scholar-mcp
```

## Tools

| Tool | Description |
|------|-------------|
| `paper` | Get full metadata for a single paper (S2 ID, ARXIV:xxx, DOI:xxx, PMID:xxx, URL:xxx) |
| `paperBatch` | Batch fetch up to 500 papers in one call |
| `references` | Outgoing references with citation context, intent, and influence flag |
| `citations` | Incoming citations with citation context, intent, and influence flag |
| `recommendations` | Recommended papers based on positive/negative seed papers |
| `author` | Author profile (name, affiliations, h-index, paper/citation counts) |
| `authorPapers` | All papers by an author with full metadata |
| `relevanceSearch` | Search papers by keyword with filters (year, field, citations, open access) |

## Setup

### For Development

```bash
git clone https://github.com/noesynth/semantic-scholar-mcp.git
cd semantic-scholar-mcp
npm install
npm run build
```

### API Key (Optional)

Set `SS_API_KEY` environment variable for higher rate limits (100 req/s vs 1 req/s unauthenticated).

Get your API key at [Semantic Scholar API](https://www.semanticscholar.org/product/api).

## Usage

### With Claude Desktop / MCP Clients

Add to your MCP configuration (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "semantic-scholar": {
      "command": "npx",
      "args": ["@noesynth/semantic-scholar-mcp"],
      "env": {
        "SS_API_KEY": "<your-key-here>"
      }
    }
  }
}
```

### Running Standalone

```bash
npm run mcp
```

## Testing

```bash
npm test                                                        # unit tests (75)
SS_API_KEY=<key> npx vitest run tests/integration.test.ts      # live API tests
```

## License

[Apache-2.0](LICENSE)
