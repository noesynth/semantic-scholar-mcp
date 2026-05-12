# 已发布 npm 包集成测试结果

**测试日期**: 2026-05-12  
**测试包**: `@noesynth/semantic-scholar-mcp@1.0.0`  
**测试环境**: Windows 11, Node.js, MCP via npx

## 测试概述

本次测试验证了已发布到 npm 的 `@noesynth/semantic-scholar-mcp` 包的所有 8 个 MCP 工具，使用 10 篇不同 ID 格式的测试论文。所有工具均通过测试，成功与 Semantic Scholar API 交互。

## 测试论文列表

| # | 论文标题 | ID 格式 | 测试 ID |
|---|---------|---------|---------|
| 1 | Attention Is All You Need | ARXIV 前缀 | `ARXIV:1706.03762` |
| 2 | Language Models are Few-Shot Learners (GPT-3) | 裸 arXiv ID | `2005.14165` |
| 3 | Language Models are Few-Shot Learners (GPT-3) | DOI 前缀 | `DOI:10.48550/arXiv.2005.14165` |
| 4 | Construction of the Literature Graph in Semantic Scholar | S2 十六进制 ID | `649def34f8be52c8b66281af98ae884c09aef38b` |
| 5 | Highly accurate protein structure prediction with AlphaFold | DOI (Nature) | `DOI:10.1038/s41586-021-03819-2` |
| 6 | Diffusion Models Beat GANs on Image Synthesis | ARXIV 前缀 | `ARXIV:2105.05233` |
| 7 | Chain of Thought Prompting Elicits Reasoning in Large Language Models | ARXIV 前缀 | `ARXIV:2201.11903` |
| 8 | LoRA: Low-Rank Adaptation of Large Language Models | ARXIV 前缀 | `ARXIV:2106.09685` |
| 9 | FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness | ARXIV 前缀 | `ARXIV:2205.14135` |
| 10 | Mamba: Linear-Time Sequence Modeling with Selective State Spaces | ARXIV 前缀 | `ARXIV:2312.00752` |

## 测试结果详情

### 1. paper 工具 ✅

**测试内容**: 对所有 10 篇论文调用 `paper` 工具

**结果**: 全部成功

**验证项**:
- ✅ 返回完整的论文元数据（title, abstract, year, authors, citationCount）
- ✅ externalIds 包含预期的标识符（ArXiv, DOI, CorpusId 等）
- ✅ 支持多种 ID 格式（ARXIV:前缀、裸 arXiv ID、DOI、S2 十六进制 ID）
- ✅ 无错误返回

**示例数据** (Attention Is All You Need):
```json
{
  "paperId": "204e3073870fae3d05bcbc2f6a8e263d9b72e776",
  "title": "Attention is All you Need",
  "year": 2017,
  "citationCount": 175716,
  "influentialCitationCount": 19765,
  "authors": [
    {"authorId": "40348417", "name": "Ashish Vaswani"},
    {"authorId": "1846258", "name": "Noam Shazeer"},
    ...
  ],
  "externalIds": {
    "ArXiv": "1706.03762",
    "DBLP": "journals/corr/VaswaniSPUJGKP17",
    "CorpusId": 13756489
  }
}
```

**关键发现**:
- GPT-3 论文 (2005.14165) 的引用数达到 57,710
- AlphaFold 论文引用数达到 35,248
- Attention Is All You Need 引用数高达 175,716

---

### 2. paperBatch 工具 ✅

**测试内容**: 
1. 批量获取所有 10 篇论文
2. 混合有效和无效 ID 测试

**结果**: 全部成功

**测试 1 - 批量获取 10 篇论文**:
- ✅ 返回包含 10 个结果的数组
- ✅ 每个结果包含 title 和 paperId
- ✅ 所有论文数据完整

