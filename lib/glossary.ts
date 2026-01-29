export type GlossaryEntry = {
  title: string
  definition: string
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  TypeScript: {
    title: 'TypeScript',
    definition:
      'A typed layer on top of JavaScript that defines the shape of data with interfaces and types so mistakes are caught before runtime.',
  },
  LLM: {
    title: 'Large Language Models',
    definition:
      'Neural networks trained on massive text corpora to predict the next token; they power chat, code, and reasoning tasks.',
  },
  compile: {
    title: 'Compile',
    definition:
      'Translate source code into something the computer can run. The compiler rejects code with errors, like a strict spellchecker.',
  },
  MDX: {
    title: 'MDX',
    definition:
      'Markdown with JSX. It lets you write prose and embed interactive React components inline.',
  },
  CMS: {
    title: 'Content Management System',
    definition:
      'Software for creating and managing digital content, typically through a web UI (WordPress, Contentful, Sanity).',
  },
  JSX: {
    title: 'JSX',
    definition:
      'A syntax that lets you write HTML-like markup inside JavaScript. React components return JSX.',
  },
  API: {
    title: 'Application Programming Interface',
    definition: 'A programmatic interface that lets software send requests to a service or system.',
  },
  interface: {
    title: 'Interface',
    definition:
      'In TypeScript, a named blueprint for an object that lists its fields, types, and whether they are required.',
  },
  RL: {
    title: 'Reinforcement Learning',
    definition: 'Training via rewards and penalties to improve a model\'s behavior over time.',
  },
  SFT: {
    title: 'Supervised Fine-Tuning',
    definition: 'Training on labeled examples to shape a model\'s responses for a specific task.',
  },
  MoE: {
    title: 'Mixture of Experts',
    definition: '**Mixture of Experts**: An architecture that routes inputs to specialized sub-models to scale capacity efficiently.',
  },
  PPO: {
    title: 'Proximal Policy Optimization',
    definition: 'A stable RL algorithm that improves policies while limiting harmful updates.',
  },
  GRPO: {
    title: 'Group Relative Policy Optimization',
    definition: 'An RL method that compares outputs within groups to guide optimization.',
  },
  IDE: {
    title: 'Integrated Development Environment',
    definition: 'A code editor with built-in tooling like debugging, linting, and project management.',
  },
  CLI: {
    title: 'Command Line Interface',
    definition: 'A text-based interface for running commands and scripts in a terminal.',
  },
  JSON: {
    title: 'JavaScript Object Notation',
    definition: 'A lightweight data format commonly used for API payloads and configuration.',
  },
  'React component': {
    title: 'React component',
    definition:
      'A reusable UI building block in React, typically a function that returns JSX.',
  },
  framework: {
    title: 'Framework',
    definition:
      'A structured set of tools and conventions that shapes how an application is built.',
  },
  ontology: {
    title: 'Ontology',
    definition:
      'A formal way to define concepts and how they relate to each other in a system or domain.',
  },
  PDF: {
    title: 'Portable Document Format',
    definition: 'A file format used to present documents in a manner independent of application software, hardware, and operating systems.',
  },
  multimodality: {
    title: 'Multimodality',
    definition: 'A model architecture that processes multiple input types (text, images, audio, video) in a unified system.',
  },
  'agentic workflows': {
    title: 'Agentic Workflows',
    definition: 'AI processes where models autonomously plan, use tools, and execute multi-step tasks to achieve a goal.',
  },
  'context caching': {
    title: 'Context Caching',
    definition: 'A feature that reduces cost and latency by "remembering" large amounts of data between API calls.',
  },

}

export type GlossaryTerm = keyof typeof GLOSSARY

export const getGlossary = (term: GlossaryTerm) => GLOSSARY[term]
