
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

import { client } from './services'

import { getFollowers } from './getFollowers'
import compositeBanner from './compositeBanner'
import listDirectory from './listDirectory'
import getProfileImage from './getProfileImage'
import verifyFollowers from './verifyFollowers'
import  deleteDirectory  from './deleteDirectory'

async function updateBanner () {

  const followers = await verifyFollowers()

  followers.forEach(async e => {
    console.log(e.id)
    await getProfileImage(e.id)
  })



  // if (list.includes('profile-images')) {
  //   await fs.rm(path.resolve('profile-images'), { recursive: true }, (err) => {
  //     if (err) {
  //       console.error(err.message)
  //       return
  //     }
  //     console.log('File deleted successfully')

  //     fs.mkdirSync(path.resolve('profile-images'))


  //     console.log('bem antes')
  //   })
  // }

}

async function init(){
  Promise.all([
    await deleteDirectory('.', 'profile-images'),
    await updateBanner(), 
    await compositeBanner(),  
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
