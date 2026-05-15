# semantic-scholar-mcp

**MCP server for academic research powered by Semantic Scholar — access 200M+ papers, citations, authors, and recommendations.**

- 📄 **Paper lookup** — find papers by arXiv ID, DOI, title, or Semantic Scholar ID
- 🔗 **Citation tracing** — explore reference chains and citation networks with context and intent
- 👤 **Author profiles** — get h-index, publication counts, affiliations, and paper lists
- 🎯 **Smart recommendations** — discover related papers using positive/negative seed papers
- 🔍 **Advanced search** — filter by year, field of study, citation count, and open access status
- 📦 **Batch operations** — fetch up to 500 papers in a single call

## What is this?

This is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that connects AI assistants to the [Semantic Scholar Academic Graph API](https://api.semanticscholar.org/graph/v1). It exposes 8 tools that cover the full spectrum of academic literature operations — from single paper lookups to batch fetching, citation graph traversal, author profiling, and paper recommendations.

Designed for AI assistants like Claude to help with literature review, citation analysis, and research discovery. Works with any MCP-compatible client (Claude Desktop, Claude Code, or custom integrations).

## Installation

```bash
npx @yogsoth-ai/semantic-scholar-mcp
```

No installation needed. The `npx` command downloads and runs the latest version automatically.

Or install globally:

```bash
npm install -g @yogsoth-ai/semantic-scholar-mcp
```

## Quick Start

### 1. Add to Your MCP Client

Edit your MCP configuration file:

**Claude Desktop** — `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

**Claude Code** — `.mcp.json` in your project root

```json
{
  "mcpServers": {
    "semantic-scholar": {
      "command": "npx",
      "args": ["@yogsoth-ai/semantic-scholar-mcp"],
      "env": {
        "SS_API_KEY": "optional-but-recommended"
      }
    }
  }
}
```

### 2. Get an API Key (Optional)

Without a key: 1 request/second  
With a key: 100 requests/second

Get your free API key at [Semantic Scholar API](https://www.semanticscholar.org/product/api).

### 3. Restart Your MCP Client

The server will start automatically when the client needs it.

## Available Tools

| Tool | Description |
|------|-------------|
| `paper` | Get full metadata for a single paper (supports ARXIV, DOI, S2 ID, PMID, URL formats) |
| `paperBatch` | Batch fetch up to 500 papers in one call |
| `references` | Get papers cited by a paper (outgoing citations with context and intent) |
| `citations` | Get papers citing a paper (incoming citations with context and intent) |
| `recommendations` | Get paper recommendations based on positive/negative seed papers |
| `relevanceSearch` | Search papers by keyword with filters (year, field, citations, open access) |
| `author` | Get author profile (name, affiliations, h-index, paper/citation counts) |
| `authorPapers` | Get all papers by an author with full metadata and pagination |

## Supported ID Formats

The `paper` and `paperBatch` tools accept multiple identifier formats:

| Format | Example | Notes |
|--------|---------|-------|
| arXiv (prefixed) | `ARXIV:1706.03762` | Explicit arXiv prefix |
| arXiv (bare) | `2005.14165` | Auto-prefixed to ARXIV: |
| DOI (prefixed) | `DOI:10.1038/s41586-021-03819-2` | Explicit DOI prefix |
| DOI (bare) | `10.1038/s41586-021-03819-2` | Auto-prefixed to DOI: |
| S2 ID | `204e3073870fae3d05bcbc2f6a8e263d9b72e776` | Semantic Scholar hex ID |
| PubMed | `PMID:34265844` | PubMed identifier |
| URL | `URL:https://arxiv.org/abs/1706.03762` | Paper URL |

## Example Queries

Ask Claude things like:

- *"Find the Attention Is All You Need paper and show me its top 5 most cited references"*
- *"Who are the authors of the GPT-3 paper and what's their h-index?"*
- *"Search for recent papers on diffusion models published after 2023 with at least 100 citations"*
- *"Recommend papers similar to BERT but not related to computer vision"*
- *"Show me all papers by Yann LeCun from the last 3 years"*
- *"Batch fetch these 10 papers and compare their citation counts"*
- *"Trace the citation graph from LoRA — what adaptations have been proposed?"*

## Search Filters

The `relevanceSearch` tool supports these filters:

| Filter | Example | Description |
|--------|---------|-------------|
| `year` | `"2023-2024"`, `"2020-"`, `"-2023"` | Publication year range |
| `fields_of_study` | `"Computer Science"` | Academic field filter |
| `min_citation_count` | `100` | Minimum citation threshold |
| `open_access_only` | `true` | Only papers with free PDF |

## For Developers

### Local Development

```bash
git clone https://github.com/yogsoth-ai/semantic-scholar-mcp.git
cd semantic-scholar-mcp
npm install
npm run build
npm run mcp  # Start the server locally
```

### Running Tests

```bash
npm test
```

### Use in Other MCP Clients

Any MCP-compatible client can use this server. The configuration is the same JSON block shown in Quick Start.

## Links

- 📦 [npm package](https://www.npmjs.com/package/@yogsoth-ai/semantic-scholar-mcp)
- 🐙 [GitHub repository](https://github.com/yogsoth-ai/semantic-scholar-mcp)
- 📚 [Semantic Scholar API Docs](https://api.semanticscholar.org/api-docs/graph)
- 🔧 [Model Context Protocol](https://modelcontextprotocol.io)

## License

[Apache-2.0](./LICENSE)
