
import 'dotenv/config'

import compositeBanner from './compositeBanner'
import getProfileImage from './getProfileImage'
import verifyFollowers from './verifyFollowers'
import deleteAndCreateDirectory from './deleteAndCreateDirectory'

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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
    await deleteAndCreateDirectory('.', 'profile-images'),
    await deleteAndCreateDirectory('.', 'banner-output'),
    await updateBanner(),
    await sleep(3000), // Pra carregar as fotos
    await compositeBanner()
  ]).then(() => {
    console.log('Done')
  })
}

// init()

setInterval(() => {
  init()
}
, 60000)
