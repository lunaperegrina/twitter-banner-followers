
import 'dotenv/config'

import { client } from './services'

import compositeBanner from './compositeBanner'
import getProfileImage from './getProfileImage'
import verifyFollowers from './verifyFollowers'
import deleteDirectory from './deleteDirectory'

async function updateBanner () {
  console.log(1)

  await verifyFollowers().then(followers => {
    followers === []
      ? console.log('sem novos seguidores')
      : followers.forEach(async e => {
        console.log(e.id)
        await getProfileImage(e.id)
      })
  })

  console.log(1.9)
}

async function init () {
  Promise.all([
    await deleteDirectory('.', 'profile-images'),
    await updateBanner(),
    await compositeBanner()
    // await client.v1.updateAccountProfileBanner('banner-output/test_3.png')
  ]).then(() => {
    console.log('Done')
  })
}

init()

// setInterval(() => {
//   updateBanner()
// }
// , 60000)
