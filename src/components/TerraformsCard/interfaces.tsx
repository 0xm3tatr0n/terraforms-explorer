export interface TerraformsMetaData {
  zoneName: string
  level: number
  elevation: number
  xCoordinate: number
  yCoordinate: number
  structureSpaceX: number
  structureSpaceY: number
  structureSpaceZ: number
  tokenId: number
  characterSet: string[]
  zoneColors: string[]
}

export interface RenderTerraformsProps {
  tokenId: number
  contract: any
}
