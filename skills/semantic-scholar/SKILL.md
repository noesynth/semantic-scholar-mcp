---
name: semantic-scholar
description: How to use the semantic-scholar MCP tools for academic paper lookup, citation tracing, author profiling, and paper recommendations. Use this skill whenever the user asks about academic papers, citations, references, author h-index, paper metadata, or wants to search the academic literature — even if they don't mention "Semantic Scholar" by name. Also use it when you need to look up a paper by arXiv ID, DOI, or title.
---

# Semantic Scholar MCP Tools

This skill covers the 8 tools provided by the `semantic-scholar` MCP server. These tools give you access to 200M+ academic papers via the Semantic Scholar Academic Graph API.

**Important**: these tools return metadata only — title, abstract, authors, year, citation counts, and paper IDs. They do not return full paper text. If the user needs to read a paper's methodology, results, or analysis in detail, you'll need a separate full-text tool (like alphaxiv).

## Tools at a Glance

| Tool | What it does | When to use |
|------|-------------|-------------|
| `paper` | Single paper metadata | You have a paper ID and need its details |
| `paperBatch` | Up to 500 papers at once | You have multiple IDs to look up |
| `relevanceSearch` | Keyword search with filters | Finding papers on a topic |
| `citations` | Papers that cite a given paper | Tracing forward influence |
| `references` | Papers cited by a given paper | Tracing backward lineage |
| `recommendations` | Similar papers from seed papers | Discovering related work |
| `author` | Author profile | Getting h-index, paper count, affiliations |
| `authorPapers` | Author's publication list | Browsing someone's body of work |

## Paper ID Formats

All tools that accept a `paper_id` understand these formats:

| Format | Example | Notes |
|--------|---------|-------|
| ARXIV (prefixed) | `ARXIV:1706.03762` | Most reliable for arXiv papers |
| ARXIV (bare) | `2005.14165` | Auto-prefixed — works the same |
| DOI (prefixed) | `DOI:10.1038/s41586-021-03819-2` | For journal papers |
| DOI (bare) | `10.1038/s41586-021-03819-2` | Auto-prefixed |
| S2 ID | `204e3073870fae3d05bcbc2f6a8e263d9b72e776` | Semantic Scholar's internal hex ID |
| PMID | `PMID:34265844` | PubMed papers |
| URL | `URL:https://arxiv.org/abs/1706.03762` | Any paper URL |

When the user gives you an arXiv link like `https://arxiv.org/abs/2301.12345`, extract the ID and use `ARXIV:2301.12345`.

## Tool Details

### relevanceSearch

The go-to tool for finding papers on a topic. Returns ranked results with metadata.

**Parameters:**
- `query` (required) — keywords or paper title
- `limit` — max results (default 10, max 100)
- `offset` — for pagination
- `year` — range filter: `"2023-2024"`, `"2020-"`, `"-2023"`
- `fields_of_study` — e.g. `"Computer Science"`, `"Mathematics"`, `"Physics"`
- `min_citation_count` — integer threshold (useful for finding impactful work)
- `open_access_only` — boolean, filters to papers with free PDFs

**Tips:**
- Use specific technical terms rather than broad queries
- Combine `year` + `min_citation_count` to find recent high-impact work
- The `total` field in the response tells you how many papers match overall

### paper / paperBatch

Look up known papers by ID. `paperBatch` is more efficient when you have multiple IDs — it returns `null` for any ID not found, without failing the whole request.

**Returns:** title, abstract, year, authors (with IDs), citationCount, influentialCitationCount, referenceCount, externalIds, fieldsOfStudy, venue, publicationDate, openAccessPdf, tldr.

### citations / references

Traverse the citation graph. `citations` gives you papers that cite the target (forward in time). `references` gives you papers the target cites (backward in time).

**Parameters:**
- `paper_id` (required)
- `limit` — default 100, max 1000
- `offset` — for pagination through large citation lists

**Returns include:**
- `contexts` — the actual sentences where the citation appears
- `intents` — why it was cited (background, methodology, result)
- `isInfluential` — whether this is a substantive citation vs. a passing mention

Use `offset` + `limit` to page through highly-cited papers (e.g., "Attention Is All You Need" has 175k+ citations).

### recommendations

Finds papers similar to your seed papers. Supports steering with negative seeds.

**Parameters:**
- `positive_paper_ids` (required) — papers you want more of
- `negative_paper_ids` (optional) — papers to steer away from
- `limit` — default 100, max 500

This is powerful for literature discovery when you have a few anchor papers and want to expand. Negative seeds help when recommendations drift into an adjacent but unwanted subfield.

### author / authorPapers

Look up researcher profiles and their publications.

- `author` takes a numeric author ID (found in paper results under `authors[].authorId`)
- `authorPapers` returns their publication list with pagination

## Common Workflows

**Find high-impact recent papers on a topic:**
```
relevanceSearch(query, year="2023-", min_citation_count=50, limit=20)
```

**Get a paper and its most important references:**
```
paper(id) → then references(id, limit=20) → filter by isInfluential=true
```

**Trace how a paper influenced the field:**
```
citations(id, limit=50) → sort by citationCount → look at top citers
```

**Discover related work from anchor papers:**
```
recommendations(positive=[paper_a, paper_b], negative=[unrelated_paper], limit=20)
```

**Profile a researcher:**
```
author(id) → authorPapers(id, limit=50) → sort by citationCount
```

## Things to Keep in Mind

- **Rate limits**: Without an API key, you get 1 request/second. With a key, 100 req/s. If you're doing batch operations, prefer `paperBatch` over multiple `paper` calls.
- **Metadata only**: These tools don't give you full paper text. Don't summarize a paper based solely on its abstract — tell the user you only have the abstract if that's all you've read.
- **Author IDs are numeric**: You'll find them in paper results. They're not names — you need the ID to call `author` or `authorPapers`.
- **Pagination**: For `citations`/`references`/`authorPapers`, use `offset` and `limit`. The response includes a `next` field indicating the offset for the next page.
- **Null in batch**: `paperBatch` returns `null` for papers not found — this is normal, not an error.
