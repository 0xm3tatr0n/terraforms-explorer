import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import { IParcelProps } from './interfaces'

function Parcel3dMap(props: IParcelProps) {
  useEffect(() => {}, [])
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Parcel 3d map
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Parcel3dMap
