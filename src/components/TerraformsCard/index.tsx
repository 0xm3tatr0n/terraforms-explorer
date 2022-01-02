import React, { useState, useEffect } from 'react'
import { Grid, Paper, Box, Input } from '@mui/material'

import { TerraformsMetaData, RenderTerraformsProps } from './interfaces'
import { TerraformsMetaDataPlaceholder } from './placeholders'

async function getHTML(terraforms: any, token: number, setTerraformsSVG: any) {
  if (terraforms) {
    const HTML = await terraforms.tokenSVG(token)
    setTerraformsSVG(HTML)
  }
}

async function getMetadata(terraforms: any, token: number, setMetadata: any) {
  if (!terraforms) return

  const metaDataRAW = await terraforms.tokenSupplementalData(token)

  if (metaDataRAW) {
    const {
      characterSet,
      elevation,
      level,
      structureSpaceX,
      structureSpaceY,
      structureSpaceZ,
      tokenId,
      xCoordinate,
      yCoordinate,
      zoneColors,
      zoneName,
    } = metaDataRAW

    const terraMetadataParsed = {
      characterSet,
      elevation: elevation.toNumber(),
      level: level.toNumber(),
      structureSpaceX: structureSpaceX.toNumber(),
      structureSpaceY: structureSpaceY.toNumber(),
      structureSpaceZ: structureSpaceZ.toNumber(),
      tokenId: tokenId.toNumber(),
      xCoordinate: xCoordinate.toNumber(),
      yCoordinate: yCoordinate.toNumber(),
      zoneColors,
      zoneName,
    }

    setMetadata(terraMetadataParsed)
  }
}

function RenderTerraform(props: RenderTerraformsProps) {
  const { tokenId, contract } = props

  const [terraHTML, setHTML] = useState<any>()

  useEffect(() => {
    getHTML(contract, tokenId, setHTML)
  }, [tokenId, contract])

  if (terraHTML) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: terraHTML }}></div>
      </div>
    )
  } else {
    return null
  }
}

function RenderTerraformsCard(props: RenderTerraformsProps) {
  const { tokenId, contract } = props
  const [terraMetadata, setTerraMetadata] = useState<TerraformsMetaData>(
    TerraformsMetaDataPlaceholder,
  )

  const [showFront, setShowFront] = useState<boolean>(true)

  const toggleCard = () => {
    setShowFront(!showFront)
  }

  useEffect(() => {
    getMetadata(contract, tokenId, setTerraMetadata)
  }, [tokenId, contract])

  return (
    <Grid container spacing={2} onClick={toggleCard}>
      <Grid item xs={12}>
        {tokenId} | {terraMetadata.zoneName}
      </Grid>
      <Grid item xs={12}>
        Level {terraMetadata.level} at {'{'} {terraMetadata.xCoordinate},{' '}
        {terraMetadata.yCoordinate} {'}'}
      </Grid>

      {showFront ? (
        <Grid item xs={12}>
          <RenderTerraform tokenId={tokenId} contract={contract} />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Zone: {terraMetadata.zoneName}
            </Grid>
            <Grid item xs={12}>
              level: {terraMetadata.level}
            </Grid>
            <Grid item xs={12}>
              elevation: {terraMetadata.elevation}
            </Grid>
            <Grid item xs={12}>
              xCoordinate: {terraMetadata.xCoordinate}
            </Grid>
            <Grid item xs={12}>
              yCoordinate: {terraMetadata.yCoordinate}
            </Grid>
            <Grid item xs={12}>
              structureSpaceX: {terraMetadata.structureSpaceX}
            </Grid>
            <Grid item xs={12}>
              structureSpaceY: {terraMetadata.structureSpaceY}
            </Grid>
            <Grid item xs={12}>
              structureSpaceZ: {terraMetadata.structureSpaceZ}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default RenderTerraformsCard
