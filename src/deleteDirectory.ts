/* eslint-disable no-unused-vars */
import listDirectory from './listDirectory'

export default async function deleteDirectory (FatherDirectory: string, TargetDirectory: string) {
  const include = await (await listDirectory(FatherDirectory)).includes(TargetDirectory)
  console.log(include)

//   return new Promise((resolve, reject) => {
//     fs.rmdir(path, { recursive: true }, (err) => {
//       if (err) {
//         reject(err)
//       }
//       resolve()
//     })
//   })
}
