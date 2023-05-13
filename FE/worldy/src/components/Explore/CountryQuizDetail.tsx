import React, { useEffect, useState } from 'react';

import { ReactComponent as One } from '../../assets/images/1.svg';
import QuizModal from '../QuizModal';
import { ReactComponent as QuizTitleIcon } from '../../assets/images/quiztitle.svg';
import { ScrappedQuizType } from '../../routes/MyPage';
import { ReactComponent as Start } from '../../assets/images/START.svg';
import { ReactComponent as Three } from '../../assets/images/3.svg';
import { ReactComponent as Two } from '../../assets/images/2.svg';

const tempScrappedQuizList: ScrappedQuizType[] = [
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'ox',
    category: 'cul',
    image: '',
    content: '일본의 모든 도시는 한국의 모든 도시와 표준시가 1시간 차이난다.',
    answer: 'O',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: '일본은 한국보다 실제 시간이 30분 빠릅니다',
    hintType: true, //힌트
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: true, //맞춘 문제인가
    commentary:
      '한국의 중앙 자오선은 동경 127.5°이며 일본의 중앙 자오선은 동경 135°로 일본이 30분 더 빠릅니다. 그러나 일제의 잔재로, 실제로는 일본 표준 자오선인 동경 135°에 맞춰 표준시를 사용하고 있습니다. 반면 북한은 광복 70주년에 표준시를 다시 30분 늦췄고 한국은 북한과 30분의 시차를 가지는 상황입니다.',
  },
  {
    quizId: 0,
    nationName: '중국',
    level: 2,
    quizType: 'multi',
    category: 'cul',
    image: '',
    content:
      '중국의 역사는 매우 오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요오래되고 복잡하며 다양한 왕조들이 국가를 지배하였습니다. 아래 왕조들 중 가장 오래된 왕조를 선택하세요..',
    answer: '하나라',
    multiFirst: '진나라진나라진나라', //1번
    multiSecond: '명나라', //2번
    multiThird: '하나라', //3번
    multiFourth: '성나라', //4번
    hint: '힌트 무슨 유형인가', //힌트 유형
    hintType: true, //힌트
    userAnswer: '1', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
    commentary: '꼬맨터리',
  },
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'blank',
    category: 'cul',
    image: '',
    content: '세종대왕.',
    answer: '세종대왕',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: 'ㅅㅈㄷㅇ', //힌트 유형
    hintType: true, //힌트
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
    commentary: '꼬맨터리',
  },
  {
    quizId: 0,
    nationName: '대한민국',
    level: 1,
    quizType: 'ox',
    category: 'cul',
    image: '',
    content: '대한민국에서 쓰이는 언어는 한극어이다.',
    answer: 'X',
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: '힌트 무슨 유형인가', //힌트 유형
    hintType: false, //힌트
    userAnswer: 'O', //유저가 적은 정답(맞았으면 null)
    success: false, //맞춘 문제인가
    commentary: '꼬맨터리',
  },
];

/*  "quizId": 1,
    "nationName": "대한민국",
    "level": 2,
    "quizType": "ox",
    "category": "etc",
    "image": "",
    "content": "법률상 한국의 국화는 무궁화이다.",
    "answer": "x",
    "multiFirst": null,
    "multiSecond": null,
    "multiThird": null,
    "multiFourth": null,
    "hint": "",
    "hintType": false,
    "commentary": "법률상으로는 무궁화를 국화로 인정할 근거가 없습니다. 하지만 행정안전부 홈페이지에서 무궁화를 대한민국의 국화라고 명시해두었고, 1963년 제정된 나라문장에서 무궁화 형태가 반영되는 등 보편적으로 무궁화가 상징적인 꽃으로 인식되고 있습니다.",
    "userAnswer": null,
    "success": true */

const CountryQuizDetail = () => {
  const [counting, setCounting] = useState<number>(-2);
  const [quizModalState, setQuizModalState] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number>(0);
  const handleQuizModal = (select: number) => {
    setSelectedQuizId(select);
    setTimeout(() => {
      setQuizModalState(true);
    }, 100);
  };

  useEffect(() => {
    if (counting > -1) {
      setTimeout(() => {
        setCounting((i) => i - 1);
        console.log(counting);
      }, 1000);
    }
  }, [counting]);

  return (
    <div className='h-full w-1/3 mt-20 flex '>
      {counting > -2 ? (
        <div className='h-full w-full flex items-center justify-center '>
          {counting === 3 ? (
            <div className='absolute'>
              <Three />
            </div>
          ) : null}
          {counting === 2 ? (
            <div className='absolute'>
              <Two />
            </div>
          ) : null}
          {counting === 1 ? (
            <div className='absolute'>
              <One />
            </div>
          ) : null}
          {counting === 0 ? (
            <div className='absolute'>
              <Start />
            </div>
          ) : null}
          {counting === -1 ? (
            <div className='absolute h-[1100px]'>
              <QuizModal
                input={tempScrappedQuizList[selectedQuizId]}
                closeModal={() => setQuizModalState(false)}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className='h-full w-full flex items-center justify-center'>
          <div className='absolute translate-y-[-120%]'>
            <QuizTitleIcon />
          </div>
          <div className='h-1/4 w-full flex flex-col shadow-xl '>
            <div className='h-1/6 w-full bg-[#61C7BB] rounded-t-xl shadow-3xl' />
            <div className='h-5/6 w-full flex flex-col rounded-b-xl bg-white shadow-xl'>
              <div className='h-1/2 w-full flex flex-col justify-center items-center pt-10'>
                <button
                  className='h-[50px] w-[300px] flex justify-center items-center border-solid border-[1px] bordedr-[#A7A7A7] rounded-3xl shadow-lg text-xl text-[#A7A7A7]'
                  onClick={() => {
                    setCounting(3);
                  }}
                >
                  START
                </button>
              </div>
              <div className='h-1/3 w-full text-xs opacity-60 font-PtdLight text-center text-[#A7A7A7] pt-5'>
                버튼을 누르면 3초 후 문제가 공개됩니다.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryQuizDetail;
