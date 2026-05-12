# semantic-scholar-mcp

**MCP server for academic research powered by Semantic Scholar**

Access 200M+ papers, citations, authors, and recommendations through the [Semantic Scholar Academic Graph API](https://api.semanticscholar.org/graph/v1) — designed for AI assistants like Claude to help with literature review, citation analysis, and research discovery.

## What is this?

This is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that connects AI assistants to Semantic Scholar's academic database. It enables:

- 📄 **Paper lookup** — Find papers by arXiv ID, DOI, title, or Semantic Scholar ID
- 🔗 **Citation tracing** — Explore reference chains and citation networks
- 👤 **Author profiles** — Get h-index, publication counts, and paper lists
- 🎯 **Smart recommendations** — Discover related papers based on your research interests
- 🔍 **Advanced search** — Filter by year, field, citation count, and open access status

Perfect for researchers, students, and anyone doing literature review with AI assistance.

## Installation

```bash
npx @noesynth/semantic-scholar-mcp
```

No installation needed! The `npx` command downloads and runs the latest version automatically.

Or install globally:

```bash
npm install -g @noesynth/semantic-scholar-mcp
```

## Quick Start

### 1. Add to Claude Desktop

Edit your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "semantic-scholar": {
      "command": "npx",
      "args": ["@noesynth/semantic-scholar-mcp"],
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

### 3. Restart Claude Desktop

The server will start automatically when Claude needs it.

## Available Tools

| Tool | Description |
|------|-------------|
| `paper` | Get full metadata for a single paper (supports ARXIV, DOI, S2 ID, PMID, URL formats) |
| `paperBatch` | Batch fetch up to 500 papers in one call |
| `references` | Get papers cited by a paper (outgoing citations with context and intent) |
| `citations` | Get papers citing a paper (incoming citations with context and intent) |
| `recommendations` | Get paper recommendations based on positive/negative seed papers |
| `author` | Get author profile (name, affiliations, h-index, paper/citation counts) |
| `authorPapers` | Get all papers by an author with full metadata and pagination |
| `relevanceSearch` | Search papers by keyword with filters (year, field, citations, open access) |

## Example Queries

Ask Claude things like:

- *"Find the Attention Is All You Need paper and show me its top 5 most cited references"*
- *"Who are the authors of the GPT-3 paper and what's their h-index?"*
- *"Search for recent papers on diffusion models published after 2023 with at least 100 citations"*
- *"Recommend papers similar to BERT but not related to computer vision"*
- *"Show me all papers by Yann LeCun from the last 3 years"*

## For Developers

### Local Development

```bash
git clone https://github.com/noesynth/semantic-scholar-mcp.git
cd semantic-scholar-mcp
npm install
npm run build
npm run mcp  # Start the server
```

### Use in Other MCP Clients

Any MCP-compatible client can use this server:

```json
{
  "mcpServers": {
    "semantic-scholar": {
      "command": "npx",
      "args": ["@noesynth/semantic-scholar-mcp"],
      "env": {
        "SS_API_KEY": "your-key-here"
      }
    }
  }
}
```

## Links

- 📦 [npm package](https://www.npmjs.com/package/@noesynth/semantic-scholar-mcp)
- 📚 [Semantic Scholar API Docs](https://api.semanticscholar.org/api-docs/graph)
- 🔧 [Model Context Protocol](https://modelcontextprotocol.io)

## License

MIT
