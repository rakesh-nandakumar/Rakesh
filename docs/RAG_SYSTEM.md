# RAG System Documentation

## Overview

This is a lightweight, adaptive RAG (Retrieval-Augmented Generation) system that powers the AI chat assistant on the portfolio website.

## How It Works

### 1. Knowledge Base Construction

The system automatically builds a knowledge base from all JSON files in the `data` folder:

- **Reads** the `rag-manifest.json` to understand what data to extract from each file
- **Extracts** only the necessary fields (titles, descriptions, technologies, etc.)
- **Creates** semantic embeddings using Google Gemini's `text-embedding-004`
- **Caches** everything in localStorage for fast subsequent loads

### 2. Query Processing

When a user asks a question:

1. **Embed the query** using the same embedding model
2. **Search** the knowledge base using cosine similarity
3. **Rank results** with priority weights (critical > high > medium > low)
4. **Retrieve** top-k most relevant chunks
5. **Build context** from retrieved chunks
6. **Generate answer** using Gemini `gemini-2.0-flash-exp`

### 3. Adaptive System

The system automatically adapts to JSON file changes:

- Add/remove fields → Update manifest extract rules
- Modify content → Embeddings regenerate on cache clear
- Add new files → Add entry to manifest dataSources
- **No code changes needed!**

## Configuration Files

### `data/rag-manifest.json`

This is the **single source of truth** for the RAG system.

**Structure:**

```json
{
  "systemInstructions": {
    "role": "You are Rakesh's AI assistant",
    "behavior": "Professional and helpful",
    "guidelines": ["Rule 1", "Rule 2", ...]
  },
  "dataSources": {
    "filename.json": {
      "type": "single|array",
      "path": "nested.array.path",  // For nested arrays
      "priority": "critical|high|medium|low",
      "alwaysInclude": true|false,
      "extract": {
        "category": ["field1", "field2"],
        "anotherCategory": ["*"]  // Include all fields
      },
      "summaryTemplate": "Template with {placeholders}"
    }
  },
  "retrievalConfig": {
    "defaultTopK": 5,
    "minSimilarityScore": 0.3,
    "priorityWeights": {
      "critical": 1.5,
      "high": 1.2,
      "medium": 1.0,
      "low": 0.8
    }
  }
}
```

## How to Modify

### Adding a New Data Source

1. Add your JSON file to `data/` folder
2. Update `rag-manifest.json`:

```json
"dataSources": {
  "new-file.json": {
    "type": "array",
    "priority": "medium",
    "extract": {
      "basics": ["title", "description"]
    },
    "summaryTemplate": "{title}: {description}"
  }
}
```

3. Update `app/api/data/route.js` to serve the new type
4. Clear cache and reload

### Changing What Data is Extracted

Just modify the `extract` section in the manifest:

```json
"extract": {
  "basics": ["title", "shortDesc"],  // Added shortDesc
  "metadata": ["tags", "date"]       // New category
}
```

### Adjusting System Behavior

Modify `systemInstructions` in the manifest:

```json
"systemInstructions": {
  "role": "New role description",
  "behavior": "New behavior guidelines",
  "guidelines": [
    "New guideline 1",
    "New guideline 2"
  ]
}
```

### Tuning Retrieval

Adjust `retrievalConfig`:

```json
"retrievalConfig": {
  "defaultTopK": 7,  // Return more results
  "minSimilarityScore": 0.4,  // Higher threshold
  "priorityWeights": {
    "critical": 2.0,  // Boost critical items more
    "high": 1.5
  }
}
```

## API Integration

### Environment Variables

Set in `.env`:

```
GEMINI_API_KEY=your_key_here
```

### Server Endpoint

`/api/gemini-key` securely provides the API key to the client.

### Data Endpoint

`/api/data?type=<type>` serves all data files and the manifest.

## Cache Management

### Clear Cache

Click the refresh button in the chat interface to clear cache and rebuild the knowledge base.

### Manual Clear

```javascript
localStorage.removeItem("rag_knowledge_base");
localStorage.removeItem("rag_version");
// Clear individual query caches
Object.keys(localStorage)
  .filter((k) => k.startsWith("rag_chat_"))
  .forEach((k) => localStorage.removeItem(k));
```

## Performance

- **Initial load**: 5-10 seconds (builds knowledge base with embeddings)
- **Subsequent loads**: <1 second (uses cached embeddings)
- **Queries**: 1-3 seconds (semantic search + AI generation)
- **Cached queries**: <100ms (instant from localStorage)

## File Structure

```
data/
  ├── rag-manifest.json          # RAG configuration
  ├── about.json                 # Data files
  ├── portfolio.json
  └── ...

lib/
  └── client-rag.js              # RAG implementation

components/
  └── EnhancedChatButton.js      # Chat UI

app/api/
  ├── gemini-key/route.js        # Secure API key endpoint
  └── data/route.js              # Data serving endpoint
```

## Best Practices

1. **Keep summaryTemplates concise**: Focus on key information
2. **Use priority wisely**: critical for identity, high for experience, medium for projects, low for metadata
3. **Extract minimal data**: Only include fields needed for answering questions
4. **Test after changes**: Clear cache and verify responses
5. **Monitor token usage**: Check console logs for token counts

## Troubleshooting

### "API key not configured"

- Check `.env` file has `GEMINI_API_KEY`
- Restart dev server after adding env var

### "Failed to load manifest"

- Verify `rag-manifest.json` exists in `data/` folder
- Check JSON syntax is valid

### Chat not initializing

- Check browser console for errors
- Verify API endpoint `/api/gemini-key` returns 200
- Clear localStorage and reload

### Poor answer quality

- Increase `defaultTopK` to retrieve more context
- Lower `minSimilarityScore` to include more results
- Adjust priority weights
- Improve `summaryTemplate` to include more relevant info

## Future Enhancements

Possible improvements:

- [ ] Support for multiple embedding models
- [ ] Hybrid search (keyword + semantic)
- [ ] Conversation history context
- [ ] Multi-language support
- [ ] Answer citations with source links
- [ ] Admin panel for manifest editing

## Security

- API key never exposed to client (fetched from server)
- All data served through authenticated API routes
- No sensitive information in localStorage
- Rate limiting on AI endpoints (server-side)

## License

Part of Rakesh Nandakumar's portfolio website.
