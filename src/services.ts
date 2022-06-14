import { TwitterApi } from 'twitter-api-v2'

export const client = new TwitterApi({
  appKey: process.env.API_KEY as string,
  appSecret: process.env.API_KEY_SECRET as string,
  accessToken: process.env.ACCESS_TOKEN as string,
  accessSecret: process.env.ACCESS_TOKEN_SECRET as string
})

export const appOnlyClient = new TwitterApi(process.env.BEARER_TOKEN as string)

// TODO: To usando as credenciais de 2 aplicações. Lembra de usar a de 1 só que tem acesso as 2 versões da API
