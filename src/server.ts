
import 'dotenv/config'

import compositeBanner from './compositeBanner'
import getProfileImage from './getProfileImage'
import verifyFollowers from './verifyFollowers'
import deleteAndCreateDirectory from './deleteAndCreateDirectory'

import express from 'express'

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

init().then(() => {
  setInterval(() => {
    init()
  }
  , 40000)
})

/* NAO TEM NADA DE IMPORTANTE, É SO POR CAUSA DO HEROKU */

const app = express()

const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Coloquei o express pra ver se o Heroku para de reclamar e me deixa ser feliz')
})

app.listen(port, () => {
  console.log(`listening on port ${port} ...... `)
})
