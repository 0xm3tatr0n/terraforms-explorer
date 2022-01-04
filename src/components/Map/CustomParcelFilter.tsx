import React, { useState, useEffect } from 'react'
import { Grid, TextField, Chip, Stack } from '@mui/material'

const textFieldStyle = {
  color: 'magenta',
  '& label.Mui-focused': {
    color: 'magenta',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'magenta',
  },
  '& .MuiOutlinedInput-root': {
    color: 'magenta',
    borderRadius: '0px',
    '& fieldset': {
      borderColor: 'magenta',
    },
    '&:hover fieldset': {
      borderColor: 'magenta',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'magenta',
    },
  },
}

const styleChip = {
  border: '1px solid yellow',
  margin: '5px',
  color: 'yellow',
  fontSize: '16px',
  //   padding: '6px',
  '&& > .MuiSvgIcon-root': {
    color: 'yellow',
  },
}

interface IParcelChipsProps {
  setCustomParcels: any
}

interface ICustomFilterProps {
  setCustomParcels: any
  triggerFn: any
  triggerVar: boolean
}

function CustomParcelFilter(props: ICustomFilterProps) {
  const {
    setCustomParcels: setCustomParcelsParent,
    triggerVar,
    triggerFn,
  } = props

  const [textInput, setTextInput] = useState<string>('6068')
  const [customParcels, setCustomParcels] = useState<number[]>([])
  const [customParcelsChips, setCustomParcelsChips] = useState([])

  function changeParcelInput(e: any) {
    const value = e.target.value
    setTextInput(value)
  }

  function addParcel(e: any) {
    if (e.keyCode === 13) {
      // TODO: check if number / legit parcel
      console.log(
        'key down detected',
        e.target.value,
        'isNan: ',
        isNaN(Number(e.target.value)),
      )
      if (
        e &&
        e.target &&
        e.target.value &&
        !isNaN(Number(e.target.value)) &&
        !customParcels.includes(Number(e.target.value))
      ) {
        console.log('parcel value', e.target.value)
        const customParcelsNew = [...customParcels, Number(e.target.value)]
        setCustomParcels(customParcelsNew)
      }
    }
  }

  const handleDelete = (value: number) => (e: Event) => {
    const index = customParcels.indexOf(value)
    if (index > -1) {
      console.log('found index, gonna delete: ', index, value)
      const customParcelsNew = [...customParcels]
      customParcelsNew.splice(index, 1)
      console.log(
        'gonna set custom parcels to: ',
        customParcelsNew,
        'from ',
        customParcels,
      )
      setCustomParcels(customParcelsNew)
    }
  }

  useEffect(() => {
    // console.log('custom parcel chips changed ', customParcels)
  }, [customParcelsChips])

  useEffect(() => {
    if (customParcels.length >= 0) {
      const chips: any = []
      customParcels.forEach((e) => {
        chips.push(
          <Chip
            label={`${e}`}
            variant="outlined"
            onDelete={handleDelete(e)}
            sx={styleChip}
            key={`c-${e}`}
          />,
        )
      })
      setCustomParcelsChips(chips)
    }
    // update parent
    setCustomParcels(customParcels)
    setCustomParcelsParent(customParcels)
    triggerFn(!triggerVar)
  }, [customParcels])

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <i>Custom parcel selection</i>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={textFieldStyle}
            variant="outlined"
            onChange={changeParcelInput}
            onKeyDown={addParcel}
            value={textInput}
            fullWidth
            size={'small'}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {[...customParcelsChips]}
          </Stack>
        </Grid>
        {/* <Grid item xs={12}>
          {JSON.stringify(customParcels)}
        </Grid> */}
      </Grid>
    </Grid>
  )
}

export default CustomParcelFilter
