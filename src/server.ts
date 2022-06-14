import { TwitterApi } from 'twitter-api-v2'

import 'dotenv/config'
import sharp from 'sharp'
import axios from 'axios'

import fs from 'fs'

const path = require('path')

const client = new TwitterApi({
  appKey: process.env.API_KEY as string,
  appSecret: process.env.API_KEY_SECRET as string,
  accessToken: process.env.ACCESS_TOKEN as string,
  accessSecret: process.env.ACCESS_TOKEN_SECRET as string
})

const appOnlyClient = new TwitterApi(process.env.BEARER_TOKEN as string)

async function getFollowers () {
  const followers = await appOnlyClient.v2.followers(process.env.USER_ID as string, { asPaginator: false, max_results: 4 })
  console.log(followers)

  followers.data.forEach(e => {
    console.log(e.id)
    getProfileImage(e.id)
  })
}

async function getProfileImage (userId: string) {
  const profileData = await appOnlyClient.v2.user(userId, { 'user.fields': 'profile_image_url' })
  const profileImageUrl = profileData.data.profile_image_url?.replace('_normal', '_bigger')

  const input = (await axios({ url: profileImageUrl as string, responseType: 'arraybuffer' })).data as Buffer

  const width = 400
  const r = width / 2
  const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`)

  sharp(input)
    .resize(width, width)
    .composite([{
      input: circleShape,
      blend: 'dest-in'
    }])
    .png()
    .toFile((path.resolve('profileImages' + `/${profileData.data.username}.jpg`)), (err, info) => err
      ? console.error(err.message)
      : console.log(info)
    )

  // fs.writeFileSync(path.resolve('profileImages' + `/${profileData.data.username}.jpg`), input)
}

async function listProfileImages () {
  const files = fs.readdirSync(path.resolve('profileImages'))

  const list: Array<string> = []

  files.forEach(e => {
    list.push(e)
  })

  return list
}

function getPosition (i: number): { topValue: number, leftValue: number } {
  const targetImage = i

  switch (targetImage) {
    case 0:
      return { topValue: 135, leftValue: 1184 }
    case 1:
      return { topValue: 190, leftValue: 1338 }
    case 2:
      return { topValue: 285, leftValue: 1184 }
    case 3:
      return { topValue: 345, leftValue: 1338 }
  }
}

async function compositeBanner () {
  const list = await listProfileImages()

  for (let i = 0; i < list.length; i++) {
    console.log(list[i])

    const inputSharp = await fs.readFileSync(path.resolve(`profileImages/${list[i]}`))

    const { topValue, leftValue } = getPosition(i)

    let imputConposite

    if (i === 0) {
      imputConposite = await fs.readFileSync(path.resolve('src/banner-base-2.png'))
    } else {
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
    } catch (e) {
      console.log(e)
    }
  }
}

async function changeProfileBanner (file: string) {
  console.log('ENTROU')

  await client.v1.updateAccountProfileBanner(file)
}

async function updateBanner () {
  getFollowers()
  compositeBanner()
  changeProfileBanner(path.resolve('banner-output/test_3.png'))
}

setInterval(() => {
  updateBanner()
}
, 1000 * 60)

// TODO: RETAFORA ISSO PELO AMOR DE DEUS PEDRO TU N TEM VERGONHA NA CARA N???????????
