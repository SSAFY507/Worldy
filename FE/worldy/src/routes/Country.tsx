import React, { useMemo, useRef, useState } from 'react';

import CountryMap from '../components/Explore/CountryMap';
import CountrySpeak from '../components/Explore/CountrySpeak';
import WorldMapNavbarComponent from '../components/Explore/WorldMapNavbarComponent';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Country = () => {
  const params = useParams();
  const countryName: string = params.country || '';

  const [selectAsset, setSelectAsset] = useState<string>("");
  const [hoborAsset, setHoborAsset] = useState<string>("");
  // ["paintBox", "historyBox", "quizBox", "foodBox", "personalityBox",  "newsBox", "back"
  const GetSelectAssetName = ((name:string) => {
    setSelectAsset(name);
  });
  const GetHorborAsset = ((name:string) => {
    setHoborAsset(name);
  });

  return (
    <div className='relative'>
      <div className='z-20 absolute top-0 left-0 w-full h-20'>
        <WorldMapNavbarComponent countryName={countryName} GetSelectAssetName={GetSelectAssetName} selectAsset={selectAsset} hoborAsset={hoborAsset} />
      </div>
      {(selectAsset)
        ?
        <div className="z-10 absolute w-full h-full ">
          <CountrySpeak countryName={countryName} GetSelectAssetName={GetSelectAssetName} selectAsset={selectAsset}  />
        </div>
        :
        null
      }
      <div className={`${(selectAsset) ? "blur z-5" : ""}`}>
        <CountryMap countryName={countryName} GetSelectAssetName={GetSelectAssetName} selectAsset={selectAsset} GetHorborAsset={GetHorborAsset}/>
      </div>
    </div>
  );
};

export default Country;
