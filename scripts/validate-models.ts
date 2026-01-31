
import { readdir } from 'fs/promises'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { validateModelProfileStrict } from '../lib/models/schemas'
import type { ModelProfile } from '../lib/models/types'

async function validateModels() {
    const modelsDir = join(process.cwd(), 'content/eval/models')
    const files = await readdir(modelsDir)

    let hasErrors = false

    console.log(`🔍 Validating models in ${modelsDir}...\n`)

    for (const file of files) {
        if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue
        if (file === 'template.tsx') continue

        try {
            // Dynamic import of the module
            const modulePath = join(modelsDir, file)
            const moduleUrl = pathToFileURL(modulePath).href
            const module = await import(moduleUrl)

            // Find the exported model profile
            // Assumption: The model profile is exported as a named export
            const exports = Object.values(module)
            const modelProfile = exports.find((exp: any) => exp?.slug && exp?.meta) as ModelProfile | undefined

            if (!modelProfile) {
                console.warn(`⚠️  ${file}: No ModelProfile found in exports.`)
                continue
            }

            try {
                validateModelProfileStrict(modelProfile)
                console.log(`✅ ${file}: Valid`)
            } catch (error: any) {
                hasErrors = true
                console.error(`❌ ${file}: Validation failed`)
                if (error.issues) {
                    console.error(JSON.stringify(error.issues, null, 2))
                } else {
                    console.error(error)
                }
            }

        } catch (err) {
            console.error(`❌ ${file}: Failed to load module`, err)
            hasErrors = true
        }
    }

    console.log('\n----------------------------------------')
    if (hasErrors) {
        console.error('🛑 Validation failed with errors.')
        process.exit(1)
    } else {
        console.log('✨ All models validated successfully!')
        process.exit(0)
    }
}

validateModels()
