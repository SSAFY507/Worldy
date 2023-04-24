import * as React from 'react';
import { useState, useEffect } from 'react';
import TutorialBackground from '../assets/images/TutorialBackground.png';
import JoshHoldingBook from '../assets/images/JoshHoldingBook.png';
import JoshCurious from '../assets/images/JoshCurious.png';
import { Style } from 'util';

type TutorialItemType = {
  imgsrc: string;
  contentText: string;
  contentCoreText?: string;
  contentItem: React.ReactNode;
  onClick?: () => void;
};

export default function Tutorial() {
  const name = '월디 킴';

  //   닉네임 입력창 관련/////////////////////////////////////
  const [nickName, setNickName] = useState<string>('');

  // 가능한 닉네임인가?
  const [nickNameState, setNickNameState] = useState<boolean | null>(null);

  //닉네임값 업데이트
  const handleCheckNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setNickName(inputText);
  };

  //닉네임 입력 버튼 관련 //////////////////////////////////////
  const [nickNameCheckBtnState, setNickNameCheckBtnState] =
    useState<boolean>(false);

  //닉네임 길이가 3~10자일 때만 체크 가능ㄴ
  useEffect(() => {
    setNickNameState(null);
    if (nickName.length >= 3 && nickName.length <= 10) {
      setNickNameCheckBtnState(true);
    } else {
      setNickNameCheckBtnState(false);
    }
  }, [nickName]);

  //닉네임이 Sunday(중복X)이면 true, 중복이면 false
  const checkNickName = () => {
    if (nickName === 'Sunday') setNickNameState(true);
    else setNickNameState(false);
  };

  //닉네임이 미중복 확인 됐으니 다음으로 넘어가기(submit)
  const handleSubmitNickName = () => {
    console.log('넘어가기', targetIndex);
    setTargetindex(1);
  };

  const eneterNickNameContentItem = (
    <div className='w-full  outline-blue-500 py-[10px] flex- flex-col justify-start items-center'>
      <div className='w-full h-fit outline-blue-200 flex flex-row justify-between items-center'>
        <input
          className='h-[60px] w-[90%] rounded-[10px] bg-[rgba(255,255,255,0.3)] text-white p-[10px] text-[25px] font-PtdRegular'
          type='text'
          value={nickName}
          placeholder='닉네임을 입력해주세요 (3~10자)'
          onChange={handleCheckNickName}
        />
        <button
          className='h-[60px] w-[60px] rounded-[10px] flex justify-center items-center'
          style={
            nickNameState
              ? { backgroundColor: '#18C609' }
              : nickNameCheckBtnState
              ? { backgroundColor: '#fed745' }
              : { backgroundColor: '#d9d9d9' }
          }
          onClick={nickNameState ? handleSubmitNickName : checkNickName}
        >
          {nickNameState ? ( //가능한 닉네임 확인되면 Next, 그 전까지는 Check
            /* next */
            <svg
              stroke='currentColor'
              fill='white'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='50px'
              width='50px'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z'></path>
            </svg>
          ) : (
            /* check */
            <svg
              stroke='currentColor'
              fill='white'
              strokeWidth='0'
              viewBox='0 0 24 24'
              height='50px'
              width='50px'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z'></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className=' h-[40px] w-full py-[10px] pl-[20px] text-[20px] flex justify-start items-center font-PtdRegular'
        style={
          nickNameState === null
            ? undefined
            : nickNameState
            ? { color: 'green' }
            : { color: 'red' }
        }
      >
        {nickNameState === null
          ? ''
          : nickNameState
          ? '사용 가능한 닉네임입니다.'
          : '이미 존재하는 닉네임입니다.'}
      </div>
    </div>
  );

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const hoveredStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.3)',
  };

  //////////////////////////////////////////////////// 관심있는 분야
  const interestsItems: string[] = ['언어', '역사', '지리', '경제', '없음'];

  const submitInterest = (index: number) => {
    console.log('선택한 관심 분야 : ', index);
  };

  const selectInterests = (
    <div className='outline outline-white h-[130px] py-[15px] flex justify-self-start'>
      <div className='w-5/6 h-full flex flex-row justify-between items-center '>
        {interestsItems.map((item, index) => (
          <button
            className='bg-[rgba(255,255,255,0.15)] rounded-[5px] h-2/3 mr-4 flex justify-center items-center font-PtdRegular text-[24px] text-white'
            style={{
              width: `${100 / interestsItems.length}%`,
              ...(hoveredIndex === index ? hoveredStyle : {}),
            }}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => submitInterest(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  /////////////////////////////////////////////////
  const TutorialItemList: TutorialItemType[] = [
    {
      imgsrc: JoshHoldingBook,
      contentText:
        '안녕, 내 이름은 월디야. 책 읽는 걸 매우 좋아해! 책을 읽다 보면 내가 경험해보지 못한 세상이 참 넓은 것 같아. 아차! 내 정신 좀 봐, ',
      contentCoreText: '넌 이름이 뭐야?',
      contentItem: eneterNickNameContentItem,
    },
    {
      imgsrc: JoshCurious,
      contentText: `${nickName}! 아주 멋진 이름이구나! 월디 세계를 탐험하기 위해서는 알아야할 것들이 많아. 하지만 내가 쉽고 빠르게 도와줄게!`,
      contentCoreText: '혹시 평소에 관심있는 분야가 있니?',
      contentItem: selectInterests,
    },
  ];

  const [targetIndex, setTargetindex] = useState<number>(0);

  return (
    <div
      className=' w-screen h-full'
      style={{
        backgroundImage: `url(${TutorialBackground})`,
        backgroundSize: '100%',
      }}
    >
      <div className='w-full h-full relative'>
        <div className='z-20 absolute w-1/4 h-full flex flex-row justify-end items-end'>
          <img
            className='h-[90%]'
            src={TutorialItemList[targetIndex].imgsrc}
            alt='조쉬조쉬조쉬'
          />
        </div>
        <div className='z-10 absolute top-1/2 bg-[rgba(0,0,0,0.8)] w-full h-1/2 flex justify-end'>
          <div className='h-full w-3/4 py-10 pl-20 pr-10'>
            <div className='w-3/5 h-full flex flex-col justify-between items-start'>
              <div className='outline-white h-[30px] w-full font-PtdLight text-[#f9c53a] text-[20px] flex justify-start items-center'>
                {name}
              </div>
              <div className='h-fit w-full my-[10px] text-white text-[30px] font-PtdExtraLight leading-[45px] py-[5px]'>
                {TutorialItemList[targetIndex].contentText}
                <div className='border-b-[1.5px] border-b-white border-solid w-fit font-PtdLight'>
                  {TutorialItemList[targetIndex].contentCoreText}
                </div>
              </div>
              <div className=' outline-white flex-1 w-full flex flex-col justify-end items-center'>
                <div className='w-full h-fit  outline-red-400'>
                  {TutorialItemList[targetIndex].contentItem}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
