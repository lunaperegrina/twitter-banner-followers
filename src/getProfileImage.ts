import { appOnlyClient } from './services'
import axios from 'axios'
import sharp from 'sharp'
import path from 'path'

export default async function getProfileImage (userId: string) {
  const profileData = await appOnlyClient.v2.user(userId, { 'user.fields': 'profile_image_url' })
  const profileImageUrl = profileData.data.profile_image_url?.replace('_normal', '_bigger')

  const input = (await axios({ url: profileImageUrl as string, responseType: 'arraybuffer' })).data as Buffer

  await saveProfileImage(input, profileData.data.username)
}

async function saveProfileImage (input: Buffer, username: string) {
  const { width, circleShape } = circleParams()

  sharp(input)
    .resize(width, width)
    .composite([{
      input: circleShape,
      blend: 'dest-in'
    }])
    .png()
    .toFile((path.resolve('profile-images' + `/${username}.jpg`)), (err, info) => err
      ? console.error(err.message)
      : console.log('')
      // : console.log(info)
    )
}

function circleParams () {
  const width = 400
  const r = width / 2
  const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`)

  return { width, circleShape }
}
