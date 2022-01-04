import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import { IBasicSelectProps, IDataFilters } from './interfaces'

function BasicSelect(props: IBasicSelectProps) {
  const {
    options,
    callback,
    label,
    filters,
    property,
    triggerVar,
    setDataFilters,
    triggerFn,
  } = props

  const [selection, setSelection] = useState('all')

  useEffect(() => {
    // console.log('select filter change noticed ', filters, triggerVar)
    if (property === 'Zone') {
      if (filters.zonesFilter.length === 0) {
        setSelection('all')
      }
    } else if (property === 'Biome') {
      if (filters.biomesFilter.length === 0) {
        setSelection('all')
      }
    } else if (property === 'Level') {
      if (filters.levelsFilter.length === 0) {
        setSelection('all')
      }
    }
  }, [filters, property, triggerVar])

  const handleChange = (e: SelectChangeEvent) => {
    console.log(
      'handling change',
      property,
      e.target.value,
      typeof e.target.value,
    )

    // set filters on change
    const newFilter = filters
    if (property === 'Zone') {
      if (e.target.value === 'all') {
        newFilter.zonesFilter = []
      } else {
        newFilter.zonesFilter.push(e.target.value as string)
      }
    } else if (property === 'Biome') {
      if (e.target.value === 'all') {
        newFilter.biomesFilter = []
      } else {
        newFilter.biomesFilter.push(Number(e.target.value) as number)
      }
    } else if (property === 'Level') {
      if (e.target.value === 'all') {
        newFilter.levelsFilter = []
      } else {
        newFilter.levelsFilter.push(Number(e.target.value) as number)
      }
    }
    console.log('setting new data filter to ', newFilter)
    setDataFilters(newFilter as IDataFilters)

    setSelection(e.target.value as string)
    triggerFn(!triggerVar)
  }

  return (
    <Box sx={{ marginTop: '5px', marginBottom: '3px' }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: 'magenta' }}>{label}</InputLabel>
        <Select
          value={selection}
          label={label}
          onChange={handleChange}
          sx={{
            '&:hover': {
              '&& fieldset': {
                border: '2px solid magenta',
              },
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'magenta',
              color: 'magenta',
              '&label': {},
            },

            '&.MuiFormLabel-root Mui-focused ': {
              color: 'yellow',
            },

            '& .MuiOutlinedInput-root': {
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
          <MenuItem value={'all'}>all</MenuItem>
          {options.map((e) => {
            return (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default BasicSelect
