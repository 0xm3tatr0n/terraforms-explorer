export default function generateColorMap(
  colorDimension: string,
  levelsAll: number[],
  biomesAll: number[],
  zonesAll: string[],
  idsAll: number[],
  parcels: number[],
  colorPallette: string[],
  customParcels: number[],
) {
  const newColorMap: Record<string, string> = {}
  if (colorDimension === 'none') {
    levelsAll.forEach((e, i) => {
      newColorMap[String(e)] = colorPallette[i]
    })
  } else if (colorDimension === 'level') {
    levelsAll.forEach((e, i) => {
      newColorMap[String(e)] = colorPallette[i]
    })
  } else if (colorDimension === 'biome') {
    biomesAll.forEach((e, i) => {
      newColorMap[String(e)] = colorPallette[i]
    })
  } else if (colorDimension === 'zone') {
    zonesAll.forEach((e, i) => {
      newColorMap[String(e)] = colorPallette[i]
    })
  } else if (colorDimension === 'mine') {
    idsAll.forEach((e, i) => {
      newColorMap[String(e)] = parcels.includes(e) ? '#ff00ff' : '#FFFFFF' // '#ffff00'
    })
  } else if (colorDimension === 'custom') {
    console.log('>> custom color scheme: ', customParcels)
    idsAll.forEach((e, i) => {
      if (customParcels.includes(Number(e))) {
        console.log(
          `>> i is ${i}: number: ${e}`,
          customParcels.includes(Number(e)),
          Number(e),
        )
      }
      newColorMap[String(e)] = customParcels.includes(Number(e))
        ? '#ff00ff'
        : '#FFFFFF'
    })
  }
  return newColorMap
}
