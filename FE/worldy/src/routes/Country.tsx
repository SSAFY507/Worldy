import CountryMap from '../components/Explore/CountryMap';
import React from 'react'
import { useParams } from 'react-router';

function Country() {
  const params = useParams();
  const countryName = params.country || "";

  return (
    <>
      {/* <h1>여기는 {countryName} 이야</h1> */}
      <CountryMap />
    </>
  )
}

export default Country;