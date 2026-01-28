const path = require('path')
const { spawnSync } = require('child_process')

const nextBinary = process.platform === 'win32' ? 'next.cmd' : 'next'
const nextPath = path.join(process.cwd(), 'node_modules', '.bin', nextBinary)

const lintResult = spawnSync(nextPath, ['lint'], { stdio: 'inherit' })
if (lintResult.status !== 0) {
  process.exit(lintResult.status ?? 1)
}

const checkPath = path.join(process.cwd(), 'scripts', 'check-abbr-usage.js')
const checkResult = spawnSync(process.execPath, [checkPath], { stdio: 'inherit' })
process.exit(checkResult.status ?? 0)
