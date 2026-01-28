'use client'

import { Calculator, MessageCircle } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useState, useRef } from 'react'
import type { PricingCalculatorProps } from '@/lib/models/types'

export const PricingCalculator = ({ apiData, chatData }: PricingCalculatorProps) => {
  const [activeTab, setActiveTab] = useState<'api' | 'chat'>('api')
  const [tokens, setTokens] = useState(1)
  const [msgsPerDay, setMsgsPerDay] = useState(5)
  const apiTabRef = useRef<HTMLButtonElement>(null)
  const chatTabRef = useRef<HTMLButtonElement>(null)

  const baseCost = (apiData.baseModel.input + apiData.baseModel.output) * tokens

  const getChatStatus = (provider: (typeof chatData)[0], msgs: number) => {
    for (const tier of provider.tiers) {
      if (tier.maxMsgs >= 999) {
        const color = tier.price === '$0' ? ('green' as const) : ('blue' as const)
        return { label: 'Unlimited', color, cost: tier.price }
      }
      if (msgs <= tier.maxMsgs) {
        const color = tier.price === '$0' ? ('green' as const) : ('blue' as const)
        return { label: tier.label, color, cost: tier.price }
      }
    }
    return { label: 'Limit reached', color: 'red' as const, cost: '—' }
  }

  const handleTabKeyDown = (e: KeyboardEvent, currentTab: 'api' | 'chat') => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const newTab = currentTab === 'api' ? 'chat' : 'api'
      setActiveTab(newTab)
      if (newTab === 'api') {
        apiTabRef.current?.focus()
      } else {
        chatTabRef.current?.focus()
      }
    }
  }

  const tabClass = (active: boolean) =>
    `flex-1 px-4 py-3 text-sm font-medium transition-colors ${active
      ? 'text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100'
      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
    }`

  const statusColors = {
    green:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  }

  const statusDot = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-400',
  }

  const apiTabId = 'pricing-tab-api'
  const chatTabId = 'pricing-tab-chat'
  const apiPanelId = 'pricing-panel-api'
  const chatPanelId = 'pricing-panel-chat'

  return (
    <div className="not-prose">
      <figure className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8">
      <div
        className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
        role="tablist"
        aria-label="Pricing comparison tabs"
      >
        <button
          ref={apiTabRef}
          id={apiTabId}
          role="tab"
          tabIndex={activeTab === 'api' ? 0 : -1}
          aria-selected={activeTab === 'api'}
          aria-controls={apiPanelId}
          onClick={() => setActiveTab('api')}
          onKeyDown={(e) => handleTabKeyDown(e, 'api')}
          className={`${tabClass(activeTab === 'api')} cursor-pointer`}
          type="button"
        >
          <span className="flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            <abbr title="Application Programming Interface">API</abbr> Costs
          </span>
        </button>
        <button
          ref={chatTabRef}
          id={chatTabId}
          role="tab"
          tabIndex={activeTab === 'chat' ? 0 : -1}
          aria-selected={activeTab === 'chat'}
          aria-controls={chatPanelId}
          onClick={() => setActiveTab('chat')}
          onKeyDown={(e) => handleTabKeyDown(e, 'chat')}
          className={`${tabClass(activeTab === 'chat')} cursor-pointer`}
          type="button"
        >
          <span className="flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Chat Usage
          </span>
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'api' ? (
          <div id={apiPanelId} role="tabpanel" aria-labelledby={apiTabId} aria-live="polite">
            <label htmlFor="token-slider" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              Monthly volume:{' '}
              <output className="text-neutral-900 dark:text-neutral-100 font-bold">
                {tokens < 1 ? `${(tokens * 1000).toFixed(0)}K` : `${tokens}M`} tokens
              </output>
            </label>
            <input
              id="token-slider"
              type="range"
              min="0.1"
              max="50"
              step="0.1"
              value={tokens}
              onChange={(e) => setTokens(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-1 pointer-events-auto"
            />
            <div className="flex justify-between text-xs text-neutral-400 mb-6" aria-hidden="true">
              <span>100K</span>
              <span>50M</span>
            </div>

            <table className="w-full">
              <caption className="sr-only">API cost comparison by provider</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Savings</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {(() => {
                  // Combine base model and competitors, then sort by total cost
                  const allModels = [
                    { ...apiData.baseModel, isBase: true },
                    ...apiData.competitors.map((comp) => ({ ...comp, isBase: false })),
                  ]
                  
                  const sortedModels = allModels.sort((a, b) => {
                    const costA = (a.input + a.output) * tokens
                    const costB = (b.input + b.output) * tokens
                    return costA - costB
                  })

                  return sortedModels.map((model, idx) => {
                    const cost = (model.input + model.output) * tokens
                    const diffPercent = ((cost - baseCost) / cost) * 100
                    const isCheaper = diffPercent < 0
                    const absPercent = Math.abs(diffPercent).toFixed(0)
                    const isBaseModel = model.isBase

                    return (
                      <tr
                        key={idx}
                        className={`flex items-center justify-between p-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0 ${
                          isBaseModel
                            ? 'rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
                            : ''
                        }`}
                      >
                        <td
                          className={
                            isBaseModel
                              ? 'font-medium text-blue-900 dark:text-blue-100'
                              : 'text-neutral-600 dark:text-neutral-400'
                          }
                        >
                          {model.name}
                        </td>
                        <td className="text-left">
                          <output
                            className={`tabular-nums ${
                              isBaseModel
                                ? 'font-bold text-blue-700 dark:text-blue-300'
                                : 'font-medium text-neutral-900 dark:text-neutral-100'
                            }`}
                          >
                            ${cost.toFixed(2)}
                          </output>
                          {!isBaseModel && (
                            <>
                              {isCheaper ? (
                                <span className="ml-3 text-[10px] text-green-600 dark:text-green-400">-{absPercent}% less</span>
                              ) : (
                                <span className="ml-3 text-xs text-red-600 dark:text-red-400">+{absPercent}% more</span>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
        ) : (
          <div id={chatPanelId} role="tabpanel" aria-labelledby={chatTabId} aria-live="polite">
            <label htmlFor="msgs-slider" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              Messages per day:{' '}
              <output className="text-neutral-900 dark:text-neutral-100 font-bold">{msgsPerDay}</output>
            </label>
            <input
              id="msgs-slider"
              type="range"
              min="1"
              max="200"
              step="1"
              value={msgsPerDay}
              onChange={(e) => setMsgsPerDay(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-1 pointer-events-auto"
            />
            <div className="flex justify-between text-xs text-neutral-400 mb-6" aria-hidden="true">
              <span>1</span>
              <span>200</span>
            </div>

            <ul className="space-y-3 list-none" role="list">
              {chatData.map((provider, idx) => {
                const status = getChatStatus(provider, msgsPerDay)
                return (
                  <li
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-300 ${statusColors[status.color]}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${statusDot[status.color]} transition-colors duration-300`} aria-hidden="true" />
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{status.label}</span>
                      <output className="text-sm font-medium tabular-nums">{status.cost}</output>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              <small>Approximate daily limits. Free tiers may vary by region and model selection.</small>
            </p>
          </div>
        )}
        </div>
        <figcaption className="sr-only">Interactive pricing calculator comparing API costs and chat usage limits across providers</figcaption>
      </figure>
    </div>
  )
}

export default PricingCalculator
