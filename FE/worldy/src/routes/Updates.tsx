import * as React from 'react';
import { useState, useEffect } from 'react';
import testUpdateThumbnail from '../assets/images/testUpdateThumbnail.png';
import moment from 'moment';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';
import '../styles/UpdateCardStyle.css';
import Pagination from '../components/Pagination';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';

type updateLogType = {
  id: number;
  title: string;
  img: string;
  date: string;
  content: string;
};

export default function Updates() {
  const nowTime = moment();

  const myImageList = {
    tempImage: testUpdateThumbnail,
  };

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 1000);
    }
  }, [isLoaded]);

  ///////////////////////////////////////

  const pageSize: number = 8; //페이지마다 몇 개?

  const [posts, setPosts] = useState<updateLogType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지 state
  const [totalPages, setTotalPages] = useState<number>(1); //총 페이지 수 값

  const getPosts = async (page: number) => {
    //API 호출로 데이터 갖고오기
    /* 
      const response = await CustomAxios({...});
      const data = response.data;
      setTotalPages(response.totalPages); //API에서 전체 페이지 수 확인
     */

    //실제 API 적용 이전 예시
    const data: updateLogType[] = Array.from(
      { length: pageSize },
      (_, index) => ({
        id: index + 1 + (page - 1) * pageSize,
        title: `[#${index + 1 + (page - 1) * pageSize}]`,
        img: loadedImages.tempImage,
        date: moment().format('YYYY-MM-DD'),
        content: `${index}예시 콘텐츠 텍스트 값`,
      })
    );
    setTotalPages(23); //예시로 전체 피이지 수 12 설정
    setPosts(data); //
  };

  //Pagination 버튼으로 currentPage값이 바뀌면 getPosts로 해당 페이지의 데이터들을 로드
  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getDiffDates = (date: string): string => {
    const diff = nowTime.diff(date, 'days');
    if (diff >= 7) {
      return `${Math.floor(diff / 7)}주 전`;
    }
    return diff === 0 ? '오늘' : diff === 1 ? '어제' : `${diff}일 전`;
  };

  const updateCard = (inputData: updateLogType) => {
    return (
      <div
        className='w-[23%] mx-[1%]  outline-[rgba(66,50,123,1)] h-[45%] cursor-pointer rounded-[10px]'
        key={inputData.id}
      >
        <div className='outline-red-600 h-[70%] overflow-hidden'>
          <img src={inputData.img} alt='업데이트 섬네일' />
        </div>
        <div className='h-[30%]  flex flex-col justify-stretch items-start py-[5px] px-[15px]'>
          <div className='h-[20px] flex justify-center items-center text-[15px] text-cyan-400 font-PtdSemiBOld'>
            밸런스 업데이트
          </div>
          <div className='font-PtdBold text-[22px] flex flex-1 justify-start items-center outline-green-500 w-[95%] '>
            <span className='block text-ellipsis overflow-hidden whitespace-nowrap'>
              {`${inputData.title} 1.0.1 패치노트 긴 제목 긴 제목`}
            </span>
          </div>
          <div className='h-[20px] text-[15px] font-PtdMedium flex justify-start items-center'>
            {inputData.date} ({getDiffDates(inputData.date)})
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loadedAll ? (
        <div className='w-full h-full max-h-full max-w-full bg-white flex justify-center items-center flex-col'>
          <div className=' outline-black w-[80%] h-[95%] p-[10px] flex justify-between items-center flex-col'>
            <div
              className='  outline-red-500 w-full h-[100px] flex justify-start items-center 
            bg-gradient-to-r from-[rgba(33,25,62,1)] to-[rgba(66,50,123,1)]
            '
            >
              <div className='w-[1%] h-full bg-white'></div>
              <span className='font-PtdSemiBOld text-[50px] ml-[40px] text-white w-fit'>
                업데이트
              </span>
              {/* <span className='font-PtdSemiBOld text-[40px] ml-[10px] text-white w-fit text-center'>
            {nowTime.format('YYYY-MM-DD')} ({nowTime.format('ddd')})
          </span> */}
              <div className='flex-1 h-full flex justify-end items-start'>
                <div className='outline-white w-[50px] h-[50px] border border-solid border-b-0 border-r-0 border-t-[50px] border-l-[50px] border-t-white border-l-[rgba(33,25,62,1)]'></div>
              </div>
              <div className='w-[1%] h-full bg-white'></div>
            </div>
            <div className=' outline-black w-full max-h-full flex-1 mt-[20px] flex flex-col justify-between'>
              <div className=' outline-red-500 flex flex-wrap  justify-start items-center h-[90%] py-[10px]'>
                {posts.map((post) => updateCard(post))}
              </div>
              <div className=' outline-green-300 w-full flex  justify-center items-center h-[8%]'>
                <Pagination //페이지들 버튼
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-white w-full h-full'>
          <LoaderPyramid text='Loading...' />
        </div>
      )}
    </>
  );
}
