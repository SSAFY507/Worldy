import * as React from 'react';
import { useState, useEffect } from 'react';
import PathBg from '../../assets/images/HelloPageBackground.png';

import './LoaderHelloStyles.css';

type CountryWordList = {
  kor: string;
  eng: string;
  jap: string;
  chn: string;
};

export default function LoaderHello({ input }: { input: string }) {
  const [moveNav, setMoveNav] = useState<number>(1);

  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    console.log('inpit : ' , input)
    switch (input) {
      case 'northAmerica_America': {
        setChoosedCountry(countryList[0]);
        break;
      }
      case 'europe_UK': {
        setChoosedCountry(countryList[1]);
        break;
      }
      case 'europe_Spain': {
        setChoosedCountry(countryList[2]);
        break;
      }
      case 'europe_Italia': {
        setChoosedCountry(countryList[3]);
        break;
      }
      case 'europe_France': {
        setChoosedCountry(countryList[4]);
        break;
      }
      case 'africa_Egypt': {
        setChoosedCountry(countryList[5]);
        break;
      }
      case 'asia_Korea': {
        setChoosedCountry(countryList[6]);
        break;
      }
      case 'asia_Japen': {
        setChoosedCountry(countryList[7]);
        break;
      }
    }
  }, []);

  const countryList: CountryWordList[] = [
    {
      kor: '미국으로 이동합니다.',
      eng: 'Move to the US.',
      jap: 'アメリカに行きます。',
      chn: '去美国吧。',
    },
    {
      kor: '영국으로 이동합니다.',
      eng: 'Move to the UK.',
      jap: 'イギリスに行きます。',
      chn: '去英国吧。',
    },
    {
      kor: '스페인으로 이동합니다.',
      eng: 'Move to Spain.',
      jap: 'スペインに行きます。',
      chn: '去西班牙吧。',
    },
    {
      kor: '이탈리아로 이동합니다.',
      eng: 'Move to Italy.',
      jap: 'イタリアに行きます。',
      chn: '去意大利吧。',
    },
    {
      kor: '프랑스로 이동합니다.',
      eng: 'Move to France.',
      jap: 'フランスに行きます。',
      chn: '去法国吧。',
    },
    {
      kor: '이집트로 이동합니다.',
      eng: 'Move to Egypt.',
      jap: 'エジプトに移動します。',
      chn: '去埃及吧。',
    },
    {
      kor: '한국으로 이동합니다.',
      eng: 'Move to Korea.',
      jap: '韓国に移動します。',
      chn: '去韩国吧。',
    },
    {
      kor: '일본으로 이동합니다.',
      eng: 'Move to Japan.',
      jap: '日本に行きます。',
      chn: '去日本吧。',
    },
  ];

  const [choosedCountry, setChoosedCountry] = useState<CountryWordList>(
    countryList[index]
  );

  return (
    <div
      className=' w-screen h-full'
      style={{
        backgroundImage: `url(${PathBg})`,
        backgroundSize: '100%',
      }}
    >
      <div className='text-white font-PtdBold text-[85px] w-full h-full relative hellos'>
        {/* <button
          className='w-10 h-10 bg-white absolute text-[10px]'
          onClick={() => {
            setMoveNav(moveNav === 4 ? -1 : moveNav + 1);
          }}
        >
          버튼
        </button> */}
        <div className='absolute top-1/2 left-1/2 w-[1500px] h-[800px] pt-[200px] -translate-x-1/2 -translate-y-1/2'>
          <span
            className={`absolute h-[100px] w-[1500px] place-content-center grid Hoonsfirst ${
              moveNav === -1
                ? 'RD'
                : moveNav === 0
                ? 'CT'
                : moveNav === 1
                ? 'LB'
                : 'DD'
            }`}
          >
            {choosedCountry.kor}
          </span>
          <span
            className={`absolute h-[100px] w-[1500px] place-content-center grid Hoonssecond ${
              moveNav === 0
                ? 'RD'
                : moveNav === 1
                ? 'CT'
                : moveNav === 2
                ? 'LB'
                : 'DD'
            }`}
          >
            {choosedCountry.eng}
          </span>
          <span
            className={`absolute h-[100px] w-[1500px] place-content-center grid Hoonsthird ${
              moveNav === 1
                ? 'RD'
                : moveNav === 2
                ? 'CT'
                : moveNav === 3
                ? 'LB'
                : 'DD'
            }`}
            style={{ fontWeight: 'bold' }}
          >
            {choosedCountry.jap}
          </span>
          <span
            className={`absolute h-[100px] w-[1500px] place-content-center grid Hoonsfourth ${
              moveNav === 2
                ? 'RD'
                : moveNav === 3
                ? 'CT'
                : moveNav === 4
                ? 'LB'
                : 'DD'
            }`}
            style={{ fontWeight: 'bold' }}
          >
            {choosedCountry.chn}
          </span>
        </div>
      </div>
    </div>
  );
}
