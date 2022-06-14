import path from 'path'
import fs from 'fs'

export default async function listDirectory (directory:string) {
  const files = fs.readdirSync(path.resolve(directory))

  const list: Array<string> = []

  files.forEach(e => {
    list.push(e)
  })

  return list
}
