import Link from 'next/link'
import { HelpCircle } from 'lucide-react'

export const metadata = {
  title: 'Contact | Megaminds',
}

const faqItems = [
  {
    question: 'I need help choosing the right AI model for my task.',
    answer: 'Our [Model Picker](/tools/model-picker) tool is designed for just that. It helps you find the best model based on your specific needs.',
  },
  {
    question: 'I\'m interested in your consulting services.',
    answer: 'We\'d love to hear from you. Please fill out our [intake form](/consulting/intake), and we\'ll get back to you with a tailored proposal.',
  },
  {
    question: 'I have a great prompt I want to share.',
    answer: 'Excellent! You can contribute to our growing library by using our [prompt submission form](/community/submit).',
  },
  {
    question: 'I found a bug or have a feature request for the website.',
    answer: 'We appreciate your help improving the site. Please [open an issue on our GitHub repository](https://github.com/asavschaeffer/megaminds-web/issues).',
  },
  {
    question: 'How can I learn more about AI?',
    answer: 'We have a growing collection of educational resources. Check out our [Learn](/learn) section for articles, curriculum, and videos.',
  },
]

// A simple markdown to html converter for the answer
function Answer({ text }: { text: string }) {
  const html = text.replace(/\ \[([^\\\]]+)\]\(([^\\)]+)\)/g, '<a href="$2" class="font-medium text-gray-900 hover:underline">$1</a>')
  return <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: html }} />
}

export default function ContactPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Have a question or want to get in touch? Check our frequently asked questions below.
          If you can't find what you're looking for, feel free to reach out.
        </p>

        <div className="mt-12 space-y-8">
          {faqItems.map((item) => (
            <div key={item.question} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h2 className="font-medium text-gray-900">{item.question}</h2>
                <div className="mt-1">
                  <Answer text={item.answer} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900">Still have questions?</h2>
          <p className="mt-2 text-gray-600">
            If your question isn't answered above, you can email us at:
          </p>
          <a
            href="mailto:admin@megaminds.com"
            className="mt-4 inline-block text-lg font-medium text-gray-900 hover:underline"
          >
            admin@megaminds.com
          </a>
        </div>
      </div>
    </div>
  )
}
