import React, { useState, useEffect, useRef } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

import { IColorRadioProps } from './interfaces'

const styleRadioButton = {
  color: 'magenta' /* pink[800] */,
  '&.Mui-checked': {
    color: 'magenta' /* pink[600] */,
  },
  borderRadius: '0x',
}

function ColorSelectRadioButtons(props: IColorRadioProps) {
  const { callback, dimension } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e.target.value)
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="gender"
        name="row-radio-buttons-group"
        value={dimension}
        onChange={handleChange}
      >
        <FormControlLabel
          value="level"
          control={<Radio sx={styleRadioButton} />}
          label="Level"
        />
        <FormControlLabel
          value="zone"
          control={<Radio sx={styleRadioButton} />}
          label="Zone"
        />
        <FormControlLabel
          value="biome"
          control={<Radio sx={styleRadioButton} />}
          label="Biome"
        />
        <FormControlLabel
          value="none"
          control={<Radio sx={styleRadioButton} />}
          label="None"
        />
        <FormControlLabel
          value="mine"
          control={<Radio sx={styleRadioButton} />}
          label="Mine"
        />
        <FormControlLabel
          value="custom"
          control={<Radio sx={styleRadioButton} />}
          label="Custom"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default ColorSelectRadioButtons
