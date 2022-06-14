import { TwitterApi } from 'twitter-api-v2'

import 'dotenv/config'
import sharp from 'sharp'
import axios from 'axios'
// import fetch from 'node-fetch'

import fs from 'fs'

const path = require('path')

// const client = new TwitterApi({
//   appKey: process.env.API_KEY as string,
//   appSecret: process.env.API_KEY_SECRET as string,
//   accessToken: process.env.ACCESS_TOKEN as string,
//   accessSecret: process.env.ACCESS_TOKEN_SECRET as string
// })

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

async function compositeBanner () {
  // const input = (await axios({ url: '../profileImages/iloveohowl.jpg', responseType: 'arraybuffer' })).data as Buffer

  const inputSharp = fs.readFileSync(path.resolve('profileImages/iloveohowl.jpg'))
  const imputConposite = fs.readFileSync(path.resolve('src/banner-base.png'))

  try {
    await sharp(imputConposite)
      .composite([
        {
          input: inputSharp,
          top: 50,
          left: 50
        }
      ])
      .toFile('sammy-underwater.png')
  } catch (e) {
    console.log(e)
  }
}

async function updateBanner () {
  // getFollowers()
  compositeBanner()
}

updateBanner()

// async function changeProfileBanner (file: string) {
//   console.log('ENTROU')

//   await client.v1.updateAccountProfileBanner(file)
// }

// changeProfileBanner(path.join(__dirname, 'banner-base.png'))
