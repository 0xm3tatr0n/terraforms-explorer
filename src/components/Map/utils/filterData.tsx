import { IDataFilters } from '../interfaces'

export default function filterData(
  newFilters: IDataFilters,
  unfilteredData: any[],
) {
  const { zonesFilter, biomesFilter, levelsFilter } = newFilters

  const dataFiltered = unfilteredData.filter((e) => {
    let inZone = true
    let inBiome = true
    let inLevel = true

    if (zonesFilter && zonesFilter.length > 0) {
      inZone = zonesFilter.includes(e.zoneName)
    }

    if (biomesFilter && biomesFilter.length > 0) {
      inBiome = biomesFilter.includes(e.biome)
    }
    if (levelsFilter && levelsFilter.length > 0) {
      inLevel = levelsFilter.includes(e.level)
    }

    return inZone && inBiome && inLevel
  })

  return dataFiltered
}
