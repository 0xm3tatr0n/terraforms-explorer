import React, { useState, useEffect, useRef } from 'react'
import { Grid, Slider, Box, Stack, Drawer } from '@mui/material'
import { IFilterPanelProps, IDataFilters } from './interfaces'
import ColorSelectRadioButtons from './ColorSelectRadioButtons'
import BasicSelect from './BasicSelect'
import FilterChips from './FilterChips'
import CustomParcelFilter from './CustomParcelFilter'

function FilterPanel(props: IFilterPanelProps) {
  const {
    colorDimension,
    setColorDimension,
    dataFilters,
    levelsAll,
    zonesAll,
    biomesAll,
    filterSelection,
    setDataFilters,
    setTestState,
    testState,
    setSpaceSlider,
    setSpaceSliderHorizontal,
    spaceSliderHorizontal,
    spaceSlider,
    parcels,
    setCustomParcels,
  } = props

  const { levelsFilter, biomesFilter, zonesFilter } = dataFilters

  const updateSpace = (event: Event, newValue: number | number[]) => {
    const space = Number(newValue)
    if (space >= 0 && space <= 5) {
      setSpaceSlider(space)
      setTestState(!testState)
    }
  }

  const updateSpceHozriontal = (event: Event, newValue: number | number[]) => {
    const space = Number(newValue)
    if (space >= 1 && space <= 10) {
      setSpaceSliderHorizontal(space)
      setTestState(!testState)
    }
  }

  const chipFilterRemove = (dimension: string, value: string | number) => {
    const newFilters = dataFilters

    function removeElement(
      array: number[] | string[],
      valueToRemove: string | number,
    ) {
      if (array.length === 0) return []
      let newArray = [...array]
      if (typeof newArray[0] != typeof valueToRemove) return []
      const index = newArray.indexOf(valueToRemove)
      if (index > -1) {
        newArray.splice(index, 1)
      }
      return newArray
    }

    if (dimension === 'Levels') {
      const clearedArray = removeElement(
        dataFilters.levelsFilter,
        value,
      ) as number[]
      newFilters.levelsFilter = clearedArray
    } else if (dimension === 'Biomes') {
      const clearedArray = removeElement(
        dataFilters.biomesFilter,
        value,
      ) as number[]
      newFilters.biomesFilter = clearedArray
    } else if (dimension === 'Zones') {
      const clearedArray = removeElement(
        dataFilters.zonesFilter,
        value,
      ) as string[]
      newFilters.zonesFilter = clearedArray
    }

    setTestState(!testState)
    setDataFilters(newFilters as IDataFilters)
  }

  return (
    <Grid item xs={3} sx={{ padding: '30px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <i>Color by</i>
        </Grid>
        <Grid item xs={12}>
          <ColorSelectRadioButtons
            callback={setColorDimension}
            dimension={colorDimension}
          />
        </Grid>
        <CustomParcelFilter
          setCustomParcels={setCustomParcels}
          triggerVar={testState}
          triggerFn={setTestState}
        />
        <Grid item xs={12}>
          <i>Filters</i>
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            label={'Level'}
            options={levelsAll}
            callback={filterSelection('Level', dataFilters, setDataFilters)}
            filters={dataFilters}
            property={'Level'}
            triggerVar={testState}
            setDataFilters={setDataFilters}
            triggerFn={setTestState}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            label={'Biome'}
            options={biomesAll}
            callback={filterSelection('Biome', dataFilters, setDataFilters)}
            filters={dataFilters}
            property={'Biome'}
            triggerVar={testState}
            setDataFilters={setDataFilters}
            triggerFn={setTestState}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            label={'Zone'}
            options={zonesAll}
            callback={filterSelection('Zone', dataFilters, setDataFilters)}
            filters={dataFilters}
            property={'Zone'}
            triggerVar={testState}
            setDataFilters={setDataFilters}
            triggerFn={setTestState}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <FilterChips
            activeFilters={dataFilters}
            removeChip={chipFilterRemove}
            triggerVar={testState}
          />
        </Grid>
        <Grid item xs={12}>
          <i>Explode</i>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ marginTop: '8px' }}>
            <Stack>
              <Box sx={{ display: 'inline-block' }}>Vertical</Box>
              <Slider
                aria-label="Level Spacing"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0.5}
                max={5}
                value={spaceSlider}
                onChange={updateSpace}
                color="secondary"
                sx={{
                  display: 'inline-block',
                  marginLeft: '15px',
                  marginRight: '15px',
                }}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Stack>
              <Box>Horizontal</Box>
              <Slider
                aria-label="Level Spacing"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                value={spaceSliderHorizontal}
                onChange={updateSpceHozriontal}
                color="secondary"
                sx={{
                  display: 'inline-block',
                  marginLeft: '15px',
                }}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {JSON.stringify(parcels)}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FilterPanel
