import React, { useState, useEffect, useRef } from 'react'

import { Grid, Slider, Stack, Chip } from '@mui/material'

import { IChipsProps } from './interfaces'

const styleChip = {
  border: '1px solid yellow',
  margin: '5px',
  color: 'yellow',
  fontSize: '16px',
  padding: '6px',
  '&& > .MuiSvgIcon-root': {
    color: 'yellow',
  },
}

function FilterChips(props: IChipsProps) {
  const { activeFilters, removeChip, triggerVar } = props

  const { levelsFilter, zonesFilter, biomesFilter } = activeFilters
  console.log('active filters: ', activeFilters)

  const [chipsList, setChipsList] = useState([])

  const handleDelete = (dimension: string, value: string | number) => (
    e: Event,
  ) => {
    console.log('delete', 'dimension: ', dimension, 'value', value)
    removeChip(dimension, value)
  }

  useEffect(() => {
    const chips: any = []
    levelsFilter.forEach((e) => {
      chips.push(
        <Chip
          label={`Level: ${e}`}
          variant="outlined"
          onDelete={handleDelete('Levels', e)}
          sx={styleChip}
          key={`l-${e}`}
        />,
      )
    })

    biomesFilter.forEach((e) => {
      chips.push(
        <Chip
          label={`Biome: ${e}`}
          variant="outlined"
          onDelete={handleDelete('Biomes', e)}
          sx={styleChip}
          key={`b-${e}`}
        />,
      )
    })

    zonesFilter.forEach((e) => {
      chips.push(
        <Chip
          label={`Zone: ${e}`}
          variant="outlined"
          onDelete={handleDelete('Zones', e)}
          sx={styleChip}
          key={`z-${e}`}
        />,
      )
    })

    setChipsList(chips)
  }, [levelsFilter, zonesFilter, biomesFilter, triggerVar])

  return <Stack sx={{ display: 'flex' }}>{[...chipsList]}</Stack>
}

export default FilterChips
