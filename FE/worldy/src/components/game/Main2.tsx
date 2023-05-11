// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { Route, useParams } from 'react-router';
// import Room from './Room';
// import CreateGame from '../create/CreateGame';
// import Game2D from './Game2D';
// import Game3D from './Game3D';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import { useLocation } from "react-router-dom";
// import QuizModal from '../QuizModal';
// import { log } from 'console';


// export type ScrappedQuizType = {
//   quizId: number; //퀴즈 id
//   nationName: string; //국가명
//   level: number; //퀴즈 수준
//   quizType: string; //퀴즈 유형
//   category: string; //카테고리
//   image: string; //이미지
//   content: string; //문제
//   answer: string; //정답
//   multiFirst: string | null; //1번
//   multiSecond: string | null; //2번
//   multiThird: string | null; //3번
//   multiFourth: string | null; //4번
//   hint: boolean; //힌트
//   commentary: string; //힌트 유형
//   userAnswer: string | null; //유저가 적은 정답(맞았으면 null)
//   success: boolean; //맞춘 문제인가
//   explanation?: string;
// };

// let socket : any;
// let ws : any;

export default function Main() {

//   let roomData: any = null;
//   const params = useParams();
//   const location = useLocation();
//   const loginUser = '2756798359';


//   roomData = location.state.value;

//   const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzU3Mzg5MTAxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4Mzc3NTAxMX0.FGXDtMPT4TZdwoUDUc98lZNlYI7d4MK2YYu63b7nvQiJdzY2zItjIgmOAsM5_Y4hKIPv2eU5o9gOwdbgyRc8uQ  '
//   let headers = { Authorization: `Bearer ${accessToken}` };
//   let quizData: any = null;

//   useEffect(() => {
//     // 소켓 연결
//     socket = new SockJS('https://k8a507.p.ssafy.io/api/stomp/game');
//     ws = Stomp.over(()=>socket);
//     ws.connect(headers, (frame: any) => {
//       console.log('소켓 연결')
//       console.log(ws);
      
//       subscribe();

//     },{},()=>{console.log("연결 종료");
//     });
//   }, [])

//   function subscribe() {

//     ws.subscribe(`/sub/${params.id}`, (event :any) => {
//       const received = JSON.parse(event.body);

//       if(received.type === 'quiz') {
//         quizData = received.quizDto;
        
//         // console.log('quizData');
//         // console.log(quizData);
        
//         if(quizData.multiAnswerList) {
//           setQuiz((prevState:any ) => ({
//             ...prevState,
//             quizId: quizData.quizId,
//             nationName : quizData.nation.nationName,
//             level : quizData.level,
//             quizType : quizData.quizType,
//             category : quizData.catetory,
//             image : quizData.image,
//             content : quizData.content,
//             answer : quizData.answer,
//             multiFirst : quizData.multiAnswerList[0].answer,
//             multiSecond : quizData.multiAnswerList[1].answer,
//             multiThird : quizData.multiAnswerList[2].answer,
//             multiFourth : quizData.multiAnswerList[3].answer,
//             hint : quizData.hintType,
//             commentary : quizData.hint,
//             explanation : quizData.commentary
//           }))

//         } else {
//           setQuiz((prevState:any ) => ({
//             ...prevState,
//             quizId: quizData.quizId,
//             nationName : quizData.nation.nationName,
//             level : quizData.level,
//             quizType : quizData.quizType,
//             category : quizData.catetory,
//             image : quizData.image,
//             content : quizData.content,
//             answer : quizData.answer,
//             hint : quizData.hintType,
//             commentary : quizData.hint,
//             explanation : quizData.commentary
//           }))
//         }
//         setQuizModalState(true);
//       }
//     });
//   }


//   // 참여한 플레이어 데이터 세팅하기
//   function setGameData() {

//     let _p1 = roomData.user1;
//     let _p2 = roomData.user2;
//     let _p3 = roomData.user3;
//     let _p4 = roomData.user4;
//     let myId = '';
//     let myNum = 0;
//     const ps = [_p1, _p2, _p3, _p4];

//     ps.forEach((e, index) => {
//       if (e.kakaoId === loginUser) {
//         myId = e.kakaoId;
//         myNum = index + 1;
//       }
//     });

//     setP1((prevState) => ({
//       ...prevState,
//       playerId: _p1.kakaoId,
//       playerNum: 1,
//       name: '설희',
//       type: 'player',
//       game: {
//         ...prevState.game,
//         location: 0,
//         balance: 500,
//         desert: 0,
//         state: false,
//         dice1: 0,
//         dice2: 0,
//         dice: 0,
//         isDouble: false,
//         own: [],
//         lap: 0,
//         ranking: 0,
//       }
//     }))

//     setP2((prevState) => ({
//       ...prevState,
//       playerId: _p2.kakaoId,
//       playerNum: 2,
//       name: '성훈',
//       type: 'player',
//       game: {
//         ...prevState.game,
//         location: 0,
//         balance: 500,
//         desert: 0,
//         state: false,
//         dice1: 0,
//         dice2: 0,
//         dice: 0,
//         isDouble: false,
//         own: [],
//         lap: 0,
//         ranking: 0,
//       }
//     }))

//     setP3((prevState) => ({
//       ...prevState,
//       playerId: _p3.kakaoId,
//       playerNum: 3,
//       name: '미희',
//       type: 'player',
//       game: {
//         ...prevState.game,
//         location: 0,
//         balance: 500,
//         desert: 0,
//         state: false,
//         dice1: 0,
//         dice2: 0,
//         dice: 0,
//         isDouble: false,
//         own: [],
//         lap: 0,
//         ranking: 0,
//       }
//     }))

//     setP4((prevState) => ({
//       ...prevState,
//       playerId: _p4.kakaoId,
//       playerNum: 4,
//       name: '원규',
//       type: 'player',
//       game: {
//         ...prevState.game,
//         location: 0,
//         balance: 500,
//         desert: 0,
//         state: false,
//         dice1: 0,
//         dice2: 0,
//         dice: 0,
//         isDouble: false,
//         own: [],
//         lap: 0,
//         ranking: 0,
//       }
//     }))

//     setMe((prevState) => ({
//       ...prevState,
//       playerId: myId,
//       playerNum: myNum,
//       name: '내 아이디',
//       type: 'player',
//       game: {
//         ...prevState.game,
//         location: 0,
//         balance: 500,
//         desert: 0,
//         state: false,
//         dice1: 0,
//         dice2: 0,
//         dice: 0,
//         isDouble: false,
//         own: [],
//         lap: 0,
//         ranking: 0,
//       }
//     }))

//     // console.log('플레이어 데이터 전송 >>>')
//     // ws.send("/pub/game/player", {}, JSON.stringify(roomData));
//   }




//   const [contents, setContents] = useState<String>('');
//   const [mode, setMode] = useState<boolean>(true);
//   const [start, setStart] = useState<boolean>(false);
//   const [data, setData] = useState<Object[]>();
//   const [metaData, setMetaData] = useState<Object>({
//     currentLocation: 0,
//     dice1: 0,
//     dice2: 0,
//     dice: 0,
//     turn: 1,
//     turnOver: false,
//     isDouble: false,
//   });
//   // 백으로부터 응답 받은 데이터
//   let res = {};




//   // 플레이어 데이터 세팅
//   const [p1, setP1] = useState<Player>({
//     playerId: "",
//     playerNum: 1,
//     name: "",
//     type: 'player',
//     game: {
//       location: 0,
//       balance: 500,
//       desert: 0,
//       state: false,
//       dice1: 0,
//       dice2: 0,
//       dice: 0,
//       isDouble: false,

//       own: [],
//       lap: 0,
//       ranking: 0,
//     },
//   })
//   const [p2, setP2] = useState<Player>({
//     playerId: "",
//     playerNum: 2,
//     name: "",
//     type: 'player',
//     game: {
//       location: 0,
//       balance: 500,
//       desert: 0,
//       state: false,
//       dice1: 0,
//       dice2: 0,
//       dice: 0,
//       isDouble: false,
//       own: [],
//       lap: 0,
//       ranking: 0,
//     },
//   })

//   const [p3, setP3] = useState<Player>({
//     playerId: "",
//     playerNum: 3,
//     name: "",
//     type: 'player',
//     game: {
//       location: 0,
//       balance: 500,
//       desert: 0,
//       state: false,
//       dice1: 0,
//       dice2: 0,
//       dice: 0,
//       isDouble: false,
//       own: [],
//       lap: 0,
//       ranking: 0,
//     },
//   })

//   const [p4, setP4] = useState<Player>({
//     playerId: "",
//     playerNum: 4,
//     name: "",
//     type: 'player',
//     game: {
//       location: 0,
//       balance: 500,
//       desert: 0,
//       state: false,
//       dice1: 0,
//       dice2: 0,
//       dice: 0,
//       isDouble: false,
//       own: [],
//       lap: 0,
//       ranking: 0,
//     },
//   })

//   const [me, setMe] = useState<Player>({
//     playerId: "",
//     playerNum: 4,
//     name: "",
//     type: 'player',
//     game: {
//       location: 0,
//       balance: 500,
//       desert: 0,
//       state: false,
//       dice1: 0,
//       dice2: 0,
//       dice: 0,
//       isDouble: false,
//       own: [],
//       lap: 0,
//       ranking: 0,
//     },
//   })



//   const p = [p1, p2, p3, p4]
//   const setP = [setP1, setP2, setP3, setP4]

//   // FOR 퀴즈
//   const [quizModalState, setQuizModalState] = useState<boolean>(false);
//   const [quiz, setQuiz] = useState<ScrappedQuizType>({
//     quizId: 0,
//     nationName: '',
//     level: 0,
//     quizType: '',
//     category: '',
//     image: '',
//     content: '',
//     answer: '',
//     multiFirst: null, //1번
//     multiSecond: null, //2번
//     multiThird: null, //3번
//     multiFourth: null, //4번
//     hint: true, //힌트
//     commentary: '',
//     userAnswer: '', //유저가 적은 정답(맞았으면 null)
//     success: true, //맞춘 문제인가
//     explanation: '',
//   })
//   /// END FOR 퀴즈

//   // useEffect(() => {
//   //     console.log('변경된 퀴즈>>>>')
//   //     console.log(quiz)

//   // }, [quiz])

//   return (<>
//     <div className='w-screen h-screen bg-[#FFFDF4]'>
//       <div className='w-full bg-[#FFFDF4] flex items-start justify-around fixed-top z-50'>
//         <div className='w-full h-[60px] flex items-end justify-end'>
//           {/* <img className='w-[100px] h-[54px] flex items-end mt-[20px] ml-[60px] object-cover' src='/game/LogoColored.png' alt='로고이미지'></img> */}
//           <div className='w-[100px] h-[40px] rounded-[4px] mr-[120px] flex justify-center items-center rounded-full bg-blue-400 text-[18px] text-white hover:cursor-pointer hover:bg-blue-500'
//             onClick={() => {
//               setMode(!mode);
//             }}
//           >3D 모드</div>
//         </div>
//       </div>
//       {!start && <div className='w-full h-full bg-[#FFFDF4] flex flex-col justify-center items-center'>
//         <div id='shbutton' className='w-[200px] h-[50px] text-[24px] flex justify-center items-center'
//           onClick={(e) => {
//             e.preventDefault();
//             setStart(true);
//             setGameData();
//           }}
//         >게임스타트</div>
//         <div id='shbutton' className='w-[200px] h-[50px] text-[24px] flex justify-center items-center mt-[10px]'
//           onClick={(e) => {
//             const nationId = 11;
//             const kakaoId = "2757389101";
//             const roomId = "2386a4ee-355f-4f1d-9b77-118b2cbf99f9";

//             ws.send(`/pub/game/quiz/${kakaoId}/${roomId}/${nationId}`, {}, JSON.stringify(null));

//           }}
//         >퀴즈 요청</div>

//       </div>}
      
//       {quizModalState && (          
//         <QuizModal
//           input={quiz}
//           closeModal={() => setQuizModalState(false)}
//         />
//       )}   
//       {start && <div>
//         {mode && <Game2D metaData={metaData} setMetaData={setMetaData} p={p} me={me} setMe={setMe} setP={setP} ></Game2D>}
//         {!mode && <Game3D p={p} setP={setP} ></Game3D>}
//       </div>}






//       {/* <div>소켓 테스트용</div>
//       <div className='flex flex-col'>
//         <button className='w-[120px] h-[50px] mt-[20px] shbutton' onClick={sendMsg}>소켓 데이터 전송</button>
//         <button className='w-[120px] h-[50px] mt-[20px] shbutton' onClick={sendEmoticon}>이모티콘 전송</button>
//         <button className='w-[120px] h-[50px] mt-[20px] shbutton'onClick={requestQuiz}>퀴즈 요청</button>
//       </div> */}

//     </div >
//   </>
//   )
}