**测试 2 - 混合无效 ID**:
输入: `["ARXIV:1706.03762", "ARXIV:9999.99999", "ARXIV:2312.00752"]`
- ✅ 有效论文返回完整数据
- ✅ 无效 ID (`ARXIV:9999.99999`) 返回 `null`
- ✅ 不影响其他有效结果

**示例输出**:
```json
[
  {
    "paperId": "204e3073870fae3d05bcbc2f6a8e263d9b72e776",
    "title": "Attention is All you Need",
    ...
  },
  null,  // 无效 ID
  {
    "paperId": "7bbc7595196a0606a07506c4fb1473e5e87f6082",
    "title": "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    ...
  }
]
```

---

### 3. references 工具 ✅

**测试内容**: 获取 Attention Is All You Need 论文的参考文献（前 10 条）

**结果**: 成功

**验证项**:
- ✅ 返回引用论文列表
- ✅ 每个条目包含 `citedPaper` 对象（title, paperId, year, citationCount）
- ✅ 包含 `contexts`（引用上下文）
- ✅ 包含 `intents`（引用意图，如 "background", "methodology"）
- ✅ 包含 `isInfluential` 标志

**示例数据**:
```json
{
  "data": [
    {
      "intents": ["result", "methodology", "background"],
      "isInfluential": true,
      "contexts": [
        "We also experimented with using learned positional embeddings [8]...",
        "The goal of reducing sequential computation also forms the foundation..."
      ],
      "citedPaper": {
        "paperId": "43428880d75b3a14257c3ee9bda054e61eb869c0",
        "title": "Convolutional Sequence to Sequence Learning",
        "year": 2017,
        "citationCount": 3518
      }
    }
  ]
}
```

**关键发现**:
- 返回了 10 条参考文献
- 包含重要的引用上下文信息
- 标记了有影响力的引用（`isInfluential: true`）

---

### 4. citations 工具 ✅

**测试内容**: 
1. 获取 Attention Is All You Need 的引用论文（前 5 条）
2. 测试分页功能（offset=5, limit=5）

**结果**: 全部成功

**验证项**:
- ✅ 返回引用论文列表
- ✅ 每个条目包含 `citingPaper` 对象（title, paperId, year）
- ✅ 分页功能正常（offset 和 limit 参数生效）
- ✅ 返回 `next` 字段指示下一页偏移量

**测试 1 - 前 5 条引用**:
```json
{
  "offset": 0,
  "next": 5,
  "data": [
    {
      "citingPaper": {
        "paperId": "e0303d2116dea2125aa7b17f4c5fbb5a910411c2",
        "title": "Enhancing long-range contextual interactions via frequency-aware directional shifts for medical image segmentation",
        "year": 2026
      }
    },
    ...
  ]
}
```

**测试 2 - 分页（offset=5）**:
- ✅ 成功获取第二页数据
- ✅ `offset: 5`, `next: 10` 正确返回

**关键发现**:
- Attention Is All You Need 论文被大量引用（2026 年仍有新引用）
- 引用涵盖多个领域（医学图像分割、水质预测、交通信号控制等）

---

### 5. recommendations 工具 ✅

**测试内容**:
1. 基于 Attention Is All You Need + Chain-of-Thought Prompting 的正向推荐
2. 基于 Attention Is All You Need（正向）+ Semantic Scholar 论文（负向）的推荐

**结果**: 全部成功

**测试 1 - 双正向种子**:
输入: `positive_paper_ids: ["ARXIV:1706.03762", "ARXIV:2201.11903"]`
- ✅ 返回 5 篇推荐论文
- ✅ 推荐论文与 Transformer 和推理相关
- ✅ 包含完整元数据（title, abstract, year, authors）

**推荐论文示例**:
1. "LLMs Struggle with Abstract Meaning Comprehension More Than Expected" (2026)
2. "Transformer See, Transformer Do: Copying as an Intermediate Step in Learning Analogical Reasoning" (2026)
3. "A Family of LLMs Liberated from Static Vocabularies" (2026)
4. "Think in Sentences: Explicit Sentence Boundaries Enhance Language Model's Capabilities" (2026)
5. "Understanding Transformers and Attention Mechanisms: An Introduction for Applied Mathematicians" (2026)

