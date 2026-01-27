import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ModelIcon } from '@/components/ui/model-icon'

interface Model {
  slug: string
  name: string
  versions?: string
  tagline: string
  strengths: string[]
  assets?: Array<{
    label: string
    src: string
    className?: string
  }>
}

export default function ModelsPageContent({ models }: { models: Model[] }) {
  const xaiWatermarkClassName =
    'pointer-events-none absolute -right-6 top-1/2 h-[240%] w-auto -translate-y-1/2 translate-x-[18%] rotate-[9deg] opacity-[0.12]'
  const watermarkOverrides: Record<string, string> = {
    claude: '/icons/claude/claude-mono.svg',
    google: '/icons/google/google-mono.svg',
    llama: '/icons/meta/meta-color.svg',
    grok: '/icons/xai/xai-mono.svg',
    copilot: '/icons/microsoft/microsoft-color.svg',
    qwen: '/icons/alibaba/alibaba-color.svg',
  }

  return (
    <div className="mt-12 flex flex-col gap-6">
      {models.map((model) => {
        const avatarAsset = model.assets?.find((asset) => asset.label === 'Avatar (circle treatment)')
        const textLogo = model.assets?.find((asset) => asset.label === 'Text logo')
        const watermark =
          model.assets?.find((asset) => asset.label === 'Combine (color)') ??
          model.assets?.find((asset) => asset.label === 'Combine (mono)') ??
          avatarAsset ??
          model.assets?.find((asset) => asset.label === 'Logo (color)') ??
          model.assets?.find((asset) => asset.label === 'Logo (mono)')
        const watermarkOverride = watermarkOverrides[model.slug]

        if (model.slug === 'llama') {
          return (
            <Link key={model.slug} href={`/eval/models/${model.slug}`} className="group">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
                <img
                  src={watermarkOverride}
                  alt=""
                  aria-hidden="true"
                  className={xaiWatermarkClassName}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-700">
                          {model.name}
                        </h2>
                        <img
                          src="/icons/meta-ai/meta-ai-text.svg"
                          alt="Meta AI"
                          className="h-5 w-auto"
                        />
                      </div>
                    </div>
                    <div className="ml-auto text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{model.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          )
        }

        if (model.slug === 'copilot') {
          return (
            <Link key={model.slug} href={`/eval/models/${model.slug}`} className="group">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
                <img
                  src={watermarkOverride}
                  alt=""
                  aria-hidden="true"
                  className={xaiWatermarkClassName}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
                      {avatarAsset ? (
                        <img
                          src={avatarAsset.src}
                          alt={`${model.name} avatar`}
                          className="h-8 w-8"
                        />
                      ) : (
                        <ModelIcon name={model.name} size={28} />
                      )}
                    </div>
                    <div className="min-w-0">
                      {textLogo ? (
                        <div className="flex flex-nowrap items-center gap-2">
                          <img
                            src={textLogo.src}
                            alt={`${model.name} logo`}
                            className="h-6 w-auto max-w-[180px]"
                          />
                          {model.versions ? (
                            <span className="whitespace-nowrap text-lg font-semibold text-slate-900 tracking-tight">
                              {model.versions}
                            </span>
                          ) : null}
                          <span className="sr-only">{model.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-nowrap items-center gap-2">
                          <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-700">
                            {model.name}
                          </h2>
                          {model.versions ? (
                            <span className="whitespace-nowrap text-lg font-semibold text-slate-900 tracking-tight">
                              {model.versions}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="ml-auto text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{model.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          )
        }

        return (
          <Link key={model.slug} href={`/eval/models/${model.slug}`} className="group">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
              {watermarkOverride ? (
                <>
                  <img
                    src={watermarkOverride}
                    alt=""
                    aria-hidden="true"
                    className={xaiWatermarkClassName}
                  />
                </>
              ) : watermark ? (
                <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 sm:block">
                  <img
                    src={watermark.src}
                    alt=""
                    className="h-[220%] w-auto translate-x-[18%] opacity-[0.14]"
                    aria-hidden="true"
                  />
                </div>
              ) : null}
              {(watermarkOverride || watermark) && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
              )}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
                    {avatarAsset ? (
                      <img
                        src={avatarAsset.src}
                        alt={`${model.name} avatar`}
                        className="h-8 w-8"
                      />
                    ) : (
                      <ModelIcon name={model.name} size={28} />
                    )}
                  </div>
                  <div className="min-w-0">
                    {textLogo ? (
                      <div className="flex flex-nowrap items-center gap-2">
                        <img
                          src={textLogo.src}
                          alt={`${model.name} logo`}
                          className="h-6 w-auto max-w-[180px]"
                        />
                        {model.versions ? (
                          <span className="whitespace-nowrap text-lg font-semibold text-slate-900 tracking-tight">
                            {model.versions}
                          </span>
                        ) : null}
                        <span className="sr-only">{model.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-nowrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-700">
                          {model.name}
                        </h2>
                        {model.versions ? (
                          <span className="whitespace-nowrap text-lg font-semibold text-slate-900 tracking-tight">
                            {model.versions}
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="ml-auto text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-sm text-slate-600">{model.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {model.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
