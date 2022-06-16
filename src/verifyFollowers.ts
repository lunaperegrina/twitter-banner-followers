// eslint-disable-next-line no-unused-vars
import { followersMock, TFollowers } from './mocks'

import { getFollowers } from './getFollowers'

let followersOld:any = []

export default async function verifyFollowers (): Promise<TFollowers> {
  const followers = await getFollowers()
  // const followers = followersMock

  console.log(followers)
  console.log(followersOld)

  const response = JSON.stringify(followers) === JSON.stringify(followersOld) ? [] : followers

  followersOld = followers

  return response
}
