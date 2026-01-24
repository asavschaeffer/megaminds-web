'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Send, CheckCircle } from 'lucide-react'

type FormData = {
  // Basic info
  name: string
  email: string
  type: 'personal' | 'business' | ''

  // Work context
  role: string
  industry: string
  teamSize: string

  // Current AI usage
  currentTools: string[]
  experienceLevel: string

  // Goals
  primaryGoal: string
  painPoints: string
  timeline: string

  // Additional
  additionalContext: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  type: '',
  role: '',
  industry: '',
  teamSize: '',
  currentTools: [],
  experienceLevel: '',
  primaryGoal: '',
  painPoints: '',
  timeline: '',
  additionalContext: '',
}

const steps = [
  { id: 'basics', title: 'Basics' },
  { id: 'context', title: 'Work Context' },
  { id: 'experience', title: 'AI Experience' },
  { id: 'goals', title: 'Goals' },
  { id: 'review', title: 'Review' },
]

const aiTools = ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Midjourney', 'Other', 'None']

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // TODO: Submit to Supabase or API
    console.log('Submitting:', formData)
    setSubmitted(true)
  }

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter(t => t !== tool)
        : [...prev.currentTools, tool]
    }))
  }

  if (submitted) {
    return (
      <div className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Thanks for reaching out!</h1>
          <p className="mt-4 text-gray-600">
            We've received your intake form and will review it carefully.
            Expect to hear back from us within 2 business days with next steps.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">Consulting Intake</h1>
        <p className="mt-2 text-gray-600">
          Help us understand your needs so we can provide tailored recommendations.
        </p>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${index < currentStep ? 'bg-gray-900' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">{steps[currentStep].title}</p>

        {/* Form Steps */}
        <div className="mt-8">
          {currentStep === 0 && (
            <StepBasics formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 1 && (
            <StepContext formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 2 && (
            <StepExperience formData={formData} setFormData={setFormData} onToolToggle={handleToolToggle} />
          )}
          {currentStep === 3 && (
            <StepGoals formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 4 && (
            <StepReview formData={formData} />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-1 text-sm ${
              currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Submit
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function StepBasics({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">I'm looking for...</label>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'personal' })}
            className={`p-4 border rounded-lg text-left transition-colors ${
              formData.type === 'personal' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-gray-900">Personal consulting</div>
            <div className="text-sm text-gray-500 mt-1">1:1 guidance for my own workflow</div>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'business' })}
            className={`p-4 border rounded-lg text-left transition-colors ${
              formData.type === 'business' ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-gray-900">Business consulting</div>
            <div className="text-sm text-gray-500 mt-1">Team training or organizational strategy</div>
          </button>
        </div>
      </div>
    </div>
  )
}

function StepContext({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900">What's your role?</label>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="e.g., Executive Coach, Software Engineer, Marketing Director"
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Industry</label>
        <input
          type="text"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          placeholder="e.g., Healthcare, Finance, Education, Tech"
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      {formData.type === 'business' && (
        <div>
          <label className="block text-sm font-medium text-gray-900">Team size</label>
          <select
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">Select...</option>
            <option value="1-5">1-5 people</option>
            <option value="6-20">6-20 people</option>
            <option value="21-50">21-50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>
      )}
    </div>
  )
}

function StepExperience({ formData, setFormData, onToolToggle }: { formData: FormData, setFormData: (data: FormData) => void, onToolToggle: (tool: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900">What AI tools do you currently use?</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {aiTools.map((tool) => (
            <button
              key={tool}
              type="button"
              onClick={() => onToolToggle(tool)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                formData.currentTools.includes(tool)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">How would you describe your AI experience?</label>
        <div className="mt-3 space-y-2">
          {['Beginner - just getting started', 'Intermediate - use AI regularly', 'Advanced - built workflows or integrations'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({ ...formData, experienceLevel: level })}
              className={`w-full p-3 border rounded-lg text-left text-sm transition-colors ${
                formData.experienceLevel === level ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepGoals({ formData, setFormData }: { formData: FormData, setFormData: (data: FormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900">What's your primary goal?</label>
        <textarea
          value={formData.primaryGoal}
          onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
          rows={3}
          placeholder="e.g., Save time on document processing, improve team productivity, learn to use AI effectively..."
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">What are your biggest pain points?</label>
        <textarea
          value={formData.painPoints}
          onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
          rows={3}
          placeholder="Where do you spend too much time? What feels tedious?"
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Timeline</label>
        <select
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">When do you want to start?</option>
          <option value="asap">As soon as possible</option>
          <option value="1-2 weeks">Within 1-2 weeks</option>
          <option value="1 month">Within a month</option>
          <option value="exploring">Just exploring options</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Anything else we should know?</label>
        <textarea
          value={formData.additionalContext}
          onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
          rows={3}
          placeholder="Optional - any other context that would help us understand your needs"
          className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  )
}

function StepReview({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">Please review your responses before submitting.</p>

      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <ReviewItem label="Name" value={formData.name} />
        <ReviewItem label="Email" value={formData.email} />
        <ReviewItem label="Type" value={formData.type === 'personal' ? 'Personal consulting' : 'Business consulting'} />
        <ReviewItem label="Role" value={formData.role} />
        <ReviewItem label="Industry" value={formData.industry} />
        {formData.teamSize && <ReviewItem label="Team size" value={formData.teamSize} />}
        <ReviewItem label="Current tools" value={formData.currentTools.join(', ') || 'None selected'} />
        <ReviewItem label="Experience" value={formData.experienceLevel} />
        <ReviewItem label="Primary goal" value={formData.primaryGoal} />
        <ReviewItem label="Pain points" value={formData.painPoints} />
        <ReviewItem label="Timeline" value={formData.timeline} />
        {formData.additionalContext && <ReviewItem label="Additional context" value={formData.additionalContext} />}
      </div>
    </div>
  )
}

function ReviewItem({ label, value }: { label: string, value: string }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-gray-900 mt-1">{value}</dd>
    </div>
  )
}
