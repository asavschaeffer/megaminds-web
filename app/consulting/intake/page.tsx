import { Suspense } from 'react'
import IntakeForm from './IntakeForm'

export default function IntakePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntakeForm />
    </Suspense>
  )
}