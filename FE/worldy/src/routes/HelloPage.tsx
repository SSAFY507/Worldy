import * as React from 'react';
import { useState, useEffect } from 'react';
import pathBg from '../assets/images/HelloPageBackground.png';

import '../styles/HelloPageStyles.css';

type CountryWordList = {
  kor: string;
  eng: string;
  jap: string;
  chn: string;
};

export default function HelloPage() {
  const [moveNav, setMoveNav] = useState<number>(1);

  const countryList: CountryWordList[] = [
    {
      kor: '미국으로 이동합니다.',
      eng: 'Move to the US',
      jap: 'アメリカに行きます。',
      chn: '搬到美国。',
    },
    {
      kor: '영국으로 이동합니다.',
      eng: 'Move to the UK',
      jap: 'イギリスに行きます。',
      chn: '搬到英国。',
    },
    {
      kor: '스페인으로 이동합니다.',
      eng: 'Move to Spain',
      jap: 'スペインに行きます。',
      chn: '去西班牙。',
    },
    {
      kor: '이탈리아로 이동합니다.',
      eng: 'Move to Italy',
      jap: 'イタリアに行きます。',
      chn: '去意大利吧。',
    },
    {
      kor: '프랑스로 이동합니다.',
      eng: 'Move to France',
      jap: 'フランスに行きます。',
      chn: '去法国。',
    },
    {
      kor: '이집트로 이동합니다.',
      eng: 'Move to Egypt',
      jap: 'エジプトに移動します。',
      chn: '去埃及。',
    },
    {
      kor: '한국으로 이동합니다.',
      eng: 'Move to Korea',
      jap: '韓国に移動します。',
      chn: '去韩国吧。',
    },
    {
      kor: '미국으로 이동합니다.',
      eng: 'Move to Japan',
      jap: '日本に行きます',
      chn: '去日本吧',
    },
  ];

  const [choosedCountry, setChoosedCountry] = useState<CountryWordList>(
    countryList[0]
  );

  const country: string = window.location.href;

  useEffect(() => {
    if (country === '미국') {
      setChoosedCountry(countryList[0]);
    } else if (country === '영국') {
      setChoosedCountry(countryList[1]);
    } else if (country === '스페인') {
      setChoosedCountry(countryList[2]);
    } else if (country === '이탈리아') {
      setChoosedCountry(countryList[3]);
    } else if (country === '프랑스') {
      setChoosedCountry(countryList[4]);
    } else if (country === '이집트') {
      setChoosedCountry(countryList[5]);
    } else if (country === '한국') {
      setChoosedCountry(countryList[6]);
    } else {
      setChoosedCountry(countryList[7]);
    }
  }, []);

  //   useEffect(() => {
  //     const moveInterval = setInterval(() => {
  //       const prev = moveNav;
  //       if (prev === 3) {
  //         clearInterval(moveInterval);
  //         setMoveNav(0);
  //       } else {
  //         setMoveNav(prev + 1);
  //       }
  //     }, 1000);
  //   }, [choosedCountry]);

  return (
    <div
      className=' w-screen h-full'
      style={{
        backgroundImage: `url(${pathBg})`,
        backgroundSize: '100%',
      }}
    >
      <div className='text-white font-PtdBold text-[100px] w-full h-full relative hellos'>
        <span
          className={`absolute transition-all duration-[800ms] ease-in-out ${
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
          className={`absolute   transition-all duration-[800ms] ease-in-out ${
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
          className={`absolute  transition-all duration-[800ms] ease-in-out ${
            moveNav === 1
              ? 'RD'
              : moveNav === 2
              ? 'CT'
              : moveNav === 3
              ? 'LB'
              : 'DD'
          }`}
        >
          {choosedCountry.jap}
        </span>
        <span
          className={`absolute  transition-all duration-[800ms] ease-in-out ${
            moveNav === 2
              ? 'RD'
              : moveNav === 3
              ? 'CT'
              : moveNav === 4
              ? 'LB'
              : 'DD'
          }`}
        >
          {choosedCountry.chn}
        </span>
      </div>
    </div>
  );
}
