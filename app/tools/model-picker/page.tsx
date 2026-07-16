import ModelPickerClient from './ModelPickerClient'
import { getAllModels } from '@/lib/models/registry'
import { buildPickerModel } from '@/lib/models/picker'

export const metadata = {
  title: 'Model Picker | Megaminds',
  description: 'Answer a few questions about your task and get a model recommendation from the Megaminds model registry.',
}

export default function ModelPickerPage() {
  const modelProfiles = getAllModels().map(buildPickerModel)

  return <ModelPickerClient modelProfiles={modelProfiles} />
}
