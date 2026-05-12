# Integration Test Prompt

Use this prompt in a Claude Code session running in the `semantic-scholar-mcp` directory to test all 8 tools against the live Semantic Scholar API.

## Prerequisites

- `SS_API_KEY` environment variable set
- MCP server configured in `.mcp.json` (copy from `.mcp.example.json`)

## Test Papers

Use these 10 papers to cover diverse ID formats:

| # | Paper | ID to use |
|---|-------|-----------|
| 1 | Attention Is All You Need | `ARXIV:1706.03762` |
| 2 | BERT | `2005.14165` (bare arXiv) |
| 3 | GPT-3 | `DOI:10.48550/arXiv.2005.14165` |
| 4 | ResNet | `649def34f8be52c8b66281af98ae884c09aef38b` (S2 hex) |
| 5 | AlphaFold 2 | `DOI:10.1038/s41586-021-03819-2` |
| 6 | Diffusion Models Beat GANs | `ARXIV:2105.05233` |
| 7 | Chain-of-Thought Prompting | `ARXIV:2201.11903` |
| 8 | LoRA | `ARXIV:2106.09685` |
| 9 | FlashAttention | `ARXIV:2205.14135` |
| 10 | Mamba | `ARXIV:2312.00752` |

## Test Plan

### 1. paper tool
For each of the 10 papers above, call `paper` with the given ID. Verify:
- Returns title, abstract, year, authors, citationCount
- externalIds contains expected identifiers
- No errors

### 2. paperBatch tool
Call `paperBatch` with all 10 paper IDs at once. Verify:
- Returns array of 10 results
- Each result has title and paperId

Also test with one invalid ID mixed in (e.g., `ARXIV:9999.99999`). Verify:
- Returns null for the invalid entry, valid results for others

### 3. references tool
Call `references` on paper #1 (Attention Is All You Need). Verify:
- Returns a list of cited papers
- Each entry has citedPaper with title and paperId
- contexts/intents/isInfluential fields present

### 4. citations tool
Call `citations` on paper #1. Verify:
- Returns a list of citing papers
- Each entry has citingPaper with title and paperId
- Pagination works: call with limit=5, then offset=5

### 5. recommendations tool
Call `recommendations` with papers #1 and #7 as positive seeds. Verify:
- Returns recommended papers
- Results are related to transformers/NLP

Call with paper #1 positive, paper #4 negative. Verify:
- Results steer away from computer vision

### 6. relevanceSearch tool
Search for "transformer attention mechanism". Verify:
- Returns ranked results with titles and abstracts
- Test filters: year="2023-2024", min_citation_count=100

### 7. author tool
Look up author Ashish Vaswani (get authorId from paper #1 result). Verify:
- Returns name, affiliations, hIndex, paperCount, citationCount

### 8. authorPapers tool
Call `authorPapers` on the same author. Verify:
- Returns list of papers with full metadata
- Pagination works: limit=5, offset=0

## Edge Cases

- Non-existent paper: `paper` with `ARXIV:0000.00000` → should return error object with `error: "not_found"`
- Empty search: `relevanceSearch` with query="" → should return error or empty results
- Large batch: `paperBatch` with 500 valid IDs → should succeed (use IDs from citations result)

## Success Criteria

All 8 tools return valid structured data. No crashes, no unhandled errors. Rate limiting handles gracefully (retries on 429).
