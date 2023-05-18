import { useEffect, useState } from 'react';

import CustomAxios from '../../API/CustomAxios';
import { ReactComponent as Info } from '../../assets/images/Info.svg';
import { ProblemType } from './CountryPaintDetailModal';
import Swal from 'sweetalert2';

import '../../styles/SweetAlertStyles.css';

interface Props {
  problem: ProblemType;
  GetSolvedFlag: (flag: boolean, sol: boolean) => void;
}

const DOMAIN = process.env.REACT_APP_BASE_URL;

const CountryPaintBefore = ({ problem, GetSolvedFlag }: Props) => {
  const getLoginToken: string | null = sessionStorage.getItem('token');
  const userNickName: string | null = sessionStorage.getItem('nickname');

  const [first, setFirst] = useState<boolean>(false);
  const [second, setSecond] = useState<boolean>(false);
  const [third, setThird] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<boolean[]>([]);

  useEffect(() => {
    if (checkList.length === 0) {
      let tmpList: boolean[] = [];
      for (let i = 0; i < problem.answerPointList!.length; i++) {
        tmpList.push(false);
      }
      setCheckList(tmpList);
    }
  }, [checkList]);

  const clickArea = (input: number) => {
    let tmpList = checkList;
    tmpList[input] = true;
    setCheckList(tmpList);
  };

  const [warn, setWarn] = useState<boolean>(false);

  const [remainTime, setRemainTime] = useState<number>(0);

  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    setRemainTime(600);
  }, []);

  useEffect(() => {
    // if (remainTime === 0) return;
    const timeCount = setInterval(() => {
      if (remainTime > 0) {
        setRemainTime(remainTime - 1);
      } else if (remainTime !== -10) {
        setFailed(true);
        Swal.fire({
          title: failed ? '해설을 확인합니다.' : '시간을 초과했습니다.',
          confirmButtonText: '확인',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'swal2-confirm',
          },
        }).then(function () {
          failed ? GetSolvedFlag(true, false) : handleGiveup();
          // GetSolvedFlag(true, false);
        });
        clearInterval(timeCount);
      }
    }, 100);
    return () => clearInterval(timeCount);
  }, [remainTime]);

  const handleGiveup = () => {
    setRemainTime(-10);
    setFailed(true);
  };

  return (
    <>
      <div className='w-full h-[10px] relative bg-[#cbcbcb] translate-y-[-41px]'>
        <div
          className='h-[10px] absolute right-0 bg-[#bd5bbf] rounded-l-3xl'
          style={{ width: `${remainTime / 6}%` }}
        />
      </div>
      <div className=' h-[372px] w-full flex flex-col justify-center items-center'>
        <div className='absolute h-[10px] bg-gray-300 w-full -top-[45px] left-1/2 -translate-x-1/2'></div>
        <div className='h-[276px] w-[780px] flex flex-row justify-between relative'>
          <div
            className='relative w-[388px] h-[276px]'
            onMouseEnter={() => setWarn(true)}
            onMouseLeave={() => setWarn(false)}
          >
            {warn && (
              <div className='absolute top-0 left-0 h-[276px] w-[388px] bg-[rgba(0,0,0,0.2)] grid place-content-center rounded-2xl z-[30]'>
                <span className='font-PtdBold text-[25px] text-center text-white'>
                  우측에서 선택해주세요.
                </span>
              </div>
            )}
            <img
              className=' absolute top-0 left-0 h-[276px] w-[388px] rounded-2xl bg-gray-500 bg-center cursor-default'
              src={problem.collectImg}
              alt='original'
            />
          </div>
          <div className='relative w-[388px] h-[276px]'>
            <img
              className='absolute top-0 left-0 h-[276px] w-[388px] rounded-2xl bg-gray-500 bg-center cursor-pointer '
              src={problem.quizImg}
              alt='different'
              useMap='#image-map'
            />
            <map
              name='image-map'
              id='image-map'
              className='top-0 left-0 h-[276px] w-[388px] relative bg-[rgba(255,255,255,0.3)]'
            >
              {problem.answerPointList!.map((e, idx) => {
                return (
                  <>
                    <div
                      className='z-20 cursor-pointer'
                      style={{
                        outline: '5px solid rgba(255,0,0,0.7)',
                        width: `${String(Number(e[2]) - Number(e[0]))}px`,
                        height: `${String(Number(e[3]) - Number(e[1]))}px`,
                        position: 'absolute',
                        left: String(Number(e[0])) + 'px',
                        top: String(Number(e[1])) + 'px',
                        borderRadius: '100%',
                        visibility:
                          checkList[idx] || failed ? 'visible' : 'hidden',
                      }}
                    />
                    {!failed && (
                      <area
                        alt='정답 영역'
                        href=''
                        key={idx}
                        shape='rect'
                        coords={`${e[0]}, ${e[1]}, ${e[2]}, ${e[3]}`}
                        style={{ cursor: 'pointer' }}
                        className='z-30 absolute'
                        onClick={(e) => {
                          e.preventDefault();
                          clickArea(idx);
                          let count = 0;
                          checkList.map((e, idx) => {
                            if (e) {
                              count += 1;
                            }
                          });
                          switch (count) {
                            case 1:
                              setFirst(true);
                              break;
                            case 2:
                              setSecond(true);
                              break;
                            case 3:
                              setThird(true);
                              // alert('틀린 그림 맞추기 성공! 😲  (exp: + 20)');
                              Swal.fire({
                                title: '틀린 그림 맞추기에 성공했습니다.',
                                confirmButtonText: '확인',
                                buttonsStyling: false,
                                customClass: {
                                  confirmButton: 'swal2-confirm',
                                },
                              }).then(function () {
                                GetSolvedFlag(true, true);
                                const requestBody = new Map([
                                  ['userNickName', userNickName],
                                ]);
                                const response = CustomAxios({
                                  APIName: 'success',
                                  APIType: 'post',
                                  UrlQuery: DOMAIN + '/quiz/hidden/success',
                                  Body: requestBody,
                                  Token: getLoginToken,
                                });
                                console.log(response);
                              });
                              // GetSolvedFlag(true, true);
                              // const requestBody = new Map([
                              //   ['userNickName', userNickName],
                              // ]);
                              // const response = CustomAxios({
                              //   APIName: 'success',
                              //   APIType: 'post',
                              //   UrlQuery: DOMAIN + '/quiz/hidden/success',
                              //   Body: requestBody,
                              //   Token: getLoginToken,
                              // });
                              // console.log(response);
                              break;
                            default:
                              break;
                          }
                        }}
                      />
                    )}
                  </>
                );
              })}
            </map>
          </div>
        </div>
        <div className=' h-[48px] w-[780px] flex felx-row justify-between py-3'>
          <div className='h-full w-[100px] flex flex-row justify-between'>
            <div
              className={`${
                first ? ' bg-green-400' : 'bg-gray-200'
              } h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}
            >
              1
            </div>
            <div
              className={`${
                second ? 'bg-green-400' : 'bg-gray-200'
              } h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}
            >
              2
            </div>
            <div
              className={`${
                third ? 'bg-green-400' : 'bg-gray-200'
              } h-full w-1/4 text-center font-PtdMedium text-white py-1 rounded`}
            >
              3
            </div>
          </div>
          <div className='h-full w-fit flex flex-row justify-end items-center'>
            <Info />
            <div className='h-full text-center mx-[10px] py-1 text-xs opacity-40 font-PtdMedium'>
              주어진 시간 안에 3개의 틀린 그림을 찾아주세요.
            </div>
          </div>
        </div>
        <div
          className=' h-12 w-[780px] text-[30px]] text-center grid place-content-center font-PtdLight opacity-40 py-3 rounded-xl shadow-lg border-solid border-2 border-gray-200 cursor-pointer
        hover:bg-[#ead3fc] hover:opacity-80'
          onClick={() => {
            // alert('틀린 그림 맞추기 실패! 😢');
            Swal.fire({
              title: !failed ? '문제를 포기합니다.' : '해설을 확인합니다.',
              confirmButtonText: '확인',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'swal2-confirm',
              },
            }).then(function () {
              failed ? GetSolvedFlag(true, false) : handleGiveup();
              // GetSolvedFlag(true, false);
            });
            // GetSolvedFlag(true, false);
          }}
        >
          {failed ? '해설 보기' : '포기하기'}
        </div>
      </div>
    </>
  );
};

export default CountryPaintBefore;
