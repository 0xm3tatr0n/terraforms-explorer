import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import { TerraformsCard, RenderTerraformsProps } from '../'

import { IMineProps } from './interfaces'

function RenderMine() {}

function Mine(props: IMineProps) {
  const { contract, castles } = props
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <>
          {castles.length > 0 ? (
            castles.map((e) => {
              return (
                <Grid item xs={6} md={3} lg={2} xl={2}>
                  <TerraformsCard tokenId={e} contract={contract} />
                </Grid>
              )
            })
          ) : (
            <></>
          )}
        </>
        <Grid item xs={12}>
          Mine! {castles.join(', ')}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Mine
