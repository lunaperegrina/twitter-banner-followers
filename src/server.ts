
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

import { client } from './services'

import { getFollowers } from './getFollowers'
import compositeBanner from './compositeBanner'
import listDirectory from './listDirectory'
import getProfileImage from './getProfileImage'

let followersOld:any = []

fs.mkdirSync(path.resolve('profile-images'))

async function updateBanner () {
  const list = await listDirectory('.')
  const followers = await getFollowers()

  // const followersMock = [
  //   { id: '113366676', name: 'jao.tsx', username: 'nattefroost' },
  //   { id: '560181204', name: 'João Victor', username: 'joaovictor2928' },
  //   {
  //     id: '1394379462196793354',
  //     name: "yeager's girl 🎸",
  //     username: 'iloveohowl'
  //   },
  //   { id: '818244774', name: 'E', username: '__egs' }
  // ]

  console.log(followers)
  console.log(followersOld)

  if (JSON.stringify(followers) === JSON.stringify(followersOld)) {
    console.log('No new followers')
    return
  }

  followersOld = followers

  console.log(list)

  if (list.includes('profile-images')) {
    await fs.rm(path.resolve('profile-images'), { recursive: true }, (err) => {
      if (err) {
        console.error(err.message)
        return
      }
      console.log('File deleted successfully')

      fs.mkdirSync(path.resolve('profile-images'))

      followers.forEach(async e => {
        console.log(e.id)
        await getProfileImage(e.id)
      })

      console.log('bem antes')
    })
  }

  await compositeBanner() // TODO: Cria uma Promise pq nao ta funcionando quando alguem novo segue
  await client.v1.updateAccountProfileBanner('banner-output/test_3.png')
}

updateBanner()

setInterval(() => {
  updateBanner()
}
, 60000)
