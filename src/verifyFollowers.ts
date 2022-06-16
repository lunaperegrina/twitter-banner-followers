import { followersMock } from './mocks'

import listDirectory from './listDirectory'
import { getFollowers } from './getFollowers'

let followersOld:any = []


export default async function verifyFollowers(): Promise<Array<any>> {

    // const followers = await getFollowers()
    const followers = followersMock

    console.log(followers)
    console.log(followersOld)
  
    if (JSON.stringify(followers) === JSON.stringify(followersOld)) {
      console.log('No new followers')
      return []
    }

    followersOld = followers

    return followers
  
}