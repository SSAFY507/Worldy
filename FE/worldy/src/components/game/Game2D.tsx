import React, { useEffect, useState } from "react";
import "./dice.css";
import Dice from "./Dice";

export default function Game2D(props: any) {
  const sendData = props.sendData;

  const player = props.player;
  const setPlayer = props.setPlayer;

  const metaData = props.metaData;
  const setMetaData = props.setMetaData;

  const worldMap = props.worldMap;
  const setWorldMap = props.setWorldMap;

  const loginUser = props.loginUser;
  const [myTurn, setMyTurn] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [buyOption, setBuyOption] = useState<number>(0);
  const [buildOption, setBuildOption] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [buildPrice, setBuildPrice] = useState<number>(0);

  let pList: Player[] = [];
  let me: any = {};

  if (loginUser !== player.p1.playerId) {
    pList.push(player.p1);
  } else {
    me = player.p1;
  }
  if (loginUser !== player.p2.playerId) {
    pList.push(player.p2);
  } else {
    me = player.p2;
  }
  if (loginUser !== player.p3.playerId) {
    pList.push(player.p3);
  } else {
    me = player.p3;
  }
  if (loginUser !== player.p4.playerId) {
    pList.push(player.p4);
  } else {
    me = player.p4;
  }

  useEffect(() => {
    if (metaData.turnOver && !metaData.isDouble) {
      // 턴이 true이고, 더블이  false;
      setMetaData((prevState: any) => ({
        ...prevState,
        turn: (prevState.turn + 1) % 4,
        turnOver: false,
      }));
    } else if (metaData.turnOver && metaData.isDouble) {
      setMetaData((prevState: any) => ({
        ...prevState,
        turnOver: false,
      }));
    }
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

  // 주사위 던지는 함수
  const rollDice = () => {
    console.log("주사위 함수 실행");
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
      isDouble: true,
    }));
    showDice(dice1, dice2);
  };

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
      isDouble: isDouble,
    }));
    showDice(dice1, dice2);

    // 이동위치 반환 함수
    const newLocation = move(p, dice);

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
      console.log("nation >>");
      // 1) 주인 없음
      if (spot.owner === 0) {
        console.log("no owner>>>");
        setMode(1);
        setBuyOption(0);
      } else if (spot.owner === p.playerNum) {
        console.log("내 사유지다");
        setMode(2);
        setBuyOption(0);
      } else if (spot.owner !== p.playerNum) {
        console.log("통행료 지불");
        setMode(3);
      }
      // 보물상자
    } else if (spot.type === "item") {
      setMode(4);

      // 특수지역일 때
    } else if (spot.type !== "nation") {
      setMode(5);
      // 이동하는 특수지역일 때
    } else {
      setMode(6);
    }
  }

  // 이동하기 함수
  function move(p: Player, dice: number) {
    let result = p.game.location + dice;
    if (result >= 40) {
      console.log(p.playerNum + "님 완주");
      console.log("한바퀴 완주 월급 + 50만원");
      result = result % 40;
      if (p.playerNum === 1) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p1: {
            ...prevState.p1,
            game: {
              ...prevState.p1.game,
              balance: prevState.p1.game.balance + 50,
            },
          },
        }));
      } else if (p.playerNum === 2) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p2: {
            ...prevState.p2,
            game: {
              ...prevState.p2.game,
              balance: prevState.p2.game.balance + 50,
            },
          },
        }));
      } else if (p.playerNum === 3) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p3: {
            ...prevState.p3,
            game: {
              ...prevState.p3.game,
              balance: prevState.p3.game.balance + 50,
            },
          },
        }));
      } else if (p.playerNum === 4) {
        setPlayer((prevState: any) => ({
          ...prevState,
          p4: {
            ...prevState.p4,
            game: {
              ...prevState.p4.game,
              balance: prevState.p4.game.balance + 50,
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

  // 구매하기
  function buy(turn: number, spot: Spot, buyOption: number) {
    // 잔액이 있는지 확인
    if (turn === 0) {
      if (player.p1.game.balance - totalPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 1) {
      if (player.p2.game.balance - totalPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 2) {
      if (player.p3.game.balance - totalPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 3) {
      if (player.p4.game.balance - totalPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
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

  // 건설하기
  function build(turn: number, spot: Spot, buildOption: number) {
    // 잔액이 있는지 확인
    if (turn === 0) {
      if (player.p1.game.balance - buildPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 1) {
      if (player.p2.game.balance - buildPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 2) {
      if (player.p3.game.balance - buildPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
      }
    } else if (turn === 3) {
      if (player.p4.game.balance - buildPrice < 0) {
        alert("잔액이 부족합니다.");
        return;
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

  return (
    <>
      <div className="w-full h-full bg-[#FFFDF4] flex justify-center items-center">
        {/* 왼쪽영역 */}
        <div className="w-[20%] h-full flex flex-col justify-center items-end">
          {/* 메타 데이터 영역 */}
          <div className="mt-[30px] mb-[30px] w-[300px] h-[180px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200 text-[20px]">
            <div>현재 턴 : {metaData.turn + 1}</div>
            <div>턴 오버 : {metaData.turnOver ? "true" : "false"}</div>
            <div>더 블 : {metaData.isDouble ? "더블" : "더블아님"}</div>
            <div>현재위치 : {metaData.currentLocation}</div>
            <div>
              주사위 : [{metaData.dice1}, {metaData.dice2}]
            </div>
          </div>
          <div className="w-[320px] h-[840px] mb-[50px]  flex flex-col justify-around items-center">
            {pList.map((i, index) => {
              return (
                <div key={index}>
                  {i.playerNum === metaData.turn + 1 && (
                    <div
                      className={`w-[80px] h-[30px] bg-blue-400 relative left-[-6px] top-[0px] z-[100] text-white text-[12px] border-[10px] border-solid border-blue-400 rounded-[2px] flex justify-center items-center`}
                    >
                      Player {i.playerNum} 턴
                    </div>
                  )}
                  <div
                    className={`w-[300px] h-[260px] bg-[#F4F2EC] rounded-[8px] flex flex-col justify-center items-center ${
                      metaData.turn + 1 === i.playerNum
                        ? "outline outline-[6px] outline-blue-400"
                        : ""
                    }`}
                  >
                    <div className="w-[250px] h-[210px] bg-[#F4F2EC]">
                      <div className="flex justify-between">
                        <div className="">플레이어[{i.playerNum}]</div>
                        <div className="">현재 위치</div>
                      </div>
                      <div className="flex justify-between h-[34px] mt-[10px] mb-[10px] border-solid border-gray-400 border-b-[1px]">
                        <div className="text-[22px]">{i.name}</div>
                        <div className="text-[22px]">
                          [{worldMap[i.game.location].name}]
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-[60px] items-between">
                        <div className="">보유자산</div>
                        <div className="flex mt-[10px]">
                          <div className="text-[20px]">
                            {i.game.balance} 만원
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full h-[140px] items-between">
                        <div className="">
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
          <div className="w-[1010px] h-[1010px] bg-[#F4F2EC] rounded-[20px] mb-[50px] flex justify-center items-center relative left-[180px]">
            <div className="w-[990px] h-[990px] bg-green-100 rounded-[14px] flex justify-center items-center">
              {/* 0~ 10 */}
              <div className="w-[990px] h-[90px] rounded-[10px] z-[1] flex relative top-[-450px] left-[496px]">
                {worldMap.map((i: Spot, index: number) => {
                  return (
                    <div key={index}>
                      {i.type === "nation" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-red-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${
                                i.owner === 0 && "bg-white"
                              } ${i.owner === 1 && "bg-red-100"} ${
                                i.owner === 2 && "bg-green-100"
                              } ${i.owner === 3 && "bg-blue-100"} ${
                                i.owner === 4 && "bg-purple-100"
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
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "start" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500">
                            <div className="w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]">
                              <img
                                src="/game/f0.png"
                                className="w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 0 &&
                        i.location < 10 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-yellow-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
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
                    <div key={index}>
                      {i.type === "nation" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-green-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${
                                i.owner === 0 && "bg-white"
                              } ${i.owner === 1 && "bg-red-100"} ${
                                i.owner === 2 && "bg-green-100"
                              } ${i.owner === 3 && "bg-blue-100"} ${
                                i.owner === 4 && "bg-purple-100"
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
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "desert" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500">
                            <div className="w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]">
                              <img
                                src="/game/f10.png"
                                className="w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 10 &&
                        i.location < 20 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-yellow-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
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
                    <div key={index}>
                      {i.type === "nation" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${
                                i.owner === 0 && "bg-white"
                              } ${i.owner === 1 && "bg-red-100"} ${
                                i.owner === 2 && "bg-green-100"
                              } ${i.owner === 3 && "bg-blue-100"} ${
                                i.owner === 4 && "bg-purple-100"
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
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "port" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500">
                            <div className="w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]">
                              <img
                                src="/game/f20.png"
                                className="w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 20 &&
                        i.location < 30 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-yellow-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
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
                    <div key={index}>
                      {i.type === "nation" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-purple-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div
                              className={`w-[84px] h-[54px] rounded-[2px] flex justify-around items-between flex-wrap ${
                                i.owner === 0 && "bg-white"
                              } ${i.owner === 1 && "bg-red-100"} ${
                                i.owner === 2 && "bg-green-100"
                              } ${i.owner === 3 && "bg-blue-100"} ${
                                i.owner === 4 && "bg-purple-100"
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
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "city" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-gray-200">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "olympic" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500">
                            <div className="w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]">
                              <img
                                src="/game/f30.png"
                                className="w-[82px] h-[82px] object-fill absolute z-[1] blur-[2px]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "tax" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-blue-500">
                            <div className="w-[82px] h-[82px] rounded-[2px] flex justify-around items-center flex-wrap text-[10px]">
                              <img
                                src="/game/f37.png"
                                className="w-[82px] h-[82px] object-cover absolute z-[1] blur-[2px]"
                              ></img>
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px] z-[10]">
                                  {player.p4.name}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      {i.type === "item" &&
                        i.location >= 30 &&
                        i.location < 40 && (
                          <div className="w-[90px] h-[90px] rounded-[4px] flex flex-col justify-center items-center bg-yellow-400">
                            <div className="w-[90px] h-[30px] rounded-[2px] flex justify-center items-center text-white font-PtdExtraBold ">
                              {i.name}
                            </div>
                            <div className="w-[84px] h-[54px] rounded-[2px] flex justify-center items-center bg-white">
                              {i.location === player.p1.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-red-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p1.name}
                                </div>
                              )}
                              {i.location === player.p2.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-green-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p2.name}
                                </div>
                              )}
                              {i.location === player.p3.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-blue-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p3.name}
                                </div>
                              )}
                              {i.location === player.p4.game.location && (
                                <div className="w-[30px] h-[16px] rounded-[8px] bg-purple-500 flex justify-center items-center text-white text-[10px]">
                                  {player.p4.name}
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
            <div className="w-[380px] h-[280px] rounded-[8px] bg-white shadow-lg">
              {/* 주사위 영역 */}
              <Dice></Dice>
              <div
                className={`w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] ${
                  myTurn
                    ? "bg-red-500 hover:cursor-pointer hover:bg-red-600"
                    : "bg-gray-300 pointer-events-none"
                }`}
                onClick={() => {
                  playerTurn(metaData.turn);
                }}
              >
                주사위 던지기
              </div>

              <div
                id="shbutton"
                className="w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute top-[290px]"
                onClick={() => {
                  playerTurn(metaData.turn);
                }}
              >
                다른 사람 주사위
              </div>

              <div
                id="shbutton"
                className="w-[380px] h-[60px] rounded-[4px] flex justify-center items-center text-white text-[20px] absolute top-[360px]"
                onClick={() => {
                  setMetaData((prevState: any) => ({
                    ...prevState,
                    turnOver: true,
                  }));
                  setMode(0);
                  console.log();
                  sendData();
                }}
              >
                턴 종료
              </div>

              {/* 콘솔창 영역 */}
              <div
                className={`w-[380px] h-[340px] bg-white rounded-[8px] mt-[150px] shadow-lg relative flex justify-center items-center ${
                  myTurn ? "outline outline-[6px] outline-blue-400" : ""
                }`}
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
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-yellow-400 rounded-[4px] absolute right-[30px] text-white text-[12px]">
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
                            {player.p1.name} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 2 &&
                        worldMap[metaData.currentLocation].type ===
                          "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-green-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p2.name} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 3 &&
                        worldMap[metaData.currentLocation].type ===
                          "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-blue-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p3.name} 소유
                          </div>
                        )}
                      {worldMap[metaData.currentLocation].owner === 4 &&
                        worldMap[metaData.currentLocation].type ===
                          "nation" && (
                          <div className="flex w-[64px] h-[28px] justify-center items-center bg-purple-500 rounded-[4px] absolute right-[30px] text-white text-[12px]">
                            {player.p4.name} 소유
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="w-full h-[220px] mt-[6px] flex justify-center items-center">
                    {/* mode에 따라 갈아끼울 영역 */}
                    {/* 1. 국가일 때 */}
                    {mode === 0 && (
                      <div className="text-[30px] font-PtdExtraBold">
                        플레이어 턴 종료
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
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                              buyOption === 0 ? "bg-gray-300" : ""
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
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                              buyOption === 1 ? "bg-gray-300" : ""
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
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                              buyOption === 2 ? "bg-gray-300" : ""
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
                            className={`w-[70px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                              worldMap[metaData.currentLocation].owner ===
                              metaData.turn + 1
                                ? ""
                                : "pointer-events-none"
                            }  ${buyOption === 3 ? "bg-gray-300" : ""}`}
                          >
                            <img
                              className="w-[24px] h-[28px] object-fit mt-[10px]"
                              src={`${
                                worldMap[metaData.currentLocation].owner ===
                                metaData.turn + 1
                                  ? "/game/landmark.png"
                                  : "/game/landmark_gray.png"
                              }`}
                              alt="이미지"
                            ></img>
                            <div
                              className={`text-[16px] mt-[12px] font-PtdExtraBold ${
                                worldMap[metaData.currentLocation].owner ===
                                metaData.turn + 1
                                  ? ""
                                  : "text-gray-300"
                              }`}
                            >
                              랜드마크
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <p
                                className={`text-[16px] font-Ptd ${
                                  worldMap[metaData.currentLocation].owner ===
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
                                className={`text-[8px] ${
                                  worldMap[metaData.currentLocation].owner ===
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
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                                buildOption === 0 ? "bg-gray-300" : ""
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
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                                buildOption === 1 ? "bg-gray-300" : ""
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
                              className={`w-[94px] h-[110px] bg-gray-100 flex flex-col justify-center items-center rounded-[8px] hover:bg-gray-200 hover:cursor-pointer ${
                                worldMap[metaData.currentLocation].owner ===
                                metaData.turn + 1
                                  ? ""
                                  : "pointer-events-none"
                              }  ${buildOption === 2 ? "bg-gray-300" : ""}`}
                            >
                              <img
                                className="w-[24px] h-[28px] object-fit mt-[10px]"
                                src={`${
                                  worldMap[metaData.currentLocation].owner ===
                                  metaData.turn + 1
                                    ? "/game/landmark.png"
                                    : "/game/landmark_gray.png"
                                }`}
                                alt="이미지"
                              ></img>
                              <div
                                className={`text-[16px] mt-[12px] font-PtdExtraBold ${
                                  worldMap[metaData.currentLocation].owner ===
                                  metaData.turn + 1
                                    ? ""
                                    : "text-gray-300"
                                }`}
                              >
                                랜드마크
                              </div>
                              <div className="flex flex-col justify-center items-center">
                                <p
                                  className={`text-[16px] font-Ptd ${
                                    worldMap[metaData.currentLocation].owner ===
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
                                  className={`text-[8px] ${
                                    worldMap[metaData.currentLocation].owner ===
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
                            <div className="w-[70px] h-[90px] bg-blue-200 flex flex-col justify-center items-center">
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
                        보물상자입니다.
                      </div>
                    )}

                    {/* 5. 특수지역*/}
                    {mode === 5 && (
                      <div className="flex flex-col justify-center itmes-center">
                        특수지역입니다.
                      </div>
                    )}

                    {/* 6. 자유이동*/}
                    {mode === 6 && (
                      <div className="flex flex-col justify-center itmes-center">
                        이동하고싶은 지역을 클릭하세요.
                      </div>
                    )}
                    {/* 7. 구매완료*/}
                    {mode === 7 && (
                      <div className="flex flex-col justify-center itmes-center">
                        구매 및 건설 완료.
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
          className={`w-[20%] h-full flex flex-col justify-center items-start rounded-[4px]`}
        >
          {myTurn && (
            <div
              className={`w-[80px] h-[30px] bg-blue-400 relative left-[-4px] top-[0px] z-[100] text-white text-[12px] rounded-[4px] flex justify-center items-center`}
            >
              Player 턴
            </div>
          )}
          <div
            className={`w-[320px] h-[900px] mb-[50px]  flex flex-col justify-around items-center bg-gray-100 rounded-[8px]  ${
              myTurn ? "outline outline-[6px] outline-blue-400" : ""
            }`}
          >
            <div className="w-[300px] h-[180px] bg-white rounded-[8px] flex flex-col justify-center items-center">
              <div className="w-[250px] h-[130px]">
                <div className="flex justify-between">
                  <div className="">플레이어 [{me.playerNum}]</div>
                  <div className="">현재 위치</div>
                </div>
                <div className="flex justify-between h-[34px] mt-[10px] mb-[10px] border-solid border-gray-400 border-b-[1px]">
                  <div className="text-[22px]">{me.name}</div>
                  <div className="text-[22px]">
                    [{worldMap[me.game.location].name}]
                  </div>
                </div>
                <div className="flex flex-col w-full h-[40px] items-between">
                  <div className="">보유자산</div>
                  <div className="flex mt-[10px]">
                    <div className="text-[20px]">{me.game.balance} 만원</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[680px] bg-white rounded-[8px] flex flex-col justify-center items-center">
              <div className="w-[260px] h-[640px]">
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
        </div>
      </div>
    </>
  );
}
