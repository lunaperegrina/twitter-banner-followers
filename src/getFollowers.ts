import { appOnlyClient } from './services'

export async function getFollowers () {
  const followers = await appOnlyClient.v2.followers(process.env.USER_ID as string, { asPaginator: false, max_results: 4 })

  return followers.data
}
