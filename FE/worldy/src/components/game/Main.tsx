import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import Room from "./Room";
import CreateGame from "../create/CreateGame";
import Game2D from "./Game2D";
import Game3D from "./Game3D";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { log } from "console";
import Enter from "./Enter";

// 소켓 연결
let socket;
let ws: any;
export type ScrappedQuizType = {
  quizId: number; //퀴즈 id
  nationName: string; //국가명
  level: number; //퀴즈 수준
  quizType: string; //퀴즈 유형
  category: string; //카테고리
  image: string; //이미지
  content: string; //문제
  answer: string; //정답
  multiFirst: string | null; //1번
  multiSecond: string | null; //2번
  multiThird: string | null; //3번
  multiFourth: string | null; //4번
  hint: boolean; //힌트
  commentary: string; //힌트 유형
  userAnswer: string | null; //유저가 적은 정답(맞았으면 null)
  success: boolean; //맞춘 문제인가
  explanation?: string;
};

export default function Main() {
  let roomData: any = null;
  const params = useParams();
  const location = useLocation();
  const loginUser = sessionStorage.getItem("nickname");

  let received: any;

  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("token");
  let headers = { Authorization: `Bearer ${accessToken}` };

  // socket receivedData
  let receivedData: any;

  // quizData
  let quizData: any;

  // quiz modal 선언하기 위한 변수
  const [quizModalState, setQuizModalState] = useState<boolean>(false);
  // quizData 선언하기 위한 변수
  const [quiz, setQuiz] = useState<ScrappedQuizType>({
    quizId: 0,
    nationName: "",
    level: 0,
    quizType: "",
    category: "",
    image: "",
    content: "",
    answer: "",
    multiFirst: null, //1번
    multiSecond: null, //2번
    multiThird: null, //3번
    multiFourth: null, //4번
    hint: true, //힌트
    commentary: "",
    userAnswer: "", //유저가 적은 정답(맞았으면 null)
    success: true, //맞춘 문제인가
    explanation: "",
  });

  // 게임 포화상태 체크
  const [userCheck, setUserCheck] = useState<boolean>(false);

  // 게임 시작 체크
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [gameWait, setGameWait] = useState<boolean>(false);

  const [user1Check, setUser1Check] = useState<boolean>(false);
  const [user2Check, setUser2Check] = useState<boolean>(false);
  const [user3Check, setUser3Check] = useState<boolean>(false);
  const [user4Check, setUser4Check] = useState<boolean>(false);

  const [user1, setUser1] = useState<User>({
    kakaoId: '',
    nickName: '',
    profileImg: '',
    mmr: 0,
    level: 0,
    tier: '',
  });

  const [user2, setUser2] = useState<User>({
    kakaoId: '',
    nickName: '',
    profileImg: '',
    mmr: 0,
    level: 0,
    tier: '',
  });

  const [user3, setUser3] = useState<User>({
    kakaoId: '',
    nickName: '',
    profileImg: '',
    mmr: 0,
    level: 0,
    tier: '',
  });

  const [user4, setUser4] = useState<User>({
    kakaoId: '',
    nickName: '',
    profileImg: '',
    mmr: 0,
    level: 0,
    tier: '',
  });

  useEffect(() => {
    // 소켓 연결
    socket = new SockJS("https://k8a507.p.ssafy.io/api/stomp/game");
    ws = Stomp.over(socket);
    ws.connect(headers, (frame: any) => {
      console.log("소켓 연결");
      subscribe();
    });
  }, []);

  function subscribe() {
    ws.subscribe(`/sub/${params.id}`, (event: any) => {
      const received = JSON.parse(event.body);

      if (received.type === "player") {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              location: received.p1.game.location,
              balance: received.p1.game.balance,
              desert: received.p1.game.desert,
              state: received.p1.game.state,
              dice1: received.p1.game.dice1,
              dice2: received.p1.game.dice2,
              dice: received.p1.game.dice,
              isDouble: received.p1.game.isDouble,
              own: received.p1.game.own,
              lap: received.p1.game.lap,
              ranking: received.p1.game.ranking,
            },
          },
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              location: received.p2.game.location,
              balance: received.p2.game.balance,
              desert: received.p2.game.desert,
              state: received.p2.game.state,
              dice1: received.p2.game.dice1,
              dice2: received.p2.game.dice2,
              dice: received.p2.game.dice,
              isDouble: received.p2.game.isDouble,
              own: received.p2.game.own,
              lap: received.p2.game.lap,
              ranking: received.p2.game.ranking,
            },
          },
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              location: received.p3.game.location,
              balance: received.p3.game.balance,
              desert: received.p3.game.desert,
              state: received.p3.game.state,
              dice1: received.p3.game.dice1,
              dice2: received.p3.game.dice2,
              dice: received.p3.game.dice,
              isDouble: received.p3.game.isDouble,
              own: received.p3.game.own,
              lap: received.p3.game.lap,
              ranking: received.p3.game.ranking,
            },
          },
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              location: received.p4.game.location,
              balance: received.p4.game.balance,
              desert: received.p4.game.desert,
              state: received.p4.game.state,
              dice1: received.p4.game.dice1,
              dice2: received.p4.game.dice2,
              dice: received.p4.game.dice,
              isDouble: received.p4.game.isDouble,
              own: received.p4.game.own,
              lap: received.p4.game.lap,
              ranking: received.p4.game.ranking,
            },
          },
        }));
      } else if (received.type === "worldmap") {
        console.log("worldMap 데이터 받음");
        console.log(received);
        console.log("worldMap 데이터 받음");
        setWorldMap((prevState: any) => ({
          ...prevState,
          worldMap: received.worldMap,
        }));
      } else if (received.type === "metaData") {
        console.log("메타 데이터 받음");
        console.log(received);
        console.log("메타 데이터 받음");
        setMetaData((prevState: any) => ({
          ...prevState,
          currentLocation: received.currentLocation,
          dice1: received.dice1,
          dice2: received.dice2,
          dice: received.dice,
          isDouble: received.isDouble,
          turn: received.turn,
        }));
      } else if (received.type === "quiz") {
        quizData = received.quizDto;

        console.log("quizData");
        console.log(quizData);

        if (quizData.multiAnswerList) {
          setQuiz((prevState: any) => ({
            ...prevState,
            quizId: quizData.quizId,
            nationName: quizData.nation.nationName,
            level: quizData.level,
            quizType: quizData.quizType,
            category: quizData.catetory,
            image: quizData.image,
            content: quizData.content,
            answer: quizData.answer,
            multiFirst: quizData.multiAnswerList[0].answer,
            multiSecond: quizData.multiAnswerList[1].answer,
            multiThird: quizData.multiAnswerList[2].answer,
            multiFourth: quizData.multiAnswerList[3].answer,
            hint: quizData.hintType,
            commentary: quizData.hint,
            explanation: quizData.commentary,
          }));
        } else {
          setQuiz((prevState: any) => ({
            ...prevState,
            quizId: quizData.quizId,
            nationName: quizData.nation.nationName,
            level: quizData.level,
            quizType: quizData.quizType,
            category: quizData.catetory,
            image: quizData.image,
            content: quizData.content,
            answer: quizData.answer,
            hint: quizData.hintType,
            commentary: quizData.hint,
            explanation: quizData.commentary,
          }));
        }

        setQuizModalState(true);
      } else if (received.type === "enter") {
        // enter 에 들어온 순서대로 p를 채워나간 후 p4가 바뀌는 순간 player 데이터 전송
        if (received.cnt <= 4) {
          console.log("4이하 룸아이디 세팅");
          console.log(received);


          if (received.user1) {
            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p1: {
                ...prevState.p1,
                playerId: received.user1.kakaoId,
                name: received.user1.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser1((prevState: any) => ({
              kakaoId: received.user1.kakaoId,
              nickName: received.user1.nickName,
              profileImg: received.user1.profileImg,
              mmr: received.user1.mmr,
              level: received.user1.level,
              tier: received.user1.tier,
            }))
            setUser1Check(true);

            //console.log("유저 1 데이터 받아오기");
          }

          // TEST
          // if (received.user1) {
          //   setPlayer((prevState: any) => ({
          //     ...prevState,
          //     roomId: received.roomId,
          //     p2: {
          //       ...prevState.p2,
          //       playerId: "2756798359",
          //       name: "설히",
          //     },
          //   }));
          // }
          // if (received.user1) {
          //   setPlayer((prevState: any) => ({
          //     ...prevState,
          //     roomId: received.roomId,
          //     p3: {
          //       ...prevState.p3,
          //       playerId: "2762535269",
          //       name: "성훈",
          //     },
          //   }));
          // }
          // if (received.user1) {
          //   setPlayer((prevState: any) => ({
          //     ...prevState,
          //     roomId: received.roomId,
          //     p4: {
          //       ...prevState.p4,
          //       playerId: "2772224261",
          //       name: "히히",
          //     },
          //   }));
          //   setGameStart(true);
          // }

          // 원본
          if (received.user2) {
            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p2: {
                ...prevState.p2,
                playerId: received.user2.kakaoId,
                name: received.user2.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser2((prevState: any) => ({
              kakaoId: received.user2.kakaoId,
              nickName: received.user2.nickName,
              profileImg: received.user2.profileImg,
              mmr: received.user2.mmr,
              level: received.user2.level,
              tier: received.user2.tier,
            }))

            setUser2Check(true);
          }
          if (received.user3) {
            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p3: {
                ...prevState.p3,
                playerId: received.user3.kakaoId,
                name: received.user3.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser3((prevState: any) => ({
              kakaoId: received.user3.kakaoId,
              nickName: received.user3.nickName,
              profileImg: received.user3.profileImg,
              mmr: received.user3.mmr,
              level: received.user3.level,
              tier: received.user3.tier,
            }))

            setUser3Check(true);
          }
          if (received.user4) {
            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p4: {
                ...prevState.p4,
                playerId: received.user4.kakaoId,
                name: received.user4.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser4((prevState: any) => ({
              kakaoId: received.user4.kakaoId,
              nickName: received.user4.nickName,
              profileImg: received.user4.profileImg,
              mmr: received.user4.mmr,
              level: received.user4.level,
              tier: received.user4.tier,
            }))

            setUser4Check(true);
          }

        } else if (received.cnt >= 5) {
          // console.log('유저 확인');

          let check = true;

          if (loginUser === received.user1.nickName) {
            check = false;
          } else if (loginUser === received.user2.nickName) {
            check = false;
          } else if (loginUser === received.user3.nickName) {
            check = false;
          } else if (loginUser === received.user4.nickName) {
            check = false;
          }

          if (!check) {
            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p1: {
                ...prevState.p1,
                playerId: received.user1.kakaoId,
                name: received.user1.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser1((prevState: any) => ({
              kakaoId: received.user1.kakaoId,
              nickName: received.user1.nickName,
              profileImg: received.user1.profileImg,
              mmr: received.user1.mmr,
              level: received.user1.level,
              tier: received.user1.tier,
            }))
            setUser1Check(true);


            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p2: {
                ...prevState.p2,
                playerId: received.user2.kakaoId,
                name: received.user2.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser2((prevState: any) => ({
              kakaoId: received.user2.kakaoId,
              nickName: received.user2.nickName,
              profileImg: received.user2.profileImg,
              mmr: received.user2.mmr,
              level: received.user2.level,
              tier: received.user2.tier,
            }))

            setUser2Check(true);

            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p3: {
                ...prevState.p3,
                playerId: received.user3.kakaoId,
                name: received.user3.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser3((prevState: any) => ({
              kakaoId: received.user3.kakaoId,
              nickName: received.user3.nickName,
              profileImg: received.user3.profileImg,
              mmr: received.user3.mmr,
              level: received.user3.level,
              tier: received.user3.tier,
            }))

            setUser3Check(true);

            setPlayer((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
              p4: {
                ...prevState.p4,
                playerId: received.user4.kakaoId,
                name: received.user4.nickName,
              },
            }));

            setMetaData((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setWorldMap((prevState: any) => ({
              ...prevState,
              roomId: received.roomId,
            }));

            setUser4((prevState: any) => ({
              kakaoId: received.user4.kakaoId,
              nickName: received.user4.nickName,
              profileImg: received.user4.profileImg,
              mmr: received.user4.mmr,
              level: received.user4.level,
              tier: received.user4.tier,
            }))

            setUser4Check(true);
            setGameStart(!check);
          }

          setUserCheck(check);
        }
      }
    });
  }

  if (user4Check) {
    setTimeout(function () {
      setGameWait(true);
    }, 1000);
  }

  if (gameWait) {
    setTimeout(function () {
      setGameStart(true);
    }, 4000);
  }

  // 게임 방이 가득차면 redirect
  if (userCheck) {
    navigate("/");
  }

  function sendData() {
    //websockt emit
    const platyerData = player;
    const worldMapData = worldMap;
    const meta = metaData;

    console.log("소켓으로 데이터 전송 >>>");
    ws.send("/pub/game/player", {}, JSON.stringify(platyerData));
    ws.send("/pub/game/map", {}, JSON.stringify(worldMapData));
    ws.send("/pub/game/meta", {}, JSON.stringify(meta));
  }

  // // 참여한 플레이어 데이터 세팅하기
  // function setGameData() {
  //   console.log("최초 방 정보 세팅할 떄");
  //   console.log(params.id);
  //   let _p1 = roomData.user1;
  //   let _p2 = roomData.user2;
  //   let _p3 = roomData.user3;
  //   let _p4 = roomData.user4;
  //   let myId = "";
  //   let myNum = 0;
  //   const ps = [_p1, _p2, _p3, _p4];

  //   ps.forEach((e, index) => {
  //     if (e.kakaoId === loginUser) {
  //       myId = e.kakaoId;
  //       myNum = index + 1;
  //     }
  //   });

  //   setPlayer((prevState: any) => ({
  //     ...prevState,
  //     roomId: params.id,
  //     type: "player",
  //     p1: {
  //       ...prevState.p1,
  //       playerId: _p1.kakaoId,
  //       name: "설희",
  //       game: {
  //         ...prevState.p1.game,
  //       },
  //     },
  //     p2: {
  //       ...prevState.p2,
  //       playerId: _p2.kakaoId,
  //       name: "성훈",
  //       game: {
  //         ...prevState.p2.game,
  //       },
  //     },
  //     p3: {
  //       ...prevState.p3,
  //       playerId: _p3.kakaoId,
  //       name: "미희",
  //       game: {
  //         ...prevState.p3.game,
  //       },
  //     },
  //     p4: {
  //       ...prevState.p4,
  //       playerId: _p4.kakaoId,
  //       name: "원규",
  //       game: {
  //         ...prevState.p4.game,
  //       },
  //     },
  //   }));
  // }

  // // 참여한 플레이어 데이터 세팅하기
  // function setGameData() {

  //   let _p1 = roomData.user1;
  //   let _p2 = roomData.user2;
  //   let _p3 = roomData.user3;
  //   let _p4 = roomData.user4;
  //   let myId = '';
  //   let myNum = 0;
  //   const ps = [_p1, _p2, _p3, _p4];

  //   ps.forEach((e, index) => {
  //     if (e.kakaoId === loginUser) {
  //       myId = e.kakaoId;
  //       myNum = index + 1;
  //     }
  //   });

  //   setPlayer((prevState: any) => ({
  //     ...prevState,
  //     p1: {
  //       ...prevState.p1,
  //       playerId: _p1.kakaoId,
  //       name: '설희',
  //       game: {
  //         ...prevState.p1.game,
  //       }
  //     },
  //     p2: {
  //       ...prevState.p2,
  //       playerId: _p2.kakaoId,
  //       name: '성훈',
  //       game: {
  //         ...prevState.p2.game,
  //       }
  //     },
  //     p3: {
  //       ...prevState.p3,
  //       playerId: _p3.kakaoId,
  //       name: '미희',
  //       game: {
  //         ...prevState.p3.game,
  //       }
  //     },
  //     p4: {
  //       ...prevState.p4,
  //       playerId: _p4.kakaoId,
  //       name: '원규',
  //       game: {
  //         ...prevState.p4.game,
  //       }
  //     },
  //   }))
  // }

  const [contents, setContents] = useState<String>("");
  const [mode, setMode] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [data, setData] = useState<Object[]>();
  const [metaData, setMetaData] = useState<Object>({
    roomId: "",
    type: "metaData",
    currentLocation: 0,
    dice1: 0,
    dice2: 0,
    dice: 0,
    turn: 0,
    isDouble: false,
    itemMsg1: '아이템 메시지1',
    itemMsg2: '아이템 메시지2',
    fund: 0,
    curcuit: 0,
  });
  const [turnOver, setTurnOver] = useState<boolean>(false);

  // 백으로부터 응답 받은 데이터
  let res = {};

  // 플레이어 데이터 세팅

  const [player, setPlayer] = useState<NewPlayer>({
    roomId: "",
    type: "player",
    p1: {
      playerNum: 1,
      playerId: "",
      name: "",
      game: {
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      },
    },
    p2: {
      playerNum: 2,
      playerId: "",
      name: "",
      game: {
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      },
    },
    p3: {
      playerNum: 3,
      playerId: "",
      name: "",
      game: {
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      },
    },
    p4: {
      playerNum: 4,
      playerId: "",
      name: "",
      game: {
        location: 0,
        balance: 500,
        desert: 0,
        state: false,
        dice1: 0,
        dice2: 0,
        dice: 0,
        isDouble: false,
        own: [],
        lap: 0,
        ranking: 0,
      },
    },
  });

  // 월드맵(지도)
  const [worldMap, setWorldMap] = useState<any>({
    roomId: "",
    type: "worldmap",
    worldMap: [
      {
        location: 0,
        name: "시작",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "start",
        contents: "시작점입니다. 월급을 받으세요.     + 300,000",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 1,
        name: "태국",
        price: {
          land: 50,
          villa: 20,
          hotel: 50,
          landmark: 100,
        },
        type: "nation",
        landmark: "카오산 로드",
        contents: "태국의 수도는 방콕. 어쩌구 저쩌구",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 2,
        name: "싱가포르",
        price: {
          land: 50,
          villa: 20,
          hotel: 50,
          landmark: 100,
        },
        type: "nation",
        landmark: "싱가포르 무역센터",
        contents: "싱가포르의 수도는 싱가폴 도시 국가이다.",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 3,
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 4,
        name: "인도",
        price: {
          land: 80,
          villa: 50,
          hotel: 70,
          landmark: 120,
        },
        type: "nation",
        landmark: "타지마할",
        contents:
          "인도의 수도는 뉴델리. 세상에서 가장 많은 인구를 보유하고있다.",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 5,
        name: "홍콩",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "랜드마크없음",
        contents: "자유무역도시 홍콩",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 6,
        name: "사우디",
        price: {
          land: 90,
          villa: 70,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "사우디 이슬람 모스크",
        contents: "사우디 아라비아는 석유가 많이 난다. 저쩌구",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 7,
        name: "중국",
        price: {
          land: 100,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "만리장성",
        contents: "중국의 수도는 베이징. 어쩌구 저쩌구",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 8,
        name: "일본",
        price: {
          land: 100,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "후지산",
        contents: "일본의 수도는 후지산. 어쩌구 저쩌구",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 9,
        name: "대한민국",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "경복궁",
        contents: "한국의 수도는 서울. BTS, 봉준호, 손흥민, Jay Park",
        continent: "아시아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 10,
        name: "무인도",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "desert",
        contents: "무인도에 불시착했습니다. 3턴 쉬세요.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 11,
        name: "헝가리",
        price: {
          land: 70,
          villa: 50,
          hotel: 80,
          landmark: 100,
        },
        type: "nation",
        landmark: "헝가리 모스크",
        contents: "헝가리 수도는 부다페스트. 큰 도시",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 12,
        name: "스페인",
        price: {
          land: 80,
          villa: 80,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "가우디 대성당",
        contents: "스페인는 열정의 나라,어쩌구 저쩌구",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 13,
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 14,
        name: "이탈리아",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "바티칸 대성당",
        contents: "이탈리아의 수도는 로마. 로마에 가면 로마의 법을 따르라",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 15,
        name: "지중해",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "크레타섬",
        contents: "그리스 로마 문화의 시작 지중해",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 16,
        name: "스위스",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "알프스 산맥",
        contents: "스위스의 수도는 베른. 스위스는 중립국",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 17,
        name: "독일",
        price: {
          land: 100,
          villa: 100,
          hotel: 130,
          landmark: 170,
        },
        type: "nation",
        landmark: "베를린 장벽",
        contents: "독일의 수도는 베를린. 벤츠의 나라",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 18,
        name: "프랑스",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "에펠탑",
        contents: "프랑스의 수도는 파리. 낭만의 도시",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 19,
        name: "영국",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "빅반",
        contents: "영국의 수도는 런던. 태양이 지지 않는 나라",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 20,
        name: "정거장",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "port",
        contents: "특가 항공권 당첨! 원하는 곳으로 이동합니다.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 21,
        name: "가나",
        price: {
          land: 50,
          villa: 50,
          hotel: 70,
          landmark: 100,
        },
        type: "nation",
        landmark: "가나 초콜릿",
        contents: "가나는 초콜릿이 유명하다.",
        continent: "아프리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 22,
        name: "소말리아",
        price: {
          land: 50,
          villa: 50,
          hotel: 70,
          landmark: 100,
        },
        type: "nation",
        landmark: "소말리아 모스크",
        contents: "소말리아 수도는 리비아. 해적을 조심하라",
        continent: "아프리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 23,
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 24,
        name: "모르코",
        price: {
          land: 80,
          villa: 80,
          hotel: 100,
          landmark: 130,
        },
        type: "nation",
        landmark: "모르코 모스코",
        contents: "모르코의 수도는 모르코. 좋은 나라입니다",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 25,
        name: "사하라",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "city",
        landmark: "오아시스",
        contents: "뜨거운 모래의 사막, 사하라",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 26,
        name: "남아공",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "남아공 월드컵 경기장",
        contents: "남어공의 수도는 키예프. 어쩔티비",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 27,
        name: "이집트",
        price: {
          land: 100,
          villa: 100,
          hotel: 140,
          landmark: 170,
        },
        type: "nation",
        landmark: "쿠푸왕의 대피라미드",
        contents: "이집트의 수도는 카이로. 이집트는 문명의 시작",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 28,
        name: "호주",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "오페라 하우스",
        contents: "호주의 수도는 어디일까요",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 29,
        name: "뉴질랜드",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "빌헬름 협곡",
        contents: "뉴질랜드의 수도는 키위. 로마에 가면 로마의 법을 따르라",
        continent: "아프리카&오세아니아",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 30,
        name: "올림픽",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "olympic",
        contents: "하나된 세계 올림픽으로!",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 31,
        name: "칠레",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "칠레 대성당",
        contents: "세상에서 가장 긴 나라 칠레",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 32,
        name: "페루",
        price: {
          land: 80,
          villa: 80,
          hotel: 120,
          landmark: 150,
        },
        type: "nation",
        landmark: "마추픽추",
        contents: "잉카 문명의 고대 제국 페루",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 33,
        name: "보물상자",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "item",
        contents: "보물상자를 발견했습니다.",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 34,
        name: "브라질",
        price: {
          land: 100,
          villa: 100,
          hotel: 140,
          landmark: 180,
        },
        type: "nation",
        landmark: "리우데자네이루 거대 예수상",
        contents: "삼바의 나라 브라질",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 35,
        name: "파나마",
        price: {
          land: 100,
          villa: 0,
          hotel: 0,
          landmark: 180,
        },
        type: "city",
        landmark: "파나마운하",
        contents: "아메리카 대륙의 좁은 해협, 파나마",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 36,
        name: "멕시코",
        price: {
          land: 100,
          villa: 100,
          hotel: 150,
          landmark: 180,
        },
        type: "nation",
        landmark: "차첸이트사",
        contents: "멕시코의 수도는 멕시코시티. 로마에 가면 로마의 법을 따르라",
        continent: "유럽",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 37,
        name: "국세청",
        price: {
          land: 0,
          villa: 0,
          hotel: 0,
          landmark: 0,
        },
        type: "tax",
        contents: "탈세는 위법입니다. 가진 재산의 10%를 세금으로 납부하세요",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 38,
        name: "캐나다",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "캐나다 대성당",
        contents: "캐나다의 수도는 오타와",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
      {
        location: 39,
        name: "미국",
        price: {
          land: 120,
          villa: 120,
          hotel: 150,
          landmark: 200,
        },
        type: "nation",
        landmark: "자유의 여신상",
        contents: "미국의 수도는 워싱턴D.C 자유의 나라",
        continent: "아메리카",
        owner: 0,
        option: 0,
        toll: 0,
        build: {
          land: false,
          villa: false,
          hotel: false,
          landmark: false,
        },
      },
    ],
  });


  // 아이템(보물상자)
  const [item, setItem] = useState<Item[]>([
    {
      id: 0,
      title: '운수 좋은 날',
      content: '주사위를 한 번 더 던지세요!',
    },
    {
      id: 1,
      title: '무인도 불시착',
      content: '비행기가 고장나서 무인도에 갇혔습니다. 무인도로 가세요.',
    },
    {
      id: 2,
      title: '자유여행권',
      content: '이동하고 싶은 곳을 클릭하세요.',
    },
    {
      id: 3,
      title: '코로나19 확진',
      content: '코로나에 걸렸습니다. 2턴 간 자가격리에 들어갑니다.',
    },
    {
      id: 4,
      title: '호텔에 짐을 놓고 왔습니다.',
      content: '뒤로 2 칸 이동하세요.',
    },
    {
      id: 5,
      title: '졸음',
      content: '졸다가 3역을 지나쳤습니다. 앞으로 3 칸 이동',
    },
    {
      id: 6,
      title: '복권 당첨',
      content: '100만원을 받으세요!',
    },
    {
      id: 7,
      title: '세무조사',
      content: '국세청에서 세무 조사를 시작합니다. 국세청으로 이동하세요.',
    },
    {
      id: 8,
      title: '주식 투자',
      content: '투자한 주식이 대박났습니다. 200만원을 받으세요.',
    },
    {
      id: 9,
      title: '올림픽 티켓 수령',
      content: '올림픽을 관람하러갑니다.',
    },
    {
      id: 10,
      title: 'BTS 콘서트',
      content: '콘서트를 보러 대한민국으로 이동합니다.',
    },
    {
      id: 11,
      title: '미국 여행',
      content: '미국으로 이동하세요',
    },
    {
      id: 12,
      title: '피라미드 대탐험',
      content: '새로운 피라미드가 발견됐습니다. 이집트로 이동하세요.',
    },
    {
      id: 13,
      title: '로마의 휴일',
      content: '휴가를 받았습니다. 이탈리아로 이동하세요.',
    },
    {
      id: 14,
      title: '과속 벌금',
      content: '과속은 위험합니다. 벌금 -100만원',
    },
    {
      id: 15,
      title: '통행 면제권',
      content: '1회 다른 플레이어의 나라에 무료로 머무를 수 있습니다.',
    },
    {
      id: 16,
      title: '뒤로 걷기 캠페인',
      content: '뒤로 3칸 이동하세요.',
    },



  ])


  return (
    <>
      <div className="w-screen h-screen bg-[#FFFDF4]">
        {gameStart && (<div className="w-full bg-[#FFFDF4] flex items-start justify-around fixed-top z-50">
          <div className="w-full h-[60px] flex items-end justify-end">
            {/* <img className='w-[100px] h-[54px] flex items-end mt-[20px] ml-[60px] object-cover' src='/game/LogoColored.png' alt='로고이미지'></img> */}
            <div
              className="w-[100px] h-[40px] rounded-[4px] mr-[120px] flex justify-center items-center rounded-full bg-blue-400 text-[18px] text-white hover:cursor-pointer hover:bg-blue-500"
              onClick={() => {
                setMode(!mode);
              }}
            >
              3D 모드
            </div>
          </div>
        </div>)}

        {!gameStart &&
          <Enter
            user1Check={user1Check}
            user2Check={user2Check}
            user3Check={user3Check}
            user4Check={user4Check}
            user1={user1}
            user2={user2}
            user3={user3}
            user4={user4}

            gameWait={gameWait}
          ></Enter>
        }

        {gameStart && (
          <div>
            {mode && (
              <Game2D
                sendData={sendData}
                loginUser={loginUser}
                metaData={metaData}
                setMetaData={setMetaData}
                player={player}
                setPlayer={setPlayer}
                worldMap={worldMap.worldMap}
                setWorldMap={setWorldMap}
                item={item}
                setItem={setItem}
                closeModal={() => setQuizModalState(false)}
                quizModalState={quizModalState}
                roomId={params.id}
                ws={ws}
                quiz={quiz}
                user1={user1}
                user2={user2}
                user3={user3}
                user4={user4}
              ></Game2D>
            )}
            {!mode && (
              <Game3D
                sendData={sendData}
                loginUser={loginUser}
                metaData={metaData}
                setMetaData={setMetaData}
                player={player}
                setPlayer={setPlayer}
                worldMap={worldMap.worldMap}
                setWorldMap={setWorldMap}
                item={item}
                setItem={setItem}
                closeModal={() => setQuizModalState(false)}
                quizModalState={quizModalState}
                roomId={params.id}
                ws={ws}
                quiz={quiz}
                user1={user1}
                user2={user2}
                user3={user3}
                user4={user4}
              ></Game3D>
            )}
          </div>
        )}
      </div>
    </>
  );
}
