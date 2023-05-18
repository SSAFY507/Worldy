import "./dice.css";

import React, { useEffect, useState } from "react";

import Dice from "./Dice";
import Game3DItem from './game3D/Game3DItem'
import GameQuizModal from "../GameQuizModal";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';

export interface PlayerInfoType {
  playerIndex: number,
  currentIndex: number,
  turn: number
}

export default function Game3D(props: any) {
  const sendData = props.sendData;

  const profileImg = sessionStorage.getItem('profileImg');

  const item = props.item;
  const setItem = props.setItem;

  const player = props.player;
  const setPlayer = props.setPlayer;

  const metaData = props.metaData;
  const setMetaData = props.setMetaData;

  const worldMap = props.worldMap;
  const setWorldMap = props.setWorldMap;

  const user1 = props.user1;
  const user2 = props.user2;
  const user3 = props.user3;
  const user4 = props.user4;

  const loginUser = props.loginUser;
  const [myTurn, setMyTurn] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(8);
  const [buyOption, setBuyOption] = useState<number>(0);
  const [buildOption, setBuildOption] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [buildPrice, setBuildPrice] = useState<number>(0);
  const [newLoaction, setNewLocation] = useState<number>(0);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [activeDice, setActiveDice] = useState<boolean>(false);
  const [itemMove, setItemMove] = useState<number>(0);
  const [tmpCnt, setTmpCnt] = useState<number>(0);
  const [tmpTax, setTmpTax] = useState<number>(0);

  const navigate = useNavigate();

  const [gameResult, setGameResult] = useState<GameResult>({
    first: {
      kakaoId: '',
      nationList: [],
    },
    second: {
      kakaoId: '',
      nationList: [],
    },
    third: {
      kakaoId: '',
      nationList: [],
    },
    fourth: {
      kakaoId: '',
      nationList: [],
    }
  });
  const [gameResultSet, setGameResultSet] = useState<boolean>(false)

  const [gameFinish, setGameFinish] = useState<boolean>(false)
  
  const [updateRankingCheck, setUpdateRankingCheck] = useState<boolean>(false)

  const ws = props.ws;

  const closeModal = props.closeModal;
  const quiz = props.quiz;
  const quizModalState = props.quizModalState;

  const roomId = props.roomId;

  let pList: Player[] = [];
  let me: any = {};

  if (loginUser !== player.p1.name) {
    pList.push(player.p1);
  } else {
    me = player.p1;
  }
  if (loginUser !== player.p2.name) {
    pList.push(player.p2);
  } else {
    me = player.p2;
  }
  if (loginUser !== player.p3.name) {
    pList.push(player.p3);
  } else {
    me = player.p3;
  }
  if (loginUser !== player.p4.name) {
    pList.push(player.p4);
  } else {
    me = player.p4;
  }

  useEffect(() => {
    console.log('metaData.curcuit : ')
    console.log(metaData.curcuit)
    if (metaData.curcuit >= 16) {
      finishGame();
    }
  }, [metaData.curcuit])

  useEffect(() => {
    if (myTurn) {
      setActiveDice(true);
    }
  }, [myTurn])


  useEffect(() => {
    if (tmpCnt == 0) {
      setMetaData((prevState: any) => ({
        ...prevState,
        itemMsg1: '무인도 탈출 성공!',
        itemMsg2: '다음턴부터 플레이할 수 있습니다.',
      }))
    }
  }, [tmpCnt])

  useEffect(() => {
    if (metaData.turnOver && !metaData.isDouble) {
      // 턴이 true이고, 더블이  false;
      setMetaData((prevState: any) => ({
        ...prevState,
        turn: (prevState.turn + 1) % 4,
        turnOver: false,
        curcuit: prevState.curcuit + 1,
      }));
    } else if (metaData.turnOver && metaData.isDouble) {
      setMetaData((prevState: any) => ({
        ...prevState,
        turnOver: false,
      }));
    }
    setMode(0);
    sendData();
  }, [metaData.turnOver]);

  useEffect(() => {
    if (metaData.turn + 1 === me.playerNum) {
      setMyTurn(true);
    } else {
      setMyTurn(false);
    }
  }, [metaData.turn]);

  // 옵션이 바뀔 때, 총 가격 변경
  useEffect(() => {
    const spot = worldMap[metaData.currentLocation];

    if (buyOption === 0) {
      setTotalPrice(spot.price.land);
    } else if (buyOption === 1) {
      setTotalPrice(spot.price.land + spot.price.villa);
    } else if (buyOption === 2) {
      setTotalPrice(spot.price.land + spot.price.hotel);
    } else if (buyOption === 3) {
      setTotalPrice(spot.price.landmark);
    }
  }, [buyOption]);

  // 빌드 옵션이 바뀔 때, 총 빌드 가격 변경
  useEffect(() => {
    const spot = worldMap[metaData.currentLocation];

    if (buildOption === 0) {
      setBuildPrice(spot.price.villa);
    } else if (buyOption === 1) {
      setBuildPrice(spot.price.hotel);
    } else if (buyOption === 2) {
      setBuildPrice(spot.price.landmark);
    }
  }, [buildOption]);

  const [rankPlayerData, setRankPlayerData] = useState<any>({
    rankPlayer: [
      {
        kakaoId: '',
        assets: 0,
        playNum: 0,
        nickName: '',
        own: [],
        tier: '',
        profileImg: ''
      },
      {
        kakaoId: '',
        assets: 0,
        playNum: 0,
        nickName: '',
        own: [],
        tier: '',
        profileImg: ''
      },
      {
        kakaoId: '',
        assets: 0,
        playNum: 0,
        nickName: '',
        own: [],
        tier: '',
        profileImg: ''
      },
      {
        kakaoId: '',
        assets: 0,
        playNum: 0,
        nickName: '',
        own: [],
        tier: '',
        profileImg: ''
      }
    ]
  });

  // 게임 결과 세팅 후 실행
  if (gameResultSet) {
    console.log("데이터 axios");
    console.log(gameResult);
    gameResultAxios();
  }


  // 게임 종료 후 페이지 이동
  if (gameFinish && gameResultSet) {
    navigate('/game/result', { state: rankPlayerData });
  }

  // 정렬
  if (updateRankingCheck) {
    updateRanking();
    setUpdateRankingCheck(false);
  }


  /** 게임 등수 찾는 함수 */  
  function findRanking(p: any) {
    //if (p.game.ranking == 1) {
    if (p.playerNum == 1) {
      setGameResult((prevState: any) => ({
        ...prevState,
        first: {
          kakaoId: p.playerId,
          nationList: p.game.own
        }
      }))
    }
    // else if (p.game.ranking == 2) {
    else if (p.playerNum == 2) {
      setGameResult((prevState: any) => ({
        ...prevState,
        second: {
          kakaoId: p.playerId,
          nationList: p.game.own
        }
      }))
    }
    // else if (p.game.ranking == 3) {
    else if (p.playerNum == 3) {
      setGameResult((prevState: any) => ({
        ...prevState,
        third: {

          kakaoId: p.playerId,
          nationList: p.game.own
        }
      }))

    }
    // else if (p.game.ranking == 4) {
    else if (p.playerNum == 4) {
      setGameResult((prevState: any) => ({
        ...prevState,
        fourth: {
          kakaoId: p.playerId,
          nationList: p.game.own
        }
      }))
    }
  }

  /** 게임 종료 함수  */ 
  function finishGame() {
    console.log(player);

    findRanking(player.p1);
    findRanking(player.p2);
    findRanking(player.p3);
    findRanking(player.p4);
    calRanking();
    setGameResultSet(true);
  }

  /** 게임 종료 됐을 때, 결과 보내는 함수 */
  function gameResultAxios() {
    const accessToken = sessionStorage.getItem('token');
    axios.get(`https://k8a507.p.ssafy.io/api/game/finish?roomId=${roomId}`, {
      headers: {
        // 요청 헤더 정보를 설정합니다.
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        axios.post("https://k8a507.p.ssafy.io/api/game/result", gameResult,
          {
            headers: {
              // 요청 헤더 정보를 설정합니다.
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // 게임 결과 페이지 이동
            //navigate('/game/result', { state: rankPlayerData });
            setGameFinish(true)
          });
      });
  }

  /** 자산 계산하는 함수 */
  function calAssets(p: any) {
    let sum = p.game.balance;

    for (let nationId of p.game.own) {
      if (worldMap[nationId].build.land) {
        sum += worldMap[nationId].price.land;
      }
      if (worldMap[nationId].build.villa) {
        sum += worldMap[nationId].price.villa;
      }
      if (worldMap[nationId].build.hotel) {
        sum += worldMap[nationId].price.hotel;
      }
      if (worldMap[nationId].build.landmark) {
        sum += worldMap[nationId].price.landmark;
      }
    }
    return sum;
  }

  /** 순위 계산하는 함수 */
  function calRanking() {

    // 자산 계산(balance + 땅 + 건물)
    let p1Assets = calAssets(player.p1);
    let p2Assets = calAssets(player.p2);
    let p3Assets = calAssets(player.p3);
    let p4Assets = calAssets(player.p4);

    // 유저 정보 저장
    setRankPlayerData((prevState: any) => ({
      ...prevState,
      rankPlayer: [
        ...prevState.rankPlayer.map((item: any, key: number) => (
          key === 0 ? {
            kakaoId: player.p1.playerId,
            assets: p1Assets,
            playNum: 1,
            nickName: player.p1.name,
            own: player.p1.game.own,
            tier: user1.tier,
            profileImg: user1.profileImg
          } : key === 1 ? {
            kakaoId: player.p2.playerId,
            assets: p2Assets,
            playNum: 2,
            nickName: player.p2.name,
            own: player.p2.game.own,
            tier: user2.tier,
            profileImg: user2.profileImg
          } : key === 2 ? {
            kakaoId: player.p3.playerId,
            assets: p3Assets,
            playNum: 3,
            nickName: player.p3.name,
            own: player.p3.game.own,
            tier: user3.tier,
            profileImg: user3.profileImg
          } : {
            kakaoId: player.p4.playerId,
            assets: p4Assets,
            playNum: 4,
            nickName: player.p4.name,
            own: player.p4.game.own,
            tier: user4.tier,
            profileImg: user4.profileImg
          }
        ))
      ]
    }));

    // 유저 정보 저장 후 정렬 체크
    setUpdateRankingCheck(true)
  }


  /** 순위 정렬 함수 */
  function updateRanking() {

    // 객체 복사
    let sortPlayerdata: any;
    sortPlayerdata = rankPlayerData;

    // 복사된 데이터로 정렬
    sortPlayerdata.rankPlayer.sort(function (a: any, b: any) {
      if (a.assets === b.assets) {
        return (-1) * (a.playNum - b.playNum)
      }
      return (-1) * (a.assets - b.assets);
    })

    // 정렬 후 데이터 갱신
    setUpdateRankingCheck(sortPlayerdata);
    console.log(sortPlayerdata);
  }

  /** 무인도로 바꾸는 함수 */ 
  function goDesert(turn: number) {
    console.log((turn + 1) + '님 무인도 도착')
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            desert: 3,
          }
        }
      }))
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            desert: 3,
          }
        }
      }))
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            desert: 3,
          }
        }
      }))
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            desert: 3,
          }
        }
      }))
    }
  }

  // 주사위 흔드는 함수
  function showDice(dice1: number, dice2: number): void {
    const dicesElement1 = document.querySelectorAll(".dice");
    const dicesElement2 = document.querySelectorAll(".dice2");

    dicesElement1.forEach(function (dice) {
      dice.classList.remove("active");
      animateDice(dice1, dice);
    });

    dicesElement2.forEach(function (dice) {
      dice.classList.remove("active");
      animateDice(dice2, dice);
    });
  }

  // 3D 주사위 호출 
  /** 2D 주사위 흔들림 */
  function animateDice(randomNumber: number, dice: any) {
    if (dice.id === `dice-${randomNumber}`) {
      setTimeout(function () {
        dice.classList.add("active");
      });
    }
  }

  /** 플레이어 턴 함수 ( 주사위 돌릴때 버튼에 호출 )*/ 
  function playerTurn(turn: number) {
    console.log("플레이어" + (turn + 1) + "턴 실행");
    let p: any = null;
    const setP = setPlayer;

    if (turn === 0) {
      p = player.p1;
    } else if (turn === 1) {
      p = player.p2;
    } else if (turn === 2) {
      p = player.p3;
    } else if (turn === 3) {
      p = player.p4;
    }

    console.log(p.name + "님 턴");
    const dice1 = Math.floor(Math.random() * 6 + 1);
    const dice2 = Math.floor(Math.random() * 6 + 1);
    const dice = dice1 + dice2;
    let isDouble = false;
    if (dice1 === dice2) {
      isDouble = true;
    }
    
    setMetaData((prevState: any) => ({
      ...prevState,
      dice1: dice1,
      dice2: dice2,
      dice: dice,
      isDouble: isDouble,
    }));

    // 이거 3D용 주사위 추가
    //////////////////////////////////////////////////////////////////////////////
    showDice(dice1, dice2);
    setDiceData(dice)
    // setRolledDice(dice);
    // moveCounted(dice);
    //////////////////////////////////////////////////////////////////////////////


    // 무인도일 때
    if (p.game.desert > 0) {
      console.log('무인도 카운트:')
      console.log(p.game.desert);


      // 더블 나왔을때 (무인도 탈출)
      if (isDouble) {
        setMetaData((prevState: any) => ({
          ...prevState,
          itemMsg1: '[더블] 무인도 탈출 성공!',
          itemMsg2: '다음턴부터 플레이할 수 있습니다.',
        }))
        setTmpCnt(0)
        if (turn === 0) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p1: {
              ...prevState.p1,
              game: {
                ...prevState.p1.game,
                desert: 0,
              }
            }
          }))
        } else if (turn === 1) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p2: {
              ...prevState.p2,
              game: {
                ...prevState.p2.game,
                desert: 0,
              }
            }
          }))
        } else if (turn === 2) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p3: {
              ...prevState.p3,
              game: {
                ...prevState.p3.game,
                desert: 0,
              }
            }
          }))
        } else if (turn === 3) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p4: {
              ...prevState.p4,
              game: {
                ...prevState.p4.game,
                desert: 0,
              }
            }
          }))
        }
      } else {  // 더블 아닐때(카운트 감소)

        setMetaData((prevState: any) => ({
          ...prevState,
          itemMsg1: '무인도 탈출 실패',
          itemMsg2: '남은 횟수',
        }))
        if (turn === 0) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p1: {
              ...prevState.p1,
              game: {
                ...prevState.p1.game,
                desert: (prevState.p1.game.desert - 1),
              }
            }
          }))
          setTmpCnt(player.p1.game.desert - 1)
        } else if (turn === 1) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p2: {
              ...prevState.p2,
              game: {
                ...prevState.p2.game,
                desert: (prevState.p2.game.desert - 1),
              }
            }
          }))
          setTmpCnt(player.p2.game.desert - 1)
        } else if (turn === 2) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p3: {
              ...prevState.p3,
              game: {
                ...prevState.p3.game,
                desert: (prevState.p3.game.desert - 1),
              }
            }
          }))
          setTmpCnt(player.p3.game.desert - 1)
        } else if (turn === 3) {
          setPlayer((prevState: any) => ({
            ...prevState,
            p4: {
              ...prevState.p4,
              game: {
                ...prevState.p4.game,
                desert: (prevState.p4.game.desert - 1),
              }
            }
          }))
          setTmpCnt(player.p4.game.desert - 1)
        }
      }


      // 무인도 턴 종료

      setMode(14);
      setMetaData((prevState: any) => ({
        ...prevState,
        turnOver: true,
      }))
      return;


    }


    if (myTurn && isDouble) {
      setActiveDice(true);
    } else if (myTurn && !isDouble) {
      setActiveDice(false);
    }

    // 이동위치 반환 함수
    const newLocation = move((turn), dice);

    // 구매 옵션 초기화
    setBuyOption(0);
    setBuildOption(0);
    setTotalPrice(worldMap[newLocation].price.land);
    setBuildPrice(worldMap[newLocation].price.villa);
    // 이동 데이터 세팅
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            location: newLocation,
          },
        },
      }));
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            location: newLocation,
          },
        },
      }));
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            location: newLocation,
          },
        },
      }));
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            location: newLocation,
          },
        },
      }));
    }

    // 도착지 이동 후 행동
    let spot = worldMap[newLocation];
    calculateToll(spot);

    // 국가 일때
    if (spot.type === "nation") {
      // 퀴즈 요청
      console.log('퀴즈 요청()')
      setTimeout(() => {
        ws.send(
          `/pub/game/quiz/kakao/${roomId}/${newLocation}`,
          {},
          JSON.stringify(null)
        );
      }, 1500);

      // 1) 주인 없음
      if (spot.owner === 0) {
        setMode(1);
        setBuyOption(0);
      } else if (spot.owner === p.playerNum) {
        setMode(2);
        setBuildOption(0);
      } else if (spot.owner !== p.playerNum) {
        setMode(3);
      }
      // 보물상자
    } else if (spot.type === "item") {
      setMode(4);
      getItem(turn);
      // 무인도
    } else if (spot.location === 10) {
      setMode(5);
      goDesert(turn);
      // 국세청
    } else if (spot.location === 30) {
      setMode(16);
    } else if (spot.location === 37) {
      setTmpTax(Math.floor((calAssets(p) / 10)));
      setMode(15);
    } else if (spot.type !== "nation" && spot.location !== 20 && spot.type !== "city") {
      setMode(5);
      // 정거장일 때
    } else if (spot.type !== "nation" && spot.location === 20) {
      setMode(6);
      setSelectMode(true);
    } else if (spot.type === 'city') {
      setMode(9);
      if (spot.location === 5) {
        // 멀티캠퍼스
        setTmpTax(100);
      } else if (spot.location === 15) {
        // 지중해
        setTmpTax(50);
      } else if (spot.location === 25) {
        // 사하라
        setTmpTax(-50);
      } else if (spot.location === 35) {
        // 파나마
        setTmpCnt(-100);
      }
    }
  }

  /** 세금 납부 함수 */ 
  function payTax(turn: number) {

    let p;
    let asset: number;
    if (turn === 0) {
      p = player.p1
      asset = calAssets(p);
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            balance: prevState.p1.game.balance - (asset / 10),
          }
        }
      }))
    } else if (turn === 1) {
      p = player.p2
      asset = calAssets(p);
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            balance: prevState.p2.game.balance - (asset / 10),
          }
        }
      }))
    } else if (turn === 2) {
      p = player.p3
      asset = calAssets(p);
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            balance: prevState.p3.game.balance - (asset / 10),
          }
        }
      }))
    } else if (turn === 3) {
      p = player.p4
      asset = calAssets(p);
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            balance: prevState.p4.game.balance - (asset / 10),
          }
        }
      }))
    }

    // 세금 올림픽 기금으로 누적
    setMetaData((prevState: any) => ({
      ...prevState,
      fund: prevState.fund + (asset / 10),
    }))
  }

  /** 이동하기 함수 */ 
  function move(turn: number, dice: number) {
    let p;
    if (turn === 0) {
      p = player.p1
    } else if (turn === 1) {
      p = player.p2
    } else if (turn === 2) {
      p = player.p3
    } else if (turn === 3) {
      p = player.p4
    }

    let result = p.game.location + dice;

    if (result >= 40) {

      console.log("한바퀴 완주 월급 + 50만원");
      result = result % 40;
      if (turn === 0) {
        console.log('플레이어 1 세팅')
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + 500,
            },
          },
        }));
      } else if (turn === 1) {
        console.log('플레이어 2 세팅')
        setPlayer((prevState: any) => ({
          ...prevState,
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + 500,
            },
          },
        }));
      } else if (turn === 2) {
        console.log('플레이어 3 세팅')
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + 500,
            },
          },
        }));
      } else if (turn === 3) {
        console.log('플레이어 4 세팅')
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + 500,
            },
          },
        }));
      }
    }
    setMetaData((prevState: any) => ({
      ...prevState,
      currentLocation: result,
    }));
    return result;
  }

  /** 원하는 좌표로 이동하는 함수 (인천공항) */
  function moveDircet(turn: number, location: number) {
    let p;
    if (turn === 0) {
      p = player.p1;
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            location: location,
          }
        }
      }))
    } else if (turn === 1) {
      p = player.p2;
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            location: location,
          }
        }
      }))
    } else if (turn === 2) {
      p = player.p3;
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            location: location,
          }
        }
      }))
    } else if (turn === 3) {
      p = player.p4;
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            location: location,
          }
        }
      }))
    }

    setMetaData((prevState: any) => ({
      ...prevState,
      currentLocation: location,
    }))


    // 도착지 주인 없을 때
    if (worldMap[location].owner === 0 && worldMap[location].type === 'nation') {
      setMode(1);
    } else if (worldMap[location].owner === (turn + 1) && worldMap[location].type === 'nation') { // 추가 건물
      setMode(2);
    } else if (worldMap[location].owner !== (turn + 1) && worldMap[location].type === 'nation') { // 통행료 지불
      setMode(3);
    } else if (worldMap[location].type === 'item') { // 보물상자
      setMode(4);
    } else if (worldMap[location].type === 'city') { // 특수도시
      setMode(9);
    } else if (location === 30 || location === 0) { // 올림픽
      setMode(16)
    } else if (location === 10) { // 무인도
      setMode(5)
      goDesert(turn);
    } else if (location === 37) { // 국세청
      setTmpTax(Math.floor((calAssets(p) / 10)));
      setMode(15);
    }

    setSelectMode(false);
  }

  /** 돈 오고가는 함수 */ 
  function getMoney(turn: number, money: number) {
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            balance: prevState.p1.game.balance + money,
          },
        },
      }));
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            balance: prevState.p2.game.balance + money,
          },
        },
      }));
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            balance: prevState.p3.game.balance + money,
          },
        },
      }));
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            balance: prevState.p4.game.balance + money,
          },
        },
      }));
    }
  }

  /** 보물상자 여는 함수 */ 
  function getItem(turn: number) {
    console.log('getItem 실행')
    let n = Math.floor(Math.random() * 17);
    // n = 7
    const i = item[n];
    // const pNum = (turn + 1);

    setMetaData((prevState: any) => ({
      ...prevState,
      itemMsg1: i.title,
      itemMsg2: i.content,
    }))

    if (n === 0) {
      // 주사위 한 번 더 던지기
      setMetaData((prevState: any) => ({
        ...prevState,
        isDouble: true,
      }));
      setActiveDice(true);
    } else if (n === 1) {
      // 무인도 이동
      setItemMove(10);
      setMode(13);
    } else if (n === 2) {
      // 원하는 곳으로 이동
      setMode(10);
      setSelectMode(true);
    } else if (n === 3) {
      // 2턴 쉬기
      setItemMove(10);
      setMode(13);
    } else if (n === 4) {
      // 뒤로 2칸
      setMode(11);
      setItemMove(-2)
    } else if (n === 5) {
      // 앞으로 3칸
      setMode(11);
      setItemMove(3)
    } else if (n === 6) {
      // 100만원 획득
      setMode(12);
      getMoney(turn, 100);
    } else if (n === 7) {
      // 국세청으로 이동
      setMode(13);
      setItemMove(37);
    } else if (n === 8) {
      // 200만원 획득
      setMode(12);
      getMoney(turn, 200);
    } else if (n === 9) {
      // 올림픽으로 이동
      setItemMove(30);
      setMode(13);
    } else if (n === 10) {
      // 한국으로 이동
      setItemMove(9);
      setMode(13);
    } else if (n === 11) {
      // 미국으로 이동
      setItemMove(39);
      setMode(13);
    } else if (n === 12) {
      // 이집트로 이동
      setItemMove(27);
      setMode(13);
    } else if (n === 13) {
      // 이탈리아로 이동
      setItemMove(14);
      setMode(13);
    } else if (n === 14) {
      // - 100만원
      setMode(12);
      getMoney(turn, -100);
    } else if (n === 15) {
      // 200만원 추가
      setMode(12);
      getMoney(turn, 200);
    } else if (n === 16) {
      // 뒤로 2칸 이동
      setMode(11);
      setItemMove(-2)
    }
  }

  /** 통행료 지불 함수 */ 
  function payToll(turn: number, spot: Spot) {
    if (turn === 0) {
      if (spot.owner === 2) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance - spot.toll,
            },
          },
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 3) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance - spot.toll,
            },
          },
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 4) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance - spot.toll,
            },
          },
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + spot.toll,
            },
          },
        }));
      }
    } else if (turn === 1) {
      if (spot.owner === 1) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance - spot.toll,
            },
          },
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 3) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance - spot.toll,
            },
          },
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 4) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance - spot.toll,
            },
          },
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + spot.toll,
            },
          },
        }));
      }
    } else if (turn === 2) {
      if (spot.owner === 1) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance - spot.toll,
            },
          },
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 2) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance - spot.toll,
            },
          },
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 4) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance - spot.toll,
            },
          },
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + spot.toll,
            },
          },
        }));
      }
    } else if (turn === 3) {
      if (spot.owner === 1) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance - spot.toll,
            },
          },
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 2) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance - spot.toll,
            },
          },
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + spot.toll,
            },
          },
        }));
      } else if (spot.owner === 3) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance - spot.toll,
            },
          },
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + spot.toll,
            },
          },
        }));
      }
    }



  }

  /** 구매하기 */ 
  function buy(turn: number, spot: Spot, buyOption: number) {
    // 잔액이 있는지 확인
    if (turn === 0) {
      if (player.p1.game.balance - totalPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 1) {
      if (player.p2.game.balance - totalPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 2) {
      if (player.p3.game.balance - totalPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 3) {
      if (player.p4.game.balance - totalPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    }

    // 금액 결제 및 구매 국가 리스트에 추가
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            balance: prevState.p1.game.balance - totalPrice,
            own: [...prevState.p1.game.own, spot.location],
          },
        },
      }));
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            balance: prevState.p2.game.balance - totalPrice,
            own: [...prevState.p2.game.own, spot.location],
          },
        },
      }));
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            balance: prevState.p3.game.balance - totalPrice,
            own: [...prevState.p3.game.own, spot.location],
          },
        },
      }));
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            balance: prevState.p4.game.balance - totalPrice,
            own: [...prevState.p4.game.own, spot.location],
          },
        },
      }));
    }

    // 각 지역에 소유주 추가

    if (buyOption === 0) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: true,
                  villa: item.build.villa,
                  hotel: item.build.hotel,
                  landmark: item.build.landmark,
                },
                owner: turn + 1,
              }
              : item
          ),
        ],
      }));
    } else if (buyOption === 1) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: true,
                  villa: true,
                  hotel: item.build.hotel,
                  landmark: item.build.landmark,
                },
                owner: turn + 1,
              }
              : item
          ),
        ],
      }));
    } else if (buyOption === 2) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: true,
                  villa: item.build.villa,
                  hotel: true,
                  landmark: item.build.landmark,
                },
                owner: turn + 1,
              }
              : item
          ),
        ],
      }));
    } else if (buyOption === 3) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: true,
                  villa: item.build.villa,
                  hotel: item.build.hotel,
                  landmark: true,
                },
                owner: turn + 1,
              }
              : item
          ),
        ],
      }));
    }

    // 구매완료 페이지로 UI 변경
    setMode(7);
  }

  /** 통행료 계산 함수 */ 
  function calculateToll(spot: Spot) {
    // 땅만 있을때
    if (!spot.build.villa && !spot.build.hotel && !spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll: spot.price.land / 2,
              }
              : item
          ),
        ],
      }));
    } // 별장만
    else if (spot.build.villa && !spot.build.hotel && !spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll: (spot.price.land + spot.price.villa) / 2,
              }
              : item
          ),
        ],
      })); // 호텔만
    } else if (!spot.build.villa && spot.build.hotel && !spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll: (spot.price.land + spot.price.hotel) / 2,
              }
              : item
          ),
        ],
      })); // 별장 + 호텔
    } else if (spot.build.villa && spot.build.hotel && !spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll:
                  (spot.price.land + spot.price.villa + spot.price.hotel) / 2,
              }
              : item
          ),
        ],
      })); // 별장 + 랜드마크
    } else if (spot.build.villa && !spot.build.hotel && spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll: spot.price.land + spot.price.villa + spot.price.hotel,
              }
              : item
          ),
        ],
      })); // 랜드마크만
    } else if (!spot.build.villa && !spot.build.hotel && spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll: spot.price.land + spot.price.landmark,
              }
              : item
          ),
        ],
      })); // 호텔 + 랜드마크
    } else if (!spot.build.villa && spot.build.hotel && spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll:
                  (spot.price.land + spot.price.hotel + spot.price.landmark) /
                  2,
              }
              : item
          ),
        ],
      })); // 별장 + 호텔 + 랜드마크
    } else if (spot.build.villa && spot.build.hotel && spot.build.landmark) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                toll:
                  (spot.price.land +
                    spot.price.villa +
                    spot.price.hotel +
                    spot.price.landmark) *
                  1.5,
              }
              : item
          ),
        ],
      }));
    }
  }

  /** 플레이어 이동함수 */ 
  function movePlayer(turn: number, dis: number) {


    const tmpLocation = move(turn, dis);

    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            location: tmpLocation,
          }
        }
      }))
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            location: tmpLocation,
          }
        }
      }))
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            location: tmpLocation,
          }
        }
      }))
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            location: tmpLocation,
          }
        }
      }))
    }

    const spot = worldMap[tmpLocation];


    // 국가 일때
    if (spot.type === 'nation') {
      // 주인 없을때
      if (spot.owner === 0) {

        setMode(1);
        setBuyOption(0);

        // 내 땅일 때(추가 건설)
      } else if (spot.owner === (turn + 1)) {
        console.log('추가건설')
        setMode(2);
        setBuildOption(0);

        // 통행료 지불
      } else if (spot.owner !== (turn + 1)) {
        console.log('통행료 지불')
        setMode(3);
        calculateToll(spot);
      }
    }

   
  }

  /** 건설하기 */ 
  function build(turn: number, spot: Spot, buildOption: number) {
    // 잔액이 있는지 확인
    if (turn === 0) {
      if (player.p1.game.balance - buildPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 1) {
      if (player.p2.game.balance - buildPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 2) {
      if (player.p3.game.balance - buildPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    } else if (turn === 3) {
      if (player.p4.game.balance - buildPrice < 0) {
        // alert("잔액이 부족합니다.");
        Swal.fire('잔액이 부족합니다.')
          .then(function(){
            return;
          });
        // return;
      }
    }

    // 금액 결제 및 구매
    if (turn === 0) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p1: {
          ...prevState.p1,
          game: {
            ...prevState.p1.game,
            balance: prevState.p1.game.balance - buildPrice,
          },
        },
      }));
    } else if (turn === 1) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p2: {
          ...prevState.p2,
          game: {
            ...prevState.p2.game,
            balance: prevState.p2.game.balance - buildPrice,
          },
        },
      }));
    } else if (turn === 2) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p3: {
          ...prevState.p3,
          game: {
            ...prevState.p3.game,
            balance: prevState.p3.game.balance - buildPrice,
          },
        },
      }));
    } else if (turn === 3) {
      setPlayer((prevState: any) => ({
        ...prevState,
        p4: {
          ...prevState.p4,
          game: {
            ...prevState.p4.game,
            balance: prevState.p4.game.balance - buildPrice,
          },
        },
      }));
    }

    // 지역에 건물 추가
    if (buildOption === 0) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: item.build.land,
                  villa: true,
                  hotel: item.build.hotel,
                  landmark: item.build.landmark,
                },
              }
              : item
          ),
        ],
      }));
    } else if (buildOption === 1) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: item.build.land,
                  villa: item.build.villa,
                  hotel: true,
                  landmark: item.build.landmark,
                },
              }
              : item
          ),
        ],
      }));
    } else if (buildOption === 2) {
      setWorldMap((prevState: any) => ({
        ...prevState,
        worldMap: [
          ...prevState.worldMap.map((item: any, key: number) =>
            key === spot.location
              ? {
                ...item,
                build: {
                  land: item.build.land,
                  villa: item.build.villa,
                  hotel: item.build.hotel,
                  landmark: true,
                },
              }
              : item
          ),
        ],
      }));
    }

    // 구매완료 페이지로 UI 변경
    setMode(7);
  }

  /** 2D에서 회계표현식 */
  function priceToString(price:any) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  // const [ playerData, setPlayerData ] = useState<Object>(metaData)
  const [diceData, setDiceData] = useState<number>(0)

  const getPlayerTurn = (turn:any) => {
    playerTurn(turn)
  }
  console.log(metaData)
// export default function Game3D(props: any) {
  const playerInfo:PlayerInfoType = {
    playerIndex: 1,
    currentIndex: 0,
    turn: 0
  }

  return (
  <div className='w-screen h-screen  bg-[#FFFDF4] flex flex-col justify-center items-center'>
    <Game3DItem metaData={metaData} player={player} diceData={diceData} getPlayerTurn={getPlayerTurn} />
  </div>
  )
}
