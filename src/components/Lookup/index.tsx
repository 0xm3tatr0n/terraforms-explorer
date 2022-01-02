import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import { TerraformsCard } from '../'
import { ILookupProps } from './interfaces'

function Lookup(props: ILookupProps) {
  const { tokenId } = props
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Lookup! {tokenId}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Lookup
