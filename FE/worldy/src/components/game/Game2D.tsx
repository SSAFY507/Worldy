import "./dice.css";

import React, { useEffect, useState } from "react";

import Dice from "./Dice";
import GameQuizModal from "../GameQuizModal";
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Game2D(props: any) {
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

  // useEffect(() => {
  // if (worldMap[metaData.currentLocation].type === 'nation') {

  //   setTimeout(() => {
  //     ws.send(
  //       `/pub/game/quiz/kakao/${roomId}/${metaData.currentLocation}`,
  //       {},
  //       JSON.stringify(null)
  //     );
  //   }, 1000);
  // }
  // }, [metaData.currentLocation])


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

  // useEffect(() => {
  //   sendData();
  // }, [metaData.turn]);

  // useEffect(() => {
  //   setMode(8);
  // }, [])

  useEffect(() => {
    console.log('metaData.curcuit : ')
    console.log(metaData.curcuit)
    if (metaData.curcuit >= 8) {
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

  // // 주사위 던지는 함수
  // const rollDice = () => {
  //   console.log("주사위 함수 실행");
  //   const dice1 = Math.floor(Math.random() * 6 + 1);
  //   const dice2 = Math.floor(Math.random() * 6 + 1);
  //   const dice = dice1 + dice2;
  //   let isDouble = false;
  //   if (dice1 === dice2) {
  //     isDouble = true;
  //   }

  //   setMetaData((prevState: any) => ({
  //     ...prevState,
  //     dice1: dice1,
  //     dice2: dice2,
  //     dice: dice,
  //     isDouble: true,
  //   }));
  //   showDice(dice1, dice2);
  // };

  // 게임 등수 
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

  // 게임 종료 함수 
  function finishGame() {
    console.log(player);

    findRanking(player.p1);
    findRanking(player.p2);
    findRanking(player.p3);
    findRanking(player.p4);
    calRanking();
    setGameResultSet(true);
  }

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
  // 게임 결과 세팅 후 실행
  if (gameResultSet) {
    console.log("데이터 axios");
    console.log(gameResult);
    gameResultAxios();
  }

  const [gameFinish, setGameFinish] = useState<boolean>(false)

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

  // 게임 종료 후 페이지 이동
  if (gameFinish && gameResultSet) {
    
    navigate('/game/result', { state: rankPlayerData });
  }

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

  const [updateRankingCheck, setUpdateRankingCheck] = useState<boolean>(false)

  // 정렬
  if (updateRankingCheck) {
    console.log("정렬중");
    
    updateRanking();
    setUpdateRankingCheck(false);
  }

  // 정렬 함수
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


  // 무인도로 바꾸는 함수
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

  function animateDice(randomNumber: number, dice: any) {
    if (dice.id === `dice-${randomNumber}`) {
      setTimeout(function () {
        dice.classList.add("active");
      });
    }
  }

  // 플레이어 턴 함수
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
    showDice(dice1, dice2);


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


  // 세금 납부 함수
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


  // 이동하기 함수
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

  // 원하는 좌표로 이동하는 함수
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


  // 돈 오고가는 함수
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

  // 보물상자 여는 함수
  function getItem(turn: number) {
    console.log('getItem 실행')
    let n = Math.floor(Math.random() * 17);
    n = 2;
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



  // 통행료 지불 함수
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


  // 턴 오버 함수
  // function turnOVer() {
  //   setMetaData((prevState: any) => ({
  //     ...prevState,
  //     turnOVer: true,
  //   }))
  // }

  // 구매하기
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

  // 통행료 계산 함수
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


  // 플레이어 이동함수
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

    //   if (spot.type === "nation") {
    //     // 1) 주인 없음
    //     if (spot.owner === 0) {
    //       setMode(1);
    //       setBuyOption(0);
    //     } else if (spot.owner === p.playerNum) {
    //       setMode(2);
    //       setBuyOption(0);
    //     } else if (spot.owner !== p.playerNum) {
    //       setMode(3);
    //     }
    //     // 보물상자
    //   } else if (spot.type === "item") {
    //     setMode(4);
    //     getItem(turn);

    //     // 특수지역
    //   } else if (spot.type !== "nation" && spot.location !== 20 && spot.type !== "city") {
    //     setMode(5);
    //     // 정거장일 때
    //   } else if (spot.type !== "nation" && spot.location === 20) {
    //     setMode(6);
    //     setSelectMode(true);
    //   } else if (spot.type === 'city') {
    //     setMode(9);
    //   }
    // }





    // setMode(0);
    // setMetaData((prevState: any) => ({
    //   ...prevState,
    //   turnOver: true,
    // }))

  }

  // 건설하기
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

  function priceToString(price:any) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <>

      {/* 더블 모달 */}
      {metaData.isDouble ?
        <div className="w-[200px] h-[200px] absolute top-[120px] left-[830px] z-[50] rotate-[-10deg]">
          <img src="/game/double.png" alt="" />
        </div>
        : null}

      {/* 퀴즈 모달 */}
      {quizModalState && (
        <div className="shadow-md shadow-black w-fit h-fit">
          <GameQuizModal input={quiz} closeModal={() => closeModal(false)} />
        </div>
      )}

      <div
        className={`w-full h-full bg-[#FFFDF4] flex justify-center items-center ${quizModalState ? "blur-sm " : ""
          }`}
      >
        {/* 왼쪽영역 */}
        <div className="w-[20%] h-full flex flex-col justify-start items-end mb-[60px]">
          <div className="w-[320px] h-[920px] mb-[50px]  flex flex-col justify-around items-center">
            {pList.map((i, index) => {
              return (
                <div key={index}>
                  <div className="w-[60px] h-[60px] relative top-[50%] left-[-60px]">
                  { (metaData.turn + 1 === i.playerNum) && i.playerNum === 1 ?
                    <img className="w-[60px] h-[60px] relative rotate-[-90deg]" src="/game/p1_point.gif"></img>
                    : null}
                  { (metaData.turn + 1 === i.playerNum) && i.playerNum === 2 ?
                    <img className="w-[60px] h-[60px] relative rotate-[-90deg]" src="/game/p2_point.gif"></img>
                    : null}
                  { (metaData.turn + 1 === i.playerNum) && i.playerNum === 3 ?
                    <img className="w-[60px] h-[60px] relative rotate-[-90deg]" src="/game/p3_point.gif"></img>
                    : null}
                  {(metaData.turn + 1 === i.playerNum) && i.playerNum === 4 ?
                    <img className="w-[60px] h-[60px] relative rotate-[-90deg]" src="/game/p4_point.gif"></img>
                  : null}
                  </div>
                  <div
                    className={`w-[350px] h-[238px] rounded-[8px] flex flex-col justify-center items-center 
                    ${(metaData.turn + 1 === i.playerNum) && i.playerNum === 1 ? "bg-red-200/40 user1glowing"  
                      : (metaData.turn + 1 === i.playerNum) && i.playerNum === 2 ? "bg-green-200/40 user2glowing"
                      : (metaData.turn + 1 === i.playerNum) && i.playerNum === 3 ? "bg-blue-200/40 user3glowing" 
                      : (metaData.turn + 1 === i.playerNum) && i.playerNum === 4 ? "bg-purple-200/40 user4glowing" : "bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                     }
                    `}
                  >
                    <div className="w-[280px] h-[240px] mt-[20px]">
                    <div className={`flex justify-between items-center text-[#C0C0C0]
                    `}>
                      <div className="text-[12px]">플레이어</div>
                      <div className={`text-[15px] font-PtdBold 
                        ${i.playerNum === 1 ? 'text-red-400' : ''}
                        ${i.playerNum === 2 ? 'text-green-400' : ''}
                        ${i.playerNum === 3 ? 'text-blue-400' : ''}
                        ${i.playerNum === 4 ? 'text-purple-400' : ''}`
                        }>{worldMap[i.game.location].name}</div>
                    </div>
                    <div className="flex items-center justify-between h-[60px] mt-[10px] mb-[10px] border-solid border-[#E9E9E9] border-b-[1px]">
                  
                        {i.playerNum === 1 ? <img src={user1.profileImg} className="w-[50px] h-[50px] rounded-full object-cover"></img> : null}
                        {i.playerNum === 2 ? <img src={user2.profileImg} className="w-[50px] h-[50px] rounded-full object-cover"></img> : null}
                        {i.playerNum === 3 ? <img src={user3.profileImg} className="w-[50px] h-[50px] rounded-full object-cover"></img> : null}
                        {i.playerNum === 4 ? <img src={user4.profileImg} className="w-[50px] h-[50px] rounded-full object-cover"></img> : null}
                        <div className="text-[30px] font-PtdBold ml-[10px] w-[130px] truncate">{i.name}</div>
                        <div className={`text-[14px] text-white flex justify-center items-center w-[50px] h-[30px] rounded-full ml-[10px]
                        ${rankPlayerData.rankPlayer[0].nickName && i.playerNum === 1 ? 'bg-red-400' : ''}
                        ${rankPlayerData.rankPlayer[0].nickName && i.playerNum === 2 ? 'bg-green-400' : ''}
                        ${rankPlayerData.rankPlayer[0].nickName && i.playerNum === 3 ? 'bg-blue-400' : ''}
                        ${rankPlayerData.rankPlayer[0].nickName && i.playerNum === 4 ? 'bg-purple-400' : ''}
                        `}>
                          {i.name === rankPlayerData.rankPlayer[0].nickName ? '1위' : ''}
                          {i.name === rankPlayerData.rankPlayer[1].nickName ? '2위' : ''}
                          {i.name === rankPlayerData.rankPlayer[2].nickName ? '3위' : ''}
                          {i.name === rankPlayerData.rankPlayer[3].nickName ? '4위' : ''}
                        </div>
                        {/* <div className="flex items-center justify-end text-[20px] font-PtdBold ml-[6px] w-[80px]">
                          <div>{worldMap[i.game.location].name}</div>
                        </div> */}
               
                      </div>
                      <div className="flex flex-col w-full h-[40px] items-between">
                        <div className={`text-[12px] mt-[10px] text-[#C0C0C0]
                        `}>보유자산</div>
                        <div className="flex mt-[10px] justify text-[20px] font-PtdBold ">
                          <div className="w-[40px]">
                           <img src='/game/coin.png' className="h-[35px] mt-[-9px] object-cover"></img> 
                           </div>
                          <div className="">{priceToString(i.game.balance)}</div>  
                          <div className="flex justify-end w-[200px]">
                            <div className="">만원</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-[60px] items-between mt-[20px]">
                        <div className={`text-[12px] mt-[10px] text-[#C0C0C0]
                        `}>
                          소유국가[총{i.game.own.length}개]
                        </div>
                        <div className="flex mt-[10px] h-[80px] w-full">
                          <div className="text-[14px]  h-[80px] w-full flex flex-wrap">
                            {i.game.own.map((e, index) => {
                              return (
                                <div key={index} className="flex flex-wrap">
                                  <img
                                    className="w-[30px] h-[20px] bg-red-200 mr-[4px]"
                                    src={`/game/f${e}.png`}
                                  ></img>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 가운데 영역 */}
        <div className="w-[60%] h-full flex justify-center items-center mb-[20px]">
          <div className="w-[1010px] h-[1010px] rounded-[4px] mb-[50px] flex justify-center items-center relative left-[180px]">
            <div className="w-[1100px] h-[1100px] rounded-[12px] bg-[url('../../public/game/gameBG2.png')] flex justify-center items-center">
              {/* <img src="/game/enter2.png" alt="img" className="w-[630px] objec-cover absolute top-[340px] left-[185px] opacity-20" /> */}
              {/* 0~ 10 */}
              <div className="w-[990px] h-[90px] rounded-[10px] z-[1] flex relative top-[-450px] left-[496px]">
                {worldMap.map((i: Spot, index: number) => {
                  return (
                    <div key={index}
                      className={selectMode ? 'hover:cursor-pointer hover:bg-red-200 hover:opacity-15' : ''}
                      onClick={() => {
                        console.log(index)
                        setNewLocation(index);
                      }}>
                      {i.type === "nation" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}

                            </div> : null}

                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameRed w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${i.owner === 0 && "bg-white"
                                } ${i.owner === 1 && "bg-red-100"} ${i.owner === 2 && "bg-green-100"
                                } ${i.owner === 3 && "bg-blue-100"} ${i.owner === 4 && "bg-purple-100"
                                }`}
                            >
                              <div className="w-full h-[20px] flex justify-around">
                                {i.build.villa ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/villa.png"
                                  ></img>
                                ) : null}
                                {i.build.hotel ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/hotel.png"
                                  ></img>
                                ) : null}
                                {i.build.landmark ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/landmark.png"
                                  ></img>
                                ) : null}
                              </div>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}

                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameBlack w-[90px] h-[30px] text-white rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "start" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[15px] flex flex-col justify-center items-center bg-[#1F93FF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[10px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[59.5px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="start relative mt-[-13px] w-[90px] h-[30px] rounded-[2px] flex justify-center text-white font-PtdExtraBold ">
                              START
                            </div>
                            <div className="w-[80px] h-[78px] mt-[-15px] rounded-[10px] flex flex-col justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#3CDCFF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textItem w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              <img
                                src="/game/item.png"
                                className="w-[50px] object-cover absolute z-[1]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* 10~ 20 */}
              <div className="w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-col relative top-[-450px] left-[496px]">
                {worldMap.map((i: Spot, index: number) => {
                  return (
                    <div key={index}
                      className={selectMode ? 'hover:cursor-pointer hover:bg-red-200 hover:opacity-75' : ''}
                      onClick={() => {
                        console.log(index)
                        setNewLocation(index);
                      }}>
                      {i.type === "nation" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-green-400">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameGreen w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${i.owner === 0 && "bg-white"
                                } ${i.owner === 1 && "bg-red-100"} ${i.owner === 2 && "bg-green-100"
                                } ${i.owner === 3 && "bg-blue-100"} ${i.owner === 4 && "bg-purple-100"
                                }`}
                            >
                              <div className="w-full h-[20px] flex justify-around">
                                {i.build.villa ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/villa.png"
                                  ></img>
                                ) : null}
                                {i.build.hotel ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/hotel.png"
                                  ></img>
                                ) : null}
                                {i.build.landmark ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/landmark.png"
                                  ></img>
                                ) : null}
                              </div>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameBlack text-white w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "desert" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#BFE259]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[16px] left-[84px] rotate-90" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}

                            <div className="textDesert text-white w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              무인도
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              <img
                                src="/game/desert.png"
                                className="w-[50px] object-cover absolute z-[1]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#3CDCFF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textItem w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              <img
                                src="/game/item.png"
                                className="w-[52px] object-cover absolute z-[1]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* 20~ 30 */}
              <div className="w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-row-reverse relative top-[450px] left-[-404px]">
                {worldMap.map((i: Spot, index: number) => {
                  return (
                    <div key={index}
                      className={selectMode ? 'hover:cursor-pointer hover:bg-red-200 hover:opacity-75' : ''}
                      onClick={() => {
                        console.log(index)
                        setNewLocation(index);
                      }}>
                      {i.type === "nation" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#FDE047]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameYellow w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${i.owner === 0 && "bg-white"
                                } ${i.owner === 1 && "bg-red-100"} ${i.owner === 2 && "bg-green-100"
                                } ${i.owner === 3 && "bg-blue-100"} ${i.owner === 4 && "bg-purple-100"
                                }`}
                            >
                              <div className="w-full h-[20px] flex justify-around">
                                {i.build.villa ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/villa.png"
                                  ></img>
                                ) : null}
                                {i.build.hotel ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/hotel.png"
                                  ></img>
                                ) : null}
                                {i.build.landmark ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/landmark.png"
                                  ></img>
                                ) : null}
                              </div>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameBlack text-white w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "port" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameBlack text-white w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              정거장
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#3CDCFF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[-60px] left-[16px]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textItem w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                             <img
                                src="/game/item.png"
                                className="w-[50px] object-cover absolute z-[1]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* 30~ 40 */}
              <div className="w-[990px] h-[90px] rounded-[10px] z-[1] flex flex-col-reverse relative top-[450px] left-[-1394px]">
                {worldMap.map((i: Spot, index: number) => {
                  return (
                    <div key={index}
                      className={selectMode ? 'hover:cursor-pointer hover:bg-red-200 hover:opacity-75' : ''}
                      onClick={() => {
                        console.log(index)
                        setNewLocation(index);
                      }}>
                      {i.type === "nation" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-purple-400">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNamePurple w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${i.owner === 0 && "bg-white"
                                } ${i.owner === 1 && "bg-red-100"} ${i.owner === 2 && "bg-green-100"
                                } ${i.owner === 3 && "bg-blue-100"} ${i.owner === 4 && "bg-purple-100"
                                }`}
                            >
                              <div className="w-full h-[20px] flex justify-around">
                                {i.build.villa ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/villa.png"
                                  ></img>
                                ) : null}
                                {i.build.hotel ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/hotel.png"
                                  ></img>
                                ) : null}
                                {i.build.landmark ? (
                                  <img
                                    className="w-[16px] h-[14px] object-cover mt-[4px]"
                                    src="/game/landmark.png"
                                  ></img>
                                ) : null}
                              </div>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameBlack text-white w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "olympic" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#D96BFF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="olympic w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              올림픽
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex flex-col justify-center items-center bg-white">
                                <img
                                  src="/game/f30.png"
                                  className="w-[42px] h-[26px] object-cover relative z-[2]"
                                ></img>
                                <div className="w-full h-[16px] text-[14px] text-center">{metaData.fund}만원</div>
                                {i.location === player.p1.game.location && (
                                  <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                    {player.p1.name.substr(0, 2)}
                                  </div>
                                )}
                                {i.location === player.p2.game.location && (
                                  <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                    {player.p2.name.substr(0, 2)}
                                  </div>
                                )}
                                {i.location === player.p3.game.location && (
                                  <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                    {player.p3.name.substr(0, 2)}
                                  </div>
                                )}
                                {i.location === player.p4.game.location && (
                                  <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                    {player.p4.name.substr(0, 2)}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      {i.type === "tax" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#8A96FF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="tax w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              국세청
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex flex-col justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-[#3CDCFF]">
                            {metaData.currentLocation === i.location ? <div className={`w-[92px] h-[92px] rounded-[6px] outline outline-[4px]  outline-dashed absolute z-[9000]
                            ${metaData.turn === 0 ? 'outline-red-400' : ''} 
                            ${metaData.turn === 1 ? 'outline-green-400' : ''} 
                            ${metaData.turn === 2 ? 'outline-blue-400' : ''} 
                            ${metaData.turn === 3 ? 'outline-purple-400' : ''} 
                            `}>
                              {metaData.turn === 0 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p1_point.gif"></img>
                                : null}
                              {metaData.turn === 1 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p2_point.gif"></img>
                                : null}
                              {metaData.turn === 2 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p3_point.gif"></img>
                                : null}
                              {metaData.turn === 3 ?
                                <img className="w-[60px] h-[60px] relative top-[20px] left-[-50px] rotate-[-90deg]" src="/game/p4_point.gif"></img>
                                : null}
                            </div> : null}
                            {selectMode && newLoaction === i.location ? <div className="w-[92px] h-[92px] rounded-[6px] outline outline-[4px] outline-red-500 outline-dashed absolute z-[9000]">
                            </div> : null}
                            <div className="textNameItem w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              <img
                                src="/game/item.png"
                                className="w-[52px] object-cover absolute z-[1]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name.substr(0, 2)}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name.substr(0, 2)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-[380px] h-[780px] flex flex-col justify-start items-center relative top-[-20px] left-[-510px]">
            <div className="w-[380px] h-[260px] rounded-[8px] bg-white shadow-lg">
              {/* 주사위 영역 */}
              <Dice></Dice>
              <div
                className={`w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] ${myTurn && activeDice
                  ? "gameglowing bg-red-500 hover:cursor-pointer hover:bg-red-600"
                  : "bg-gray-300 pointer-events-none"
                  }`}
                onClick={() => {
                  playerTurn(metaData.turn);
                }}
              >
                주사위 던지기
              </div>
              <div
                className="bg-white w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-gray-300 text-[20px] absolute top-[1360px]"
                onClick={() => {
                  setMetaData((prevState: any) => ({
                    ...prevState,
                    turnOver: true,
                  }));
                  setMode(0);
                  calRanking();
                  sendData();
                }}
              >
                턴 종료
              </div>
              <div
                className="bg-white w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-gray-300 text-[20px] absolute top-[1290px]"
                onClick={() => {
                  playerTurn(metaData.turn);
                }}
              >
                다른 사람 주사위
              </div>

              {/* <div
                id="shbutton"
                className="w-[200px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute left-[400px] top-[290px]"
                onClick={() => {
                  ws.send(
                    `/pub/game/quiz/kakao/${roomId}/${metaData.currentLocation}`,
                    {},
                    JSON.stringify(null)
                  );
                }}
              >
                퀴즈 요청
              </div> */}



              {/* 콘솔창 영역 */}
              <div
                className={`w-[380px] h-[340px] bg-white rounded-[8px] mt-[150px] shadow-lg relative flex justify-center items-center
                ${myTurn && me.playerNum === 1 ? "outline outline-[6px] outline-red-400" : ""}
                ${myTurn && me.playerNum === 2 ? "outline outline-[6px] outline-green-400" : ""}
                ${myTurn && me.playerNum === 3 ? "outline outline-[6px] outline-blue-400" : ""}
                ${myTurn && me.playerNum === 4 ? "outline outline-[6px] outline-purple-400" : ""}
                `}
              >
                <div className="w-[340px] h-[300px] flex flex-col items-center">
                  {/*  */}
                  <div className="w-full h-[80px] flex flex-col items-center">
                    <div className="">
                      [{worldMap[metaData.currentLocation].location}][
                      {worldMap[metaData.currentLocation].continent
                        ? worldMap[metaData.currentLocation].continent
                        : "특수지역"}
                      ]
                    </div>
                    <div className="w-full h-[80px] flex items-center justify-center border-0 border-b-[1px] border-solid border-gray-400">
                      <img
                        src={`/game/f${metaData.currentLocation}.png`}
                        alt="이미지"
                        className="w-[50px] h-[32px] rounded-[4px] object-cover absolute left-[30px]"
                      ></img>
                      <div className="text-[36px] font-PtdExtraBold ">
                        {worldMap[metaData.currentLocation].name}
                      </div>
                      {worldMap[metaData.currentLocation].owner === 0 &&
                        worldMap[metaData.currentLocation].type ===
                        "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-green-600 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            구입가능
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 0 &&
                        worldMap[metaData.currentLocation].type !== "nation" &&
                        worldMap[metaData.currentLocation].type === "item" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-[#3CDCFF] rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            보물상자
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 0 &&
                        worldMap[metaData.currentLocation].type !== "nation" &&
                        worldMap[metaData.currentLocation].type !== "item" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-purple-600 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            특수지역
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 1 &&
                        worldMap[metaData.currentLocation].type ===
                        "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-red-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p1.name.substr(0, 2)} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 2 &&
                        worldMap[metaData.currentLocation].type ===
                        "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-green-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p2.name.substr(0, 2)} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 3 &&
                        worldMap[metaData.currentLocation].type ===
                        "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-blue-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p3.name.substr(0, 2)} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 4 &&
                        worldMap[metaData.currentLocation].type ===
                        "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-purple-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p4.name.substr(0, 2)} 소유
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="w-full h-[220px] mt-[6px] flex justify-center items-center">
                    {/* mode에 따라 갈아끼울 영역 */}
                    {/* 1. 국가일 때 */}
                    {mode === 0 && (
                      <div className="text-[30px] font-PtdExtraBold">
                        플레이어 {(metaData.turn + 1)}턴
                      </div>
                    )}
                    {mode === 1 && (
                      <div>
                        <div className="w-full h-[120px] flex items-center justify-between border-0 border-b-[1px] border-solid border-gray-400 pb-[6px]">
                          {/* 땅만 */}
                          <div
                            onClick={() => {
                              setBuyOption(0);
                              setTotalPrice(
                                worldMap[metaData.currentLocation].price.land
                              );
                            }}
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${buyOption === 0 ? "bg-gray-300" : ""
                              }`}
                          >
                            <img
                              className="w-[20px] h-[20px] object-fit mt-[10px]"
                              src="/game/land.png"
                              alt="이미지"
                            ></img>
                            <div className="text-[16px] mt-[12px] font-PtdExtraBold">
                              땅
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <p className="text-[16px] font-Ptd">
                                {worldMap[metaData.currentLocation].price.land}
                              </p>
                              <p className="text-[8px]">만원</p>
                            </div>
                          </div>
                          {/* 별장 */}
                          <div
                            onClick={() => {
                              setBuyOption(1);
                              setTotalPrice(
                                worldMap[metaData.currentLocation].price.land +
                                worldMap[metaData.currentLocation].price.villa
                              );
                            }}
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${buyOption === 1 ? "bg-gray-300" : ""
                              }`}
                          >
                            <img
                              className="w-[26px] h-[26px] object-fit mt-[10px]"
                              src="/game/villa.png"
                              alt="이미지"
                            ></img>
                            <div className="text-[16] mt-[12px] font-PtdExtraBold">
                              별장
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <p className="text-[16px] font-Ptd">
                                {worldMap[metaData.currentLocation].price.villa}
                              </p>
                              <p className="text-[8px]">만원</p>
                            </div>
                          </div>
                          {/* 호텔 */}
                          <div
                            onClick={() => {
                              setBuyOption(2);
                              setTotalPrice(
                                worldMap[metaData.currentLocation].price.land +
                                worldMap[metaData.currentLocation].price.hotel
                              );
                            }}
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${buyOption === 2 ? "bg-gray-300" : ""
                              }`}
                          >
                            <img
                              className="w-[22px] h-[22px] object-fit mt-[10px]"
                              src="/game/hotel.png"
                              alt="이미지"
                            ></img>
                            <div className="text-[16px] mt-[12px] font-PtdExtraBold">
                              호텔
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <p className="text-[16px] font-Ptd">
                                {worldMap[metaData.currentLocation].price.hotel}
                              </p>
                              <p className="text-[8px]">만원</p>
                            </div>
                          </div>
                          {/* 랜드마크 */}
                          <div
                            onClick={() => {
                              setBuyOption(3);
                              setTotalPrice(
                                worldMap[metaData.currentLocation].price
                                  .landmark
                              );
                            }}
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${worldMap[metaData.currentLocation].owner ===
                              metaData.turn + 1
                              ? ""
                              : "pointer-events-none"
                              }  ${buyOption === 3 ? "bg-gray-300" : ""}`}
                          >
                            <img
                              className="w-[24px] h-[28px] object-fit mt-[10px]"
                              src={`${worldMap[metaData.currentLocation].owner ===
                                metaData.turn + 1
                                ? "/game/landmark.png"
                                : "/game/landmark_gray.png"
                                }`}
                              alt="이미지"
                            ></img>
                            <div
                              className={`text-[16px] mt-[12px] font-PtdExtraBold ${worldMap[metaData.currentLocation].owner ===
                                metaData.turn + 1
                                ? ""
                                : "text-gray-300"
                                }`}
                            >
                              랜드마크
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <p
                                className={`text-[16px] font-Ptd ${worldMap[metaData.currentLocation].owner ===
                                  metaData.turn + 1
                                  ? ""
                                  : "text-gray-300"
                                  }`}
                              >
                                {
                                  worldMap[metaData.currentLocation].price
                                    .landmark
                                }
                              </p>
                              <p
                                className={`text-[8px] ${worldMap[metaData.currentLocation].owner ===
                                  metaData.turn + 1
                                  ? ""
                                  : "text-gray-300"
                                  }`}
                              >
                                만원
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* 총 가격 영역 */}
                        <div className="w-full h-[40px] flex justify-end items-end">
                          <span className="text-[20px]">
                            총 가격 :&nbsp;&nbsp;
                          </span>
                          <span className="text-[32px] font-PtdExtraBold">
                            {totalPrice}&nbsp;
                          </span>
                          <span className="text-[18px]">만원</span>
                        </div>
                        {/* 버튼 영역 */}
                        <div className="w-[330px] h-[52px] flex items-end justify-between">
                          <div
                            className="w-[154px] h-[46px] bg-blue-400 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-blue-500 hover:cursor-pointer"
                            onClick={() => {
                              buy(
                                metaData.turn,
                                worldMap[metaData.currentLocation],
                                buyOption
                              );
                            }}
                          >
                            구입하기
                          </div>
                          <div
                            className="w-[154px] h-[46px] bg-gray-400 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-gray-500 hover:cursor-pointer"
                            onClick={() => {
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            Skip
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. 내 소유지일 때 */}
                    {mode === 2 && (
                      <div>
                        <div className="w-full h-[120px] flex items-center justify-between border-0 border-b-[1px] border-solid border-gray-400 pb-[6px]">
                          {/* 별장 건설 */}
                          {worldMap[metaData.currentLocation].build.villa && (
                            <div
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px]`}
                            >
                              <img
                                className="w-[26px] h-[26px] object-fit mt-[10px]"
                                src="/game/villa_gray.png"
                                alt="이미지"
                              ></img>
                              <div className="text-[16] mt-[12px] font-PtdExtraBold text-[#C2C2C2]">
                                별장
                              </div>
                              <div className="text-[16] mt-[12px] font-Ptd text-[#C2C2C2]">
                                건설완료
                              </div>
                            </div>
                          )}
                          {!worldMap[metaData.currentLocation].build.villa && (
                            <div
                              onClick={() => {
                                setBuildOption(0);
                                setBuildPrice(
                                  worldMap[metaData.currentLocation].price.villa
                                );
                              }}
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${buildOption === 0 ? "bg-gray-300" : ""
                                }`}
                            >
                              <img
                                className="w-[26px] h-[26px] object-fit mt-[10px]"
                                src="/game/villa.png"
                                alt="이미지"
                              ></img>
                              <div className="text-[16] mt-[12px] font-PtdExtraBold">
                                별장
                              </div>
                              <div className="flex flex-col justify-center items-center">
                                <p className="text-[16px] font-Ptd">
                                  {
                                    worldMap[metaData.currentLocation].price
                                      .villa
                                  }
                                </p>
                                <p className="text-[8px]">만원</p>
                              </div>
                            </div>
                          )}
                          {/* 호텔 건설 */}
                          {worldMap[metaData.currentLocation].build.hotel && (
                            <div
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px]`}
                            >
                              <img
                                className="w-[26px] h-[26px] object-fit mt-[10px]"
                                src="/game/hotel_gray.png"
                                alt="이미지"
                              ></img>
                              <div className="text-[16] mt-[12px] font-PtdExtraBold text-[#C2C2C2]">
                                호텔
                              </div>
                              <div className="text-[16] mt-[12px] font-Ptd text-[#C2C2C2]">
                                건설완료
                              </div>
                            </div>
                          )}
                          {!worldMap[metaData.currentLocation].build.hotel && (
                            <div
                              onClick={() => {
                                setBuildOption(1);
                                setBuildPrice(
                                  worldMap[metaData.currentLocation].price.hotel
                                );
                              }}
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${buildOption === 1 ? "bg-gray-300" : ""
                                }`}
                            >
                              <img
                                className="w-[22px] h-[22px] object-fit mt-[10px]"
                                src="/game/hotel.png"
                                alt="이미지"
                              ></img>
                              <div className="text-[16px] mt-[12px] font-PtdExtraBold">
                                호텔
                              </div>
                              <div className="flex flex-col justify-center items-center">
                                <p className="text-[16px] font-Ptd">
                                  {
                                    worldMap[metaData.currentLocation].price
                                      .hotel
                                  }
                                </p>
                                <p className="text-[8px]">만원</p>
                              </div>
                            </div>
                          )}
                          {/* 랜드마크 건설*/}
                          {worldMap[metaData.currentLocation].build
                            .landmark && (
                              <div
                                className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px]`}
                              >
                                <img
                                  className="w-[26px] h-[26px] object-fit mt-[10px]"
                                  src="/game/villa_gray.png"
                                  alt="이미지"
                                ></img>
                                <div className="text-[16] mt-[12px] font-PtdExtraBold text-[#C2C2C2]">
                                  랜드마크
                                </div>
                                <div className="text-[16] mt-[12px] font-Ptd text-[#C2C2C2]">
                                  건설완료
                                </div>
                              </div>
                            )}
                          {!worldMap[metaData.currentLocation].build
                            .landmark && (
                              <div
                                onClick={() => {
                                  setBuildOption(2);
                                  setBuildPrice(
                                    worldMap[metaData.currentLocation].price
                                      .landmark
                                  );
                                }}
                                className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${worldMap[metaData.currentLocation].owner ===
                                  metaData.turn + 1
                                  ? ""
                                  : "pointer-events-none"
                                  }  ${buildOption === 2 ? "bg-gray-300" : ""}`}
                              >
                                <img
                                  className="w-[24px] h-[28px] object-fit mt-[10px]"
                                  src={`${worldMap[metaData.currentLocation].owner ===
                                    metaData.turn + 1
                                    ? "/game/landmark.png"
                                    : "/game/landmark_gray.png"
                                    }`}
                                  alt="이미지"
                                ></img>
                                <div
                                  className={`text-[16px] mt-[12px] font-PtdExtraBold ${worldMap[metaData.currentLocation].owner ===
                                    metaData.turn + 1
                                    ? ""
                                    : "text-gray-300"
                                    }`}
                                >
                                  랜드마크
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                  <p
                                    className={`text-[16px] font-Ptd ${worldMap[metaData.currentLocation].owner ===
                                      metaData.turn + 1
                                      ? ""
                                      : "text-gray-300"
                                      }`}
                                  >
                                    {
                                      worldMap[metaData.currentLocation].price
                                        .landmark
                                    }
                                  </p>
                                  <p
                                    className={`text-[8px] ${worldMap[metaData.currentLocation].owner ===
                                      metaData.turn + 1
                                      ? ""
                                      : "text-gray-300"
                                      }`}
                                  >
                                    만원
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                        {/* 총 가격 영역 */}
                        {!(
                          worldMap[metaData.currentLocation].build.villa &&
                          worldMap[metaData.currentLocation].build.hotel &&
                          worldMap[metaData.currentLocation].build.landmark
                        ) && (
                            <div>
                              <div className="w-full h-[40px] flex justify-end items-end">
                                <span className="text-[20px]">
                                  총 가격 :&nbsp;&nbsp;
                                </span>
                                <span className="text-[32px] font-PtdExtraBold">
                                  {buildPrice}&nbsp;
                                </span>
                                <span className="text-[18px]">만원</span>
                              </div>
                              {/* 버튼 영역 */}
                              <div className="w-[330px] h-[52px] flex items-end justify-between">
                                <div
                                  className="w-[154px] h-[46px] bg-blue-400 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-blue-500 hover:cursor-pointer"
                                  onClick={() => {
                                    build(
                                      metaData.turn,
                                      worldMap[metaData.currentLocation],
                                      buildOption
                                    );
                                  }}
                                >
                                  건설하기
                                </div>
                                <div
                                  className="w-[154px] h-[46px] bg-gray-400 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-gray-500 hover:cursor-pointer"
                                  onClick={() => {
                                    setMetaData((prevState: any) => ({
                                      ...prevState,
                                      turnOver: true,
                                    }));
                                    setMode(0);
                                    sendData();
                                  }}
                                >
                                  Skip
                                </div>
                              </div>
                            </div>
                          )}
                        {worldMap[metaData.currentLocation].build.villa &&
                          worldMap[metaData.currentLocation].build.hotel &&
                          worldMap[metaData.currentLocation].build.landmark && (
                            <div>
                              <div className="w-full h-[40px] flex justify-center items-center">
                                이미 모든 건물을 건설하셨습니다.
                              </div>
                              <div className="w-[330px] h-[52px] flex items-end justify-between">
                                <div
                                  className="w-full h-[46px] bg-gray-400 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-gray-500 hover:cursor-pointer"
                                  onClick={() => {
                                    setMetaData((prevState: any) => ({
                                      ...prevState,
                                      turnOver: true,
                                    }));
                                    setMode(0);
                                    sendData();
                                  }}
                                >
                                  확인
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                    {/* 3. 통행료 지불 */}
                    {mode === 3 && (
                      <div className="w-full flex flex-col justify-center itmes-center">
                        <div className="w-full h-[40px] text-[20px] font-PtdBold flex justify-center items-center">
                          통행료를 지불하세요
                        </div>
                        <div className="w-full h-[100px] flex justify-center items-center">
                          {worldMap[metaData.currentLocation].build.land && (
                            <div className="w-[70px] h-[90px] rounded-[8px] bg-gray-200 flex flex-col justify-center items-center mr-[12px] ml-[12px]">
                              <img
                                src="/game/land.png"
                                alt=""
                                className="w-[34px] h-[34px] object-cover"
                              />
                              <div className="mt-[10px]">대지</div>
                            </div>
                          )}
                          {worldMap[metaData.currentLocation].build.villa && (
                            <div className="w-[70px] h-[90px] rounded-[8px] bg-gray-200 flex flex-col justify-center items-center mr-[12px] ml-[12px]">
                              <img
                                src="/game/villa.png"
                                alt=""
                                className="w-[34px] h-[34px] object-cover"
                              />
                              <div className="mt-[10px]">별장</div>
                            </div>
                          )}
                          {worldMap[metaData.currentLocation].build.hotel && (
                            <div className="w-[70px] h-[90px] rounded-[8px] bg-gray-200 flex flex-col justify-center items-center mr-[12px] ml-[12px]">
                              <img
                                src="/game/hotel.png"
                                alt=""
                                className="w-[34px] h-[34px] object-cover"
                              />
                              <div className="mt-[10px]">호텔</div>
                            </div>
                          )}
                          {worldMap[metaData.currentLocation].build
                            .landmark && (
                              <div className="w-[70px] h-[90px] rounded-[8px] bg-gray-200 flex flex-col justify-center items-center mr-[12px] ml-[12px]">
                                <img
                                  src="/game/landmark.png"
                                  alt=""
                                  className="w-[34px] h-[34px] object-cover"
                                />
                                <div className="mt-[10px]">랜드마크</div>
                              </div>
                            )}
                        </div>
                        <div
                          id="shbutton"
                          className="w-full h-[60px] flex justify-center rounded-[6px] items-center text-[16px] mt-[10px]"
                          onClick={() => {
                            console.log("통행료 지불");
                            payToll(
                              metaData.turn,
                              worldMap[metaData.currentLocation]
                            );

                            setMetaData((prevState: any) => ({
                              ...prevState,
                              turnOver: true,
                            }));
                            setMode(0);
                            sendData();
                          }}
                        >
                          통행료 {worldMap[metaData.currentLocation].toll} 만원
                          지불하기
                        </div>
                      </div>
                    )}

                    {/* 4. 보물상자 */}
                    {mode === 4 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center">{metaData.itemMsg1}</p>
                        <p className="text-[24px] mt-[20px] text-center">{metaData.itemMsg2}</p>

                      </div>
                    )}

                    {/* 5. 특수지역*/}
                    {mode === 5 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[24px] text-center w-full h-[120px]">{worldMap[metaData.currentLocation].contents}</p>
                        <div className="w-[330px] h-[52px] flex items-end justify-between">
                          <div
                            className="w-full h-[60px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            확인
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. 자유이동*/}
                    {mode === 6 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[24px] text-center w-full h-[120px]">{worldMap[metaData.currentLocation].contents}</p>
                        <div className="w-[330px] h-[60px] flex items-end justify-between">
                          <div
                            className="w-full h-[60px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              moveDircet(metaData.turn, newLoaction);
                              setSelectMode(false);
                            }}
                          >
                            [{worldMap[newLoaction].name}] 이동하기
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 7. 구매완료*/}
                    {mode === 7 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <div className="text-[24px] font-PtdBold flex justify-center items-center text-center">구매 및 건설 완료</div>
                        <div className="w-[330px] h-[52px] flex items-end justify-between mt-[40px]">
                          <div
                            className="w-full h-[60px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            턴 종료
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 8. 맨 첫 시작*/}
                    {mode === 8 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <div className="text-[24px] font-PtdBold">게임 스타트! 주사위를 던지세요</div>
                      </div>
                    )}
                    {/* 9. city일 떄*/}
                    {mode === 9 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[24px] text-center w-full h-[120px]">{worldMap[metaData.currentLocation].contents}</p>
                        <div className="w-[330px] h-[52px] flex items-end justify-between">
                          <div
                            className="w-full h-[60px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              getMoney(metaData.turn, tmpTax)
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            확인
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 10. 보물상자 자유이동일 떄*/}
                    {mode === 10 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{metaData.itemMsg1}</p>
                        <p className="text-[24px] text-center w-full h-[30px] mt-[20px]">{metaData.itemMsg2}</p>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              moveDircet(metaData.turn, newLoaction);
                            }}
                          >
                            [{worldMap[newLoaction].name}] 이동
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 11. 보물상자 몇칸이동일 떄*/}
                    {mode === 11 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{metaData.itemMsg1}</p>
                        <p className="text-[24px] text-center w-full h-[30px] mt-[20px]">{metaData.itemMsg2}</p>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[60px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              movePlayer(metaData.turn, itemMove);
                              sendData();
                            }}
                          >
                            이동하기
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 12. 보물상자 돈 입금/출금*/}
                    {mode === 12 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{metaData.itemMsg1}</p>
                        <p className="text-[24px] text-center w-full h-[30px] mt-[20px]">{metaData.itemMsg2}</p>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            확인
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 보물상자 국세청 이동 */}
                    {mode === 13 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{metaData.itemMsg1}</p>
                        <p className="text-[24px] text-center w-full h-[30px] mt-[20px]">{metaData.itemMsg2}</p>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              moveDircet(metaData.turn, itemMove);
                            }}
                          >
                            이동하기
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 14  무인도인 경우 */}
                    {mode === 14 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{metaData.itemMsg1}</p>
                        <div className="flex">
                          <span className="text-[24px] text-center w-full h-[30px] mt-[20px]">{metaData.itemMsg2}</span>
                          {tmpCnt > 0 ?
                            <span className="text-[28px] text-PtdBold text-center w-full h-[30px] mt-[20px]">{tmpCnt}</span>
                            : null
                          }
                        </div>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            확인
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 15  국세청 세금 */}
                    {mode === 15 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{worldMap[37].title}</p>
                        <div className="flex">
                          <span className="text-[24px] text-center w-full h-[30px] mt-[20px]">{worldMap[37].contents}</span>
                        </div>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              payTax(metaData.turn);
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            {tmpTax}만원 납부하기
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 16  올림픽 */}
                    {mode === 16 && (
                      <div className="flex flex-col justify-center itmes-center">
                        <p className="text-[30px] font-PtdBold text-center w-full h-[34px]">{worldMap[30].title}</p>
                        <div className="flex">
                          <span className="text-[24px] text-center w-full h-[30px] mt-[20px]">세금으로 쌓인 기금을 수령하세요.</span>
                        </div>
                        <div className="w-[330px] h-[62px] flex items-end justify-between mt-[24px]">
                          <div
                            className="w-full h-[50px] bg-red-500 rounded-[6px] flex justify-center items-center text-white text-[20px] hover:bg-red-600 hover:cursor-pointer"
                            onClick={() => {
                              getMoney(metaData.turn, metaData.fund)
                              setMetaData((prevState: any) => ({
                                ...prevState,
                                turnOver: true,
                                fund: 0,
                              }));
                              setMode(0);
                              sendData();
                            }}
                          >
                            [{metaData.fund} 만원] 수령하기
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div
          className={`w-[20%] h-full flex flex-col justify-start items-start rounded-[4px]`}
        >
          <div
            className={`w-[387px] h-[908px] mb-[20px]  flex flex-col justify-around items-center rounded-[24px]
            ${myTurn && me.playerNum === 1 ? "bg-red-200/40" 
              : myTurn && me.playerNum === 2 ? "bg-green-200/40"
              : myTurn && me.playerNum === 3 ? "bg-blue-200/40" 
                :myTurn && me.playerNum === 4 ? "bg-purple-200/40" : "bg-gray-100/70"
              }
            `}
            >
            <div className="w-[336px] h-[181px] bg-white rounded-[11px] flex flex-col justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="w-[250px] h-[140px]">
                <div className="flex justify-between items-center text-[#C0C0C0]">
                      <div className="text-[12px]">내 정보</div>
                      <div className={`text-[15px] font-PtdBold truncate
                        ${me.playerNum === 1 ? 'text-red-400' : ''}
                        ${me.playerNum === 2 ? 'text-green-400' : ''}
                        ${me.playerNum === 3 ? 'text-blue-400' : ''}
                        ${me.playerNum === 4 ? 'text-purple-400' : ''}`
                        }>{worldMap[me.game.location].name}</div>
                </div>
                <div className="flex items-center justify-between h-[70px] mt-[10px] mb-[10px] border-solid border-[#E9E9E9] border-b-[1px]">
                  <div className="flex items-center">
                    <img src={`${profileImg}`} alt="" className="w-[50px] h-[50px] rounded-full" />
                    <div className="text-[30px] font-PtdBold ml-[6px] w-[120px]">{me.name}</div>
                    {/* <div className="flex items-center justify-end text-[20px] font-PtdBold ml-[6px] w-[80px]">
                      <div>{worldMap[me.game.location].name}</div>
                    </div> */}
                  </div>
                  {rankPlayerData.rankPlayer[0].nickName ?
                    <div
                      className={`w-[50px] h-[28px] text-white text-[16px] rounded-full flex justify-center items-center
                      ${me.playerNum === 1 ? 'bg-red-400' : ''}
                      ${me.playerNum === 2 ? 'bg-green-400' : ''}
                      ${me.playerNum === 3 ? 'bg-blue-400' : ''}
                      ${me.playerNum === 4 ? 'bg-purple-400' : ''}
                      `}
                    >
                      {rankPlayerData.rankPlayer[0].nickName === me.name ? '1위' : ''}
                      {rankPlayerData.rankPlayer[1].nickName === me.name ? '2위' : ''}
                      {rankPlayerData.rankPlayer[2].nickName === me.name ? '3위' : ''}
                      {rankPlayerData.rankPlayer[3].nickName === me.name ? '4위' : ''}
                    </div>

                    : null}
                </div>
                <div className="flex flex-col w-full h-[40px] items-between">
                  <div className="text-[12px] text-[#C0C0C0]">보유자산</div>
                  <div className="flex mt-[10px] justify-between text-[25px] font-PtdBold ">
                    <img src='/game/coin.png' className="h-[35px] mt-[-7px] object-cover"></img> 
                    <div className="ml-[5px]">{priceToString(me.game.balance)}</div>
                    <div className="flex justify-end w-[200px]">
                    <div className="">만원</div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[336px] h-[609px] bg-white rounded-[8px] flex flex-col justify-center items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <div className="w-[260px] h-[570px] justify-center items-center">
                <div className="flex items-center flex-start text-[#C0C0C0]">
                    <div className="text-[12px] mb-[20px]">소유 자산</div>
                </div>
                {me.game.own.map((e: number, index: number) => {
                  return (
                    <div
                      key={index}
                      className="h-[60px] flex flex-col items-center justify-start"
                    >
                      <div className="w-full h-[60px] bg-gray-100 rounded-[6px] flex items-center mb-[10px]">
                        <img
                          className="w-[36px] h-[24px] flex justify-center items-center bg-purple-400 ml-[14px]"
                          src={`/game/f${e}.png`}
                          alt="국기"
                        ></img>
                        <div className="w-[80px] h-[26px] flex justify-start text-[18px] font-PtdBold items-center ml-[10px]">
                          {worldMap[e].name}
                        </div>
                        <div className="w-[100px] h-[30px] flex justify-end items-center mr-[14px]">
                          {worldMap[e].build.villa && (
                            <img
                              className="w-[26px] h-[26px] object-fit ml-[10px]"
                              src="/game/villa.png"
                            ></img>
                          )}
                          {worldMap[e].build.hotel && (
                            <img
                              className="w-[24px] h-[24px] object-fit ml-[10px]"
                              src="/game/hotel.png"
                            ></img>
                          )}
                          {worldMap[e].build.landmark && (
                            <img
                              className="w-[26px] h-[30px] object-fit ml-[10px]"
                              src="/game/landmark.png"
                            ></img>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
              className="w-[387px] h-[60px] rounded-[20px] flex justify-center items-center mb-[20px] text-[#646161] z-[80000] mt-[5px] hover:bg-[#FF4D45] hover:text-white bg-gray-100/70 text-[20px] cursor-pointer"
                            
              onClick={() => {
                Swal.fire({
                  title: '게임을 종료하시겠습니까?',
                  icon: 'warning',
                  iconColor: '#FA5B54',
                  showCancelButton: true,
                  confirmButtonColor: '#FA5B54',
                  cancelButtonColor: '#999999',
                  confirmButtonText: 'YES',
                  cancelButtonText: 'NO',
                }).then((result: any) => {
                  if (result.isConfirmed) {
                // 종료 API 요청
                finishGame();
                  }
                });
              }}
            >
              게임 종료
          </div>
        </div>
      </div>
    </>
  );
}