**测试 2 - 正负向种子**:
输入: 
- `positive_paper_ids: ["ARXIV:1706.03762"]`
- `negative_paper_ids: ["649def34f8be52c8b66281af98ae884c09aef38b"]`

- ✅ 返回推荐论文
- ✅ 推荐结果避开了 Semantic Scholar 相关主题
- ✅ 聚焦于 Transformer 和 NMT 相关论文

**关键发现**:
- 推荐算法能够理解论文主题并提供相关推荐
- 负向种子有效地引导推荐方向
- 推荐论文质量高，主题相关性强

---

### 6. relevanceSearch 工具 ✅

**测试内容**: 搜索 "transformer attention mechanism"，应用过滤条件

**搜索参数**:
- `query`: "transformer attention mechanism"
- `year`: "2023-2024"
- `min_citation_count`: 100
- `limit`: 5

**结果**: 成功

**验证项**:
- ✅ 返回排序后的搜索结果
- ✅ 所有结果包含 title 和 abstract
- ✅ 年份过滤生效（2023-2024）
- ✅ 引用数过滤生效（≥100）
- ✅ 返回 `total` 字段（927 篇符合条件的论文）

**搜索结果示例**:
```json
{
  "total": 927,
  "offset": 0,
  "next": 5,
  "data": [
    {
      "paperId": "9624170045b3c659a524f3a2461c49399c53a6ea",
      "title": "Transformer-based multivariate time series anomaly detection using inter-variable attention mechanism",
      "year": 2024,
      "citationCount": 119,
      "venue": "Knowledge-Based Systems"
    },
    {
      "paperId": "dd9c9217354583dd2e0d5ea09b544673c5c9c89d",
      "title": "DenseSPH-YOLOv5: An automated damage detection model...",
      "year": 2023,
      "citationCount": 233
    },
    ...
  ]
}
```

**关键发现**:
- 搜索结果高度相关
- 过滤条件准确应用
- 返回了 927 篇符合条件的论文

---

### 7. author 工具 ✅

**测试内容**: 查询 Ashish Vaswani（Attention Is All You Need 第一作者）的信息

**输入**: `author_id: "40348417"`

**结果**: 成功

**验证项**:
- ✅ 返回作者姓名
- ✅ 返回 h-index
- ✅ 返回论文数量（paperCount）
- ✅ 返回引用数量（citationCount）
- ✅ 返回外部 ID（DBLP）

**作者信息**:
```json
{
  "authorId": "40348417",
  "name": "Ashish Vaswani",
  "externalIds": {
    "DBLP": ["Ashish Vaswani"]
  },
  "paperCount": 55,
  "citationCount": 190103,
  "hIndex": 26
}
```

**关键发现**:
- Ashish Vaswani 的 h-index 为 26
- 总引用数达到 190,103
- 发表了 55 篇论文

---

### 8. authorPapers 工具 ✅

**测试内容**: 获取 Ashish Vaswani 的论文列表（前 5 篇）

**输入**: 
- `author_id: "40348417"`
- `limit: 5`
- `offset: 0`

**结果**: 成功

**验证项**:
- ✅ 返回论文列表
- ✅ 每篇论文包含完整元数据
- ✅ 分页功能正常
- ✅ 返回 `next` 字段

**论文列表示例**:
```json
{
  "offset": 0,
  "next": 5,
  "data": [
    {
      "paperId": "8f456149eb9285130aed5486389b0da9d06bc377",
      "title": "A Dataset for Metaphor Detection in Early Medieval Hebrew Poetry",
      "year": 2024,
      "citationCount": 1
    },
    {
      "paperId": "fb6ecf67c275fe775a12ad4ddf2c8dc7cfad1348",
      "title": "Unifying Grokking and Double Descent",
      "year": 2023,
      "citationCount": 57
    },
    ...
  ]
}
```

