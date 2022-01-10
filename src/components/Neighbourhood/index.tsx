import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import { TerraformsCard, RenderTerraformsProps } from '../'
import { INeighbourhoodProps } from './interfaces'

function generateNeighbourhood(center: number): number[] {
  // upper bound
  const MAX_ID = 10000
  const MAX_ITEMS = 20
  const lowerBound = Number(center) - Math.round(MAX_ITEMS / 2)
  const upperBound = Number(center) + Math.round(MAX_ITEMS / 2)
  console.log('boundaries: ', lowerBound, upperBound)

  if (0 < center && center < MAX_ID) {
    // do something

    const neighbourhood = []
    // go back and forth by id
    for (let i = lowerBound; i < upperBound; i++) {
      //
      //   console.log('iiii: ', i, upperBound)
      neighbourhood.push(i)
    }
    // console.log('>>> new hood! ', neighbourhood)
    return neighbourhood
  }

  return []
}

function Neighbourhood(props: INeighbourhoodProps) {
  const { contract, tokenId } = props
  console.log('hood launching', tokenId)

  const [centerTokenId, setTokenId] = useState<number>(tokenId || 6601)
  const [hood, setHood] = useState<number[]>([])

  useEffect(() => {
    //
    console.log('center token: ', centerTokenId)
    const hood = generateNeighbourhood(centerTokenId)
    setHood(hood)
  }, [centerTokenId])

  useEffect(() => {
    setTokenId(tokenId)
  }, [tokenId])

  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <>
          {hood.length > 0 ? (
            hood.map(function (e) {
              console.log('mapping hood: ', e)
              return (
                <Grid item xs={6} md={3} lg={3}>
                  <TerraformsCard tokenId={e} contract={contract} />
                </Grid>
                // <div>foo</div>
              )
            })
          ) : (
            <Grid item xs={12}>
              n/a
            </Grid>
          )}
        </>
      </Grid>
    </Grid>
  )
}

export default Neighbourhood
