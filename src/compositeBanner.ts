import listDirectory from './listDirectory'
import getPosition from './getPosition'

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export default async function compositeBanner () {
  console.log(2)

  const list = await listDirectory('./profile-images')
  console.log(list)

  for (let i = 0; i < list.length; i++) {
    const inputSharp = await fs.readFileSync(path.resolve(`profile-images/${list[i]}`))

    const { topValue, leftValue } = getPosition(i)

    let imputConposite

    console.log('antes')

    if (i === 0) {
      console.log('aqui')

      imputConposite = await fs.readFileSync(path.resolve('src/banner-base-2.png'))
    } else {
      console.log('acula')

      imputConposite = await fs.readFileSync(path.resolve(`banner-output/test_${i - 1}.png`))
    }

    const icon = await sharp(inputSharp)
      .resize(110, 110)
      .toBuffer()

    try {
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
}
