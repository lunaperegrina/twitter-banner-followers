/* eslint-disable no-unused-vars */
import listDirectory from './listDirectory'
import fs from 'fs'
import path from 'path'

export default async function deleteDirectory (FatherDirectory: string, TargetDirectory: string) {
  console.log(0.1)

  const include = await (await listDirectory(FatherDirectory)).includes(TargetDirectory)

  include
    ? await fs.rmdirSync(path.resolve(TargetDirectory), { recursive: true })
    : console.log('Directory not found')

  await fs.mkdirSync(path.resolve(TargetDirectory))
  console.log(0.9)
}
