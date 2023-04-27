import * as React from 'react';
import { useState, useEffect } from 'react';
import pathC2Icon from '../assets/images/thumb2.png';
import moment from 'moment';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import '../styles/UpdateCardStyle.css';

type updateLogType = {
  title: string;
  img: string;
  date: string;
  content: string;
};

export default function Updates() {
  const nowTime = moment();

  const myImageList = {
    tempImage: pathC2Icon,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 500);
    }
  }, [isLoaded]);

  const updateLogs: updateLogType[] = [
    {
      title: '1.0.1 패치노트',
      img: loadedImages.tempImage,
      date: '2023-04-20',
      content:
        '패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으패치노트으으',
    },
    {
      title: '1.0.1 패치노트',
      img: pathC2Icon,
      date: '2023-04-20',
      content: '패치노트으으',
    },
    {
      title: '1.0.1 패치노트',
      img: pathC2Icon,
      date: '2023-04-20',
      content: '패치노트으으',
    },
    {
      title: '1.0.1 패치노트',
      img: pathC2Icon,
      date: '2023-04-20',
      content: '패치노트으으',
    },
    // {
    //   title: '1.0.1 패치노트',
    //   img: pathC2Icon,
    //   date: '2023-04-20',
    //   content: '패치노트으으',
    // },
    // {
    //   title: '1.0.1 패치노트',
    //   img: pathC2Icon,
    //   date: '2023-04-20',
    //   content: '패치노트으으',
    // },
    // {
    //   title: '1.0.1 패치노트',
    //   img: pathC2Icon,
    //   date: '2023-04-20',
    //   content: '패치노트으으',
    // },
  ];

  const updateLogCard = (input: updateLogType) => {
    return (
      <article className='card w-[300px] h-[400px]'>
        <div className='temporary_text outline outline-white w-full h-fit py-[5px]'>
          <img className='w-full h-full' src={input.img} alt='img' />
        </div>
        <div className='card_content'>
          <span className='card_title'>{input.title}</span>
          <span className='card_subtitle'>{input.date}</span>
          <p className='card_description'>{input.content}</p>
        </div>
      </article>
    );
  };

  return (
    <div className='w-full h-full max-h-full max-w-full bg-white flex justify-center items-center flex-col'>
      <div className='outline outline-black w-[80%] h-[90%] p-[10px] flex justify-between items-center flex-col'>
        <div
          className=' outline-red-500 w-full h-[100px] flex justify-start items-center 
          bg-gradient-to-r from-[rgba(33,25,62,1)] to-[rgba(66,50,123,1)]
        '
        >
          <span className='font-PtdSemiBOld text-[50px] ml-[40px] text-white w-fit'>
            업데이트 -
          </span>
          <span className='font-PtdSemiBOld text-[40px] ml-[10px] text-white w-fit text-center'>
            {nowTime.format('YYYY-MM-DD')} ({nowTime.format('ddd')})
          </span>
          <div className='flex-1 h-full flex justify-end items-start'>
            <div className='outline-white w-[50px] h-[50px] border border-solid border-b-0 border-r-0 border-t-[50px] border-l-[50px] border-t-white border-l-[rgba(33,25,62,1)]'></div>
          </div>
        </div>
        <div className='outline outline-black w-full max-h-full flex-1 mt-[20px] flex flex-wrap justify-between overflow-y-scroll'>
          {updateLogs.map((item, key) => (
            <div key={key} className='m-[10px]'>
              {updateLogCard(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
