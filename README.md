# semantic-scholar-mcp

Lightweight MCP server wrapping the [Semantic Scholar Academic Graph API](https://api.semanticscholar.org/graph/v1).

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

```bash
npm install
```

## Running

```bash
npm run mcp
```

Set `SS_API_KEY` environment variable for higher rate limits (100 req/s vs 1 req/s unauthenticated).

## MCP Config

```json
{
  "mcpServers": {
    "semantic-scholar": {
      "command": "npx",
      "args": ["tsx", "src/server.ts"],
      "env": {
        "SS_API_KEY": "<your-key>"
      }
    }
  }
}
```

## Testing

```bash
npm test                                                        # unit tests (75)
SS_API_KEY=<key> npx vitest run tests/integration.test.ts      # live API tests
```

## License

[Apache-2.0](LICENSE)
