const fs = require('fs')
const path = require('path')
const glob = require('glob')

const files = glob.sync('app/learn/curriculum/**/*.mdx')

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  const original = content

  // 1. Replace <p className="...">...</p> with <div className="...">...</div>
  // Use a regex that lazily matches everything inside
  content = content.replace(/<p (className="[^"]+")>([\s\S]*?)<\/p>/g, '<div $1>$2</div>')

  // 2. Now replace all remaining plain <p> and </p> with empty string.
  content = content.replace(/<p>/g, '')
  content = content.replace(/<\/p>/g, '')

  // Write back if changed
  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8')
    console.log('Fixed', file)
  }
})
