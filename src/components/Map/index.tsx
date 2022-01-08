import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@mui/material'
import { colorPallette } from '../../constants'
import { IDataFilters, IMapProps } from './interfaces'
import dataRaw from '../../data/terraforms.json'
import FilterPanel from './FilterPanel'
import Render3D from './Render3D'
import {
  filterData,
  loadData,
  generateColorMap,
  filterSelection,
} from './utils/index'

function Map(props: IMapProps) {
  const { userParcels } = props

  // state
  const [parcels, setParcels] = useState<number[]>([])
  const [idsAll, setIdsAll] = useState<number[]>([])
  const [levelsAll, setLevelsAll] = useState<number[]>([])
  const [zonesAll, setZonesAll] = useState<string[]>([])
  const [biomesAll, setBiomesAll] = useState<number[]>([])
  const [chromasAll, setChromasAll] = useState<string[]>([])
  const [modesAll, setModesAll] = useState<string[]>([])
  const [customParcels, setCustomParcels] = useState<number[]>([])
  const [dataAll, setDataAll] = useState<any[]>([])
  const [dataFilters, setDataFilters] = useState<IDataFilters>({
    zonesFilter: [],
    biomesFilter: [],
    levelsFilter: [],
    chromasFilter: [],
    modesFilter: [],
  })
  const [dataToRender, setDataToRender] = useState<any[]>([])
  const [colorDimension, setColorDimension] = useState<string>('level')
  const [colorMap, setColorMap] = useState({} as Record<string, string>)
  const [spaceSlider, setSpaceSlider] = useState<number>(4)
  const [spaceSliderHorizontal, setSpaceSliderHorizontal] = useState<number>(1)
  const [elevationMultiple, setElevationMultiple] = useState<number>(1)
  const [cameraState, setCameraState] = useState<number[]>([])

  // todo remove (works as hack to update chip component)
  const [testState, setTestState] = useState<boolean>(true)

  // methods
  // effects
  useEffect(() => {
    const { data, levels, biomes, zones, ids, chromas, modes } = loadData(
      dataRaw,
    )
    setIdsAll(ids)
    setLevelsAll(levels)
    setBiomesAll(biomes)
    setZonesAll(zones)
    setDataAll(data)
    setDataToRender(data)
    setChromasAll(chromas)
    setModesAll(modes)
  }, [])

  useEffect(() => {
    const dataFiltered = filterData(dataFilters, dataAll)
    setDataToRender(dataFiltered)
  }, [dataFilters, dataAll, testState])

  useEffect(() => {
    const newColorMap = generateColorMap(
      colorDimension,
      levelsAll,
      biomesAll,
      zonesAll,
      idsAll,
      parcels,
      colorPallette,
      customParcels,
      chromasAll,
      modesAll,
    )

    setColorMap(newColorMap)
  }, [colorDimension, levelsAll, biomesAll, zonesAll, customParcels])

  useEffect(() => {
    setParcels(userParcels)
  }, [userParcels])

  useEffect(() => {
    // console.log('>> custom parcels changed', customParcels)
  }, [customParcels])

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <FilterPanel
          colorDimension={colorDimension}
          setColorDimension={setColorDimension}
          dataFilters={dataFilters}
          levelsAll={levelsAll}
          zonesAll={zonesAll}
          biomesAll={biomesAll}
          filterSelection={filterSelection}
          setDataFilters={setDataFilters}
          setTestState={setTestState}
          testState={testState}
          spaceSlider={spaceSlider}
          setSpaceSlider={setSpaceSlider}
          setSpaceSliderHorizontal={setSpaceSliderHorizontal}
          spaceSliderHorizontal={spaceSliderHorizontal}
          parcels={parcels}
          setCustomParcels={setCustomParcels}
          elevationMultiple={elevationMultiple}
          setElevationMultiple={setElevationMultiple}
          chromasAll={chromasAll}
          modesAll={modesAll}
        />
        <Render3D
          dataToRender={dataToRender}
          testState={testState}
          cameraState={cameraState}
          setCameraState={setCameraState}
          colorDimension={colorDimension}
          colorMap={colorMap}
          spaceSlider={spaceSlider}
          spaceSliderHorizontal={spaceSliderHorizontal}
          customParcels={customParcels}
          elevationMultiple={elevationMultiple}
        />
      </Grid>
    </Grid>
  )
}

export default Map
