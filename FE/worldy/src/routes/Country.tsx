import React, { useMemo, useRef, useState } from 'react';

import CountryMap from '../components/Explore/CountryMap';
import CountrySpeak from '../components/Explore/CountrySpeak';
import WorldMapNavbarComponent from '../components/Explore/WorldMapNavbarComponent';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import LoaderHello from '../components/Loaders/LoaderHello';
import pathBg from '../assets/images/MainPageBackground.png';

const Country = () => {
  const params = useParams();
  const countryName: string = params.country || '';

  const [selectAsset, setSelectAsset] = useState<string>('');
  const [hoborAsset, setHoborAsset] = useState<string>('');
  // ["paintBox", "historyBox", "quizBox", "foodBox", "personalityBox",  "newsBox", "back"
  const GetSelectAssetName = (name: string) => {
    setSelectAsset(name);
  };
  const GetHorborAsset = (name: string) => {
    setHoborAsset(name);
  };

  const url = new URL(window.location.href);
  const pathNation: string = url.pathname.split('/')[2];
  console.log(pathNation);

  const [endLoader, setEndLoader] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setEndLoader(true);
    }, 7000);
  }, []);

  return (
    <div className='relative'>
      {/* {!endLoader ? ( */}
      <div
        className={`absolute top-0 left-0 w-screen h-screen flex flex-col justify-start items-center z-50 ${
          endLoader ? 'hidden' : 'visible'
        }`}
      >
        <div className='h-20 w-full grid place-content-center font-PtdBold text-[30px] bg-black'></div>
        {/* <div className='absolute h-20 w-full top-0 left-0 bg-black z-20' />
          <div className='absolute top-20 left-0 bg-black z-50'> */}
        <LoaderHello input={pathNation} />
        {/* </div> */}
      </div>
      {/* // ) : ( */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='z-20 absolute top-0 left-0 w-full h-20'>
          <WorldMapNavbarComponent
            countryName={countryName}
            GetSelectAssetName={GetSelectAssetName}
            selectAsset={selectAsset}
            hoborAsset={hoborAsset}
          />
        </div>
        {selectAsset ? (
          <div className='z-10 absolute w-full h-full '>
            <CountrySpeak
              countryName={countryName}
              GetSelectAssetName={GetSelectAssetName}
              selectAsset={selectAsset}
            />
          </div>
        ) : null}
        <div className={`${selectAsset ? 'blur z-5' : ''}`}>
          <CountryMap
            countryName={countryName}
            GetSelectAssetName={GetSelectAssetName}
            selectAsset={selectAsset}
            GetHorborAsset={GetHorborAsset}
          />
        </div>
      </div>
      {/* // )} */}
    </div>
  );
};

export default Country;
