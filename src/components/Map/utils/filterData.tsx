import { IDataFilters } from '../interfaces'

export default function filterData(
  newFilters: IDataFilters,
  unfilteredData: any[],
) {
  const {
    zonesFilter,
    biomesFilter,
    levelsFilter,
    chromasFilter,
    modesFilter,
  } = newFilters

  const dataFiltered = unfilteredData.filter((e) => {
    let inZone = true
    let inBiome = true
    let inLevel = true
    let inChroma = true
    let inModes = true

    if (zonesFilter && zonesFilter.length > 0) {
      inZone = zonesFilter.includes(e.zoneName)
    }

    if (biomesFilter && biomesFilter.length > 0) {
      inBiome = biomesFilter.includes(e.biome)
    }
    if (levelsFilter && levelsFilter.length > 0) {
      inLevel = levelsFilter.includes(e.level)
    }
    if (chromasFilter && chromasFilter.length > 0) {
      inChroma = chromasFilter.includes(e.chroma)
    }

    if (modesFilter && modesFilter.length > 0) {
      inModes = modesFilter.includes(e.mode)
    }

    return inZone && inBiome && inLevel && inChroma && inModes
  })

  return dataFiltered
}
