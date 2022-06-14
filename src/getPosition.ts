export default function getPosition (i: number): { topValue: number, leftValue: number } {
  const targetImage = i

  console.log('targetImage', targetImage)

  switch (targetImage) {
    case 0:
      return { topValue: 135, leftValue: 1184 }
    case 1:
      return { topValue: 190, leftValue: 1338 }
    case 2:
      return { topValue: 285, leftValue: 1184 }
    case 3:
      return { topValue: 345, leftValue: 1338 }
  }
}
