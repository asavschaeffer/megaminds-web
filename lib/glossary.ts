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
  parameters: {
    title: 'Parameters',
    definition: 'The learned weights in a neural network that determine how it processes inputs; larger models have billions of parameters.',
  },
  tokens: {
    title: 'Tokens',
    definition: 'The basic units of text processing in LLMs, roughly equivalent to words or subwords; used to measure context length and API pricing.',
  },
  'pass@1': {
    title: 'Pass@1',
    definition: 'A coding benchmark metric measuring the percentage of problems solved correctly on the first attempt without retries.',
  },
  latency: {
    title: 'Latency',
    definition: 'The delay between sending a request and receiving a response; lower latency means faster model responses.',
  },
  VRAM: {
    title: 'Video RAM',
    definition: 'Memory on a GPU used to store model weights and activations during inference; high-end GPUs have 80-96 GB VRAM.',
  },
  GPU: {
    title: 'Graphics Processing Unit',
    definition: 'Specialized hardware designed for parallel computation, essential for training and running large AI models.',
  },
  MLA: {
    title: 'Multi-head Latent Attention',
    definition: 'An attention mechanism that reduces memory usage by compressing key-value representations in the latent space.',
  },
  RMSNorm: {
    title: 'Root Mean Square Normalization',
    definition: 'A normalization technique that stabilizes training by rescaling activations based on their root mean square.',
  },
  transformer: {
    title: 'Transformer',
    definition: 'The dominant neural network architecture for LLMs, using self-attention to process sequences in parallel.',
  },
  SLA: {
    title: 'Service Level Agreement',
    definition: 'A contract defining expected uptime, performance, and support guarantees for a cloud service.',
  },
  'gating network': {
    title: 'Gating Network',
    definition: 'A routing mechanism in MoE that decides which expert sub-models to activate for each input token.',
  },
  'feed-forward network': {
    title: 'Feed-Forward Network',
    definition: 'A neural network layer that processes data in one direction without loops, used as experts in MoE architectures.',
  },
  'expert specialization': {
    title: 'Expert Specialization',
    definition: 'The tendency of MoE experts to develop distinct skills for specific patterns or domains during training.',
  },
  'fine-tuning': {
    title: 'Fine-Tuning',
    definition: 'Training a pre-trained model on task-specific data to adapt it for particular use cases or behaviors.',
  },
  'pre-training': {
    title: 'Pre-Training',
    definition: 'The initial phase of training an LLM on massive text corpora to learn general language patterns.',
  },
  inference: {
    title: 'Inference',
    definition: 'Running a trained model to generate predictions or outputs; distinct from training which updates model weights.',
  },
  benchmarks: {
    title: 'Benchmarks',
    definition: 'Standardized tests that measure model performance on specific tasks like coding, math, or reasoning.',
  },
  TTS: {
    title: 'Test-Time Scaling',
    definition: 'A paradigm that shifts computational effort from pre-training to inference, enabling models to dynamically allocate resources based on task complexity.',
  },
  MFU: {
    title: 'Model FLOPs Utilization',
    definition: 'A metric measuring how efficiently hardware compute resources are used during training, with higher values indicating better optimization.',
  },
  SDK: {
    title: 'Software Development Kit',
    definition: 'A collection of tools, libraries, and documentation that developers use to build applications for a specific platform or API.',
  },
  RAG: {
    title: 'Retrieval-Augmented Generation',
    definition: 'A technique where models fetch relevant documents before answering to improve accuracy and reduce hallucinations.',
  },
  DPO: {
    title: 'Direct Preference Optimization',
    definition: 'A reinforcement learning technique that aligns model behavior by directly optimizing on human preference data without requiring a separate reward model.',
  },
  'code interpreter': {
    title: 'Code Interpreter',
    definition: 'A built-in capability allowing the model to write and execute code (usually Python) to solve computational problems or verify reasoning steps.',
  },

}

export type GlossaryTerm = keyof typeof GLOSSARY

export const getGlossary = (term: GlossaryTerm) => GLOSSARY[term]
