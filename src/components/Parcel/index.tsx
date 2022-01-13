import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import Parcel3dMap from './Parcel3dMap'
import { IParcelProps } from './interfaces'

function printRows(terrain: number[][]) {
  // checks
  if (terrain.length !== 32) return
  for (let i = 0; i < terrain.length; i++) {
    console.log('row: ', i, terrain[i])
    for (let j = 0; j < terrain[i].length; i++) {
      console.log('column: ', j, 'value: ', terrain[i][j])
    }
  }
}

function Parcel(props: IParcelProps) {
  const { contract } = props

  const [terrain, setTerrain] = useState<number[][]>([])
  async function loadTerrainData() {
    const terrain = await contract.tokenTerrainValues(6068)
    console.log('terrain :', terrain)
    printRows(terrain)
    setTerrain(terrain)
  }

  useEffect(() => {
    loadTerrainData()
  }, [])
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item md={6}>
          Parcel
        </Grid>
        <Grid item md={6}>
          <Parcel3dMap contract={contract} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Parcel
