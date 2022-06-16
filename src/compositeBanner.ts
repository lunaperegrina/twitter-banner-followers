import listDirectory from './listDirectory'
import getPosition, { TLimit } from './getPosition'

import { client } from './services'

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export default async function compositeBanner () {
  console.log(2)

  const list = await listDirectory('./profile-images')
  console.log(list)
  console.log(list === [])

  return JSON.stringify(list) === JSON.stringify([])
    ? console.log('No images found')
    : compose(list)
}

async function compose (list: string[]) {
  for (let i:number = 0; i < list.length; i++) {
    try {
      console.log(2.1)

      const inputSharp = await fs.readFileSync(path.resolve(`profile-images/${list[i]}`))

      const { topValue, leftValue }:TLimit = getPosition(i)

      let imputConposite

      console.log(2.2)

      i === 0
        ? imputConposite = await fs.readFileSync(path.resolve('src/banner-base-2.png'))
        : imputConposite = await fs.readFileSync(path.resolve(`banner-output/test_${i - 1}.png`))

      const icon = await sharp(inputSharp)
        .resize(110, 110)
        .toBuffer()

      await sharp(imputConposite)
        .composite([
          {
            input: icon,
            top: topValue,
            left: leftValue

          }
        ])
        .toFile(`banner-output/test_${i}.png`)

      console.log(2.9)
    } catch (e) {
      console.log(e)
    }
  }
  await client.v1.updateAccountProfileBanner('banner-output/test_3.png')
}