**关键发现**:
- 成功获取作者的最新论文
- 论文涵盖多个研究方向
- 分页功能正常工作

---

## 边缘情况测试

### 测试 1: 不存在的论文 ID ✅

**输入**: `paper_id: "ARXIV:0000.00000"`

**结果**: 
```json
{
  "error": "not_found",
  "status": 404,
  "message": "Not found: https://api.semanticscholar.org/graph/v1/paper/ARXIV:0000.00000?fields=..."
}
```

**验证**: ✅ 正确返回 404 错误，包含清晰的错误信息

---

### 测试 2: paperBatch 中的无效 ID ✅

**输入**: `["ARXIV:1706.03762", "ARXIV:9999.99999", "ARXIV:2312.00752"]`

**结果**: 
```json
[
  { "paperId": "204e3073870fae3d05bcbc2f6a8e263d9b72e776", "title": "Attention is All you Need", ... },
  null,
  { "paperId": "7bbc7595196a0606a07506c4fb1473e5e87f6082", "title": "Mamba: ...", ... }
]
```

**验证**: ✅ 无效 ID 返回 `null`，不影响其他有效结果

---

## ID 格式兼容性测试

测试了以下 ID 格式，全部成功：

| ID 格式 | 示例 | 状态 |
|---------|------|------|
| ARXIV 前缀 | `ARXIV:1706.03762` | ✅ |
| 裸 arXiv ID | `2005.14165` | ✅ |
| DOI 前缀 | `DOI:10.48550/arXiv.2005.14165` | ✅ |
| DOI (期刊) | `DOI:10.1038/s41586-021-03819-2` | ✅ |
| S2 十六进制 ID | `649def34f8be52c8b66281af98ae884c09aef38b` | ✅ |

---

## 性能观察

- **响应速度**: 所有 API 调用响应迅速（< 2 秒）
- **API 限流**: 使用 API Key 后无限流问题
- **数据完整性**: 所有返回数据结构完整，无缺失字段
- **错误处理**: 错误信息清晰，便于调试

---

## 总结

### 测试统计

- **测试工具数**: 8/8
- **通过率**: 100%
- **测试论文数**: 10
- **边缘情况测试**: 2/2 通过
- **ID 格式测试**: 5/5 通过

### 关键成果

1. ✅ **所有 8 个 MCP 工具功能正常**
2. ✅ **支持多种论文 ID 格式**
3. ✅ **分页功能正常工作**
4. ✅ **错误处理机制完善**
5. ✅ **推荐算法准确有效**
6. ✅ **搜索过滤功能完整**
7. ✅ **批量操作支持良好**
8. ✅ **作者信息查询完整**

### 发现的问题

**无** - 所有测试均通过，未发现功能性问题。

### 建议

1. **文档完善**: 已发布的 README 清晰易懂
2. **示例查询**: README 中的示例查询实用
3. **API Key**: 建议用户配置 API Key 以获得更高的速率限制
4. **npx 使用**: 通过 npx 运行包非常方便，无需全局安装

---

## 测试环境信息

- **包名**: `@noesynth/semantic-scholar-mcp`
- **版本**: `1.0.0`
- **npm Registry**: https://www.npmjs.com/package/@noesynth/semantic-scholar-mcp
- **安装方式**: `npx @noesynth/semantic-scholar-mcp`
- **MCP 配置**: stdio transport via npx
- **API Key**: 已配置（s2k-***）
- **测试日期**: 2026-05-12
- **测试人员**: Claude Opus 4.6

---

## 结论

**@noesynth/semantic-scholar-mcp@1.0.0 已成功通过所有集成测试，可以投入生产使用。**

所有 8 个 MCP 工具均按预期工作，支持多种论文 ID 格式，错误处理完善，性能表现良好。该包为 AI 助手提供了强大的学术文献检索能力，适用于文献综述、引用分析和研究发现等场景。
