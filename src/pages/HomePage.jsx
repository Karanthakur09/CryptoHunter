import React, { memo } from 'react'
import Banner from '../components/banner/Banner'
import CoinsTable from '../components/CoinsTable'

function HomePage() {
  return (
    <>
    <Banner />
    <CoinsTable/>
    </>
  )
}

export default memo(HomePage)