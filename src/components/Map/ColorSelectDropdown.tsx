import React, { useState, useEffect, useRef } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { IColorRadioProps } from './interfaces'

const styleDropdown = {
  color: 'magenta' /* pink[800] */,
  '&.Mui-checked': {
    color: 'magenta' /* pink[600] */,
  },
  borderRadius: '0px',
}

function ColorSelectDropdown(props: IColorRadioProps) {
  const { callback, dimension } = props

  const handleChange = (e: any) => {
    callback(e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          color: 'magenta',
        }}
      >
        Color by
      </InputLabel>
      <Select
        value={dimension}
        onChange={handleChange}
        label={'color by'}
        sx={{
          '&& button': {
            color: 'magenta',
          },
          '&:hover': {
            '&& fieldset': {
              border: '2px solid magenta',
            },
            '&& label': {
              color: 'magenta',
            },
          },
          '&.Mui-focused MuiOutlinedInput-notchedOutline': {
            borderColor: 'magenta',
            color: 'magenta',
            '&label': {},
          },

          '&.MuiFormLabel-root Mui-focused ': {
            color: 'yellow',
          },

          '&.MuiOutlinedInput-root': {
            color: 'magenta',
          },
          '&& > fieldset': {
            border: '1px solid magenta',
            borderRadius: '0px',
          },
          '&& > .MuiSvgIcon-root': {
            color: 'magenta',
          },
        }}
        size={'small'}
      >
        <MenuItem value={'level'}>Level</MenuItem>
        <MenuItem value={'zone'}>Zone</MenuItem>
        <MenuItem value={'biome'}>Biome</MenuItem>
        <MenuItem value={'mine'}>Mine</MenuItem>
        <MenuItem value={'custom'}>Custom</MenuItem>
        <MenuItem value={'none'}>None</MenuItem>
        <MenuItem value={'chroma'}>Chroma</MenuItem>
        <MenuItem value={'mode'}>Mode</MenuItem>
      </Select>
    </FormControl>
  )
}

export default ColorSelectDropdown
