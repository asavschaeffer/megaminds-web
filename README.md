# Megaminds Web

AI evaluation, tools, and consulting.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
app/
├── (pages)           # Route pages
├── layout.tsx        # Root layout with nav
└── page.tsx          # Homepage

components/
├── nav/              # Navigation components
├── ui/               # Reusable UI components
└── ...               # Feature-specific components

content/
├── eval/models/      # Model report MDX files
├── learn/
│   ├── articles/     # Article MDX files
│   └── curriculum/   # Curriculum MDX files
└── prompts/          # Prompt MDX files by category

lib/
├── content.ts        # Content fetching utilities
└── utils.ts          # General utilities
```

## Content

Content is stored as MDX files in the `content/` directory. Each content type has frontmatter metadata.

### Prompts

```yaml
---
title: "Prompt Title"
description: "What this prompt does"
category: finance
models: ["claude", "chatgpt"]
difficulty: intermediate
successRate: 92
date: "2026-01-15"
submitter: megaminds
---
```

### Articles

```yaml
---
title: "Article Title"
description: "Article description"
date: "2026-01-21"
readTime: "15 min"
tags: ["tag1", "tag2"]
---
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX for content
- Supabase (for submissions - coming soon)
