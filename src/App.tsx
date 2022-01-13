import React, { useState, useEffect } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import { Grid, Box, Typography } from '@mui/material'
import { ethers } from 'ethers'
import terraformsABI from './contractABIs/Terraforms.json'
import './App.css'

import { terraformsAddress, zeroAddress } from './constants'
import { Lookup, Mine, Neighbourhood, Map, Parcel } from './components'

async function initWeb3(
  setProvider: any,
  setTerraforms: any,
  setUserAccount: any,
  setUserCastles: any,
) {
  await window.ethereum.enable()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // connect to terraforms
  const terraformsContract = new ethers.Contract(
    terraformsAddress,
    terraformsABI,
    provider,
  )

  const accounts = await provider.listAccounts()
  if (accounts[0]) {
    setUserAccount(accounts[0])
  }

  // set provider
  setProvider(provider)
  setTerraforms(terraformsContract)
}

function App() {
  // highest level state
  const [provider, setProvider] = useState<any>()
  const [userAccount, setUserAccount] = useState<string>(zeroAddress)
  const [userCastles, setUserCastles] = useState<number[]>([])
  const [terraforms, setTerraforms] = useState<any>()
  const [inputTokenId, setInputTokenId] = useState(6068)
  const [tokenID, setTokenID] = useState<number>(6068)

  // methods
  const tokenIdInput = function (e: any) {
    const value = e.target.value
    setInputTokenId(value)
  }

  const changeTokenId = async function (e: any) {
    if (e.keyCode === 13) {
      console.log('value', e.target.value)
      // put the login here
      setTokenID(e.target.value)
    }
  }

  // define effects
  useEffect(() => {
    initWeb3(setProvider, setTerraforms, setUserAccount, setUserCastles).catch(
      (err) => {
        console.log('init sequence error', err)
      },
    )
  }, [])

  useEffect(() => {
    const getCollection = async () => {
      if (!terraforms || userAccount === zeroAddress) return
      const userBalance = await terraforms.balanceOf(userAccount)
      console.log('user balance', userBalance)
      const userCollection = []
      for (let i = 0; i < userBalance; i++) {
        const tokenHex = await terraforms.tokenOfOwnerByIndex(userAccount, i)
        const token = tokenHex.toNumber()
        userCollection.push(token)
      }

      setUserCastles(userCollection)
    }

    getCollection()
  }, [userAccount, terraforms])

  return (
    <Router>
      <div className="App">
        <Grid container spacing={2}>
          {/* The full playground */}
          <Grid item xs={12}>
            {/* Header / Navigation */}

            <Box
              style={{
                display: 'inline-block',
                padding: '10px 10px 10px 0px',
                marginRight: '10px',
              }}
            >
              <Link to={'/'} className={'logo'}>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: 'MathcastlesRemix-Regular' }}
                >
                  Terraforms <i>explorer</i>
                </Typography>
              </Link>
            </Box>
            <Box className={'nav-block'}>
              <Link to={'/map'} className={'nav-link'}>
                <Typography variant="h6">Map</Typography>
              </Link>
            </Box>
            <Box className={'nav-block'} sx={{ float: 'right' }}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                <i style={{ textDecoration: 'none', fontSize: '18px' }}>
                  {' '}
                  0xm3tatr0n{' '}
                  <a
                    href="https://twitter.com/0xm3tatr0n"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'underline', color: 'white' }}
                  >
                    twitter
                  </a>{' '}
                  |{' '}
                  <a
                    href="https://github.com/0xm3tatr0n"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'underline', color: 'white' }}
                  >
                    github
                  </a>
                </i>
              </Typography>
            </Box>
          </Grid>
          <Routes>
            <Route
              path={'/mine'}
              element={<Mine castles={userCastles} contract={terraforms} />}
            />
            <Route path={'/lookup'} element={<Lookup tokenId={tokenID} />} />
            <Route
              path={'/neighbourhood'}
              element={
                <Neighbourhood contract={terraforms} tokenId={tokenID} />
              }
            />
            <Route path={'/map'} element={<Map userParcels={userCastles} />} />
            <Route
              path={'/parcel'}
              element={<Parcel contract={terraforms} />}
            />
            <Route path={'/'} element={<Navigate to="/map" />} />
          </Routes>
        </Grid>
      </div>
    </Router>
  )
}

export default App
