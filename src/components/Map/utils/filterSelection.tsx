import { IDataFilters } from '../interfaces'

const filterSelection = (
  dimension: string,
  filters: IDataFilters,
  callback: any,
) => (value: string[] | number[] | 'all') => {
  const newFilter = { ...filters }
  if (dimension === 'Level') {
    if (value[0] === 'all' || value === 'all') {
      newFilter.levelsFilter = []
    } else {
      newFilter.levelsFilter = [Number(value)]
    }
  } else if (dimension === 'Biome') {
    if (value[0] === 'all' || value === 'all') {
      newFilter.biomesFilter = []
    } else {
      newFilter.biomesFilter = [Number(value)]
    }
  } else if (dimension === 'Zone') {
    if (value[0] === 'all' || value === 'all') {
      newFilter.zonesFilter = []
    } else {
      newFilter.zonesFilter = [String(value)]
    }
  } else if (dimension === 'Chroma') {
    if (value[0] === 'all' || value === 'all') {
      newFilter.chromasFilter = []
    } else {
      newFilter.chromasFilter = [String(value)]
    }
  } else if (dimension === 'Mode') {
    if (value[0] === 'all' || value === 'all') {
      newFilter.modesFilter = []
    } else {
      newFilter.modesFilter = [String(value)]
    }
  }

  if (callback) {
    callback(newFilter as IDataFilters)
    return
  } else {
    return newFilter as IDataFilters
  }
}

export default filterSelection
