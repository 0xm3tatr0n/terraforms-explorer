export interface IMapProps {
  userParcels: number[]
}

export interface IColorRadioProps {
  callback: any
  dimension: string
}

export interface IDataFilters {
  zonesFilter: string[]
  biomesFilter: number[]
  levelsFilter: number[]
}

export interface IBasicSelectProps {
  options: number[] | string[]
  callback: any
  label: string
  filters: IDataFilters
  property: string
  triggerVar: boolean // hack to trigger rerender
  setDataFilters: any
  triggerFn: any
}

export interface IChipsProps {
  activeFilters: IDataFilters
  triggerVar: boolean // hack to trigger rerender
  removeChip: any
}

export interface IFilterPanelProps {
  colorDimension: string
  setColorDimension: any
  dataFilters: IDataFilters
  levelsAll: number[]
  biomesAll: number[]
  zonesAll: string[]
  filterSelection: any
  setDataFilters: any
  testState: boolean
  setTestState: any
  spaceSlider: number
  setSpaceSlider: any
  spaceSliderHorizontal: number
  setSpaceSliderHorizontal: any
  parcels: number[]
}

export interface IRender3DProps {
  dataToRender: any[]
  testState: boolean
  cameraState: number[]
  setCameraState: any
  colorDimension: string
  colorMap: Record<string, string>
  spaceSlider: number
  spaceSliderHorizontal: number
}
