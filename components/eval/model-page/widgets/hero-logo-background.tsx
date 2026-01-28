import { ModelIconClient } from '@/components/ui/model-icon-client'

export const HeroLogoBackground = ({ name }: { name: string }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="opacity-[0.04] dark:opacity-[0.03]">
          <ModelIconClient name={name} size={700} className="w-[450px] h-[450px] md:w-[700px] md:h-[700px]" />
        </div>
      </div>
    </div>
  )
}

export default HeroLogoBackground
