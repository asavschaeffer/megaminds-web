'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const categories = [
  'finance',
  'travel',
  'health',
  'business',
  'productivity',
  'education',
  'other',
]

const models = [
  'claude',
  'chatgpt',
  'gemini',
  'grok',
  'deepseek',
  'any',
]

export default function SubmitPromptPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    prompt: '',
    models: [] as string[],
    submitterName: '',
    submitterEmail: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to Supabase or API
    console.log('Submitting:', formData)
    setSubmitted(true)
  }

  const handleModelToggle = (model: string) => {
    setFormData(prev => ({
      ...prev,
      models: prev.models.includes(model)
        ? prev.models.filter(m => m !== model)
        : [...prev.models, model]
    }))
  }

  if (submitted) {
    return (
      <div className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Thanks for your submission!</h1>
          <p className="mt-4 text-gray-600">
            We'll review your prompt and add it to the library if it meets our quality standards.
            You'll receive an email notification when it's published.
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                title: '',
                category: '',
                description: '',
                prompt: '',
                models: [],
                submitterName: '',
                submitterEmail: '',
              })
            }}
            className="mt-8 text-sm text-gray-500 hover:text-gray-700"
          >
            Submit another prompt
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">Submit a Prompt</h1>
        <p className="mt-4 text-gray-600">
          Share your best prompts with the community. All submissions are reviewed
          before being added to the library.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
              Prompt Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Portfolio Risk Assessment"
              className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900">
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Short Description *
            </label>
            <input
              type="text"
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What does this prompt help with?"
              className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Prompt */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-900">
              The Prompt *
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Use [BRACKETS] for parts the user should customize.
            </p>
            <textarea
              id="prompt"
              required
              rows={8}
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              placeholder="Enter your prompt here..."
              className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono text-sm"
            />
          </div>

          {/* Models */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Works best with *
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Select all models you've tested this prompt with.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {models.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => handleModelToggle(model)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    formData.models.includes(model)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Submitter Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Your Name (optional)
              </label>
              <input
                type="text"
                id="name"
                value={formData.submitterName}
                onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                placeholder="How you want to be credited"
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.submitterEmail}
                onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                placeholder="For notification when published"
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Prompt
          </button>
        </form>
      </div>
    </div>
  )
}
