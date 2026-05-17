const path = require('path')
const { spawnSync } = require('child_process')

const nextBinary = process.platform === 'win32' ? 'next.cmd' : 'next'
const nextPath = path.join(process.cwd(), 'node_modules', '.bin', nextBinary)
const spawnOptions = { stdio: 'inherit', shell: process.platform === 'win32' }

const lintResult = spawnSync(nextPath, ['lint'], spawnOptions)
if (lintResult.status !== 0) {
  if (lintResult.error) {
    console.error(lintResult.error)
  }
  process.exit(lintResult.status ?? 1)
}

const checkPath = path.join(process.cwd(), 'scripts', 'check-abbr-usage.js')
const checkResult = spawnSync(process.execPath, [checkPath], { stdio: 'inherit' })
if (checkResult.error) {
  console.error(checkResult.error)
}
process.exit(checkResult.status ?? 0)
