export default function generateColorMap(
  colorDimension: string,
  levelsAll: number[],
  biomesAll: number[],
  zonesAll: string[],
  idsAll: number[],
  parcels: number[],
  colorPallette: string[],
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
  }
  return newColorMap
}
