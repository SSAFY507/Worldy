import * as React from 'react';
import { useState, useEffect } from 'react';
import Logowhite from '../assets/images/Logo-white.png';

import CarouselComponent from '../components/CarouselComponent';
import Carousel1Icon from '../assets/images/Carousel1Icon.png';
import Carousel2Icon from '../assets/images/Carousel2Icon.png';
import Carousel3Icon from '../assets/images/Carousel3Icon.png';
import Carousel4Icon from '../assets/images/Carousel4Icon.png';
import Carousel5Icon from '../assets/images/Carousel5Icon.png';
import Carousel1 from '../assets/images/Carousel1.png';
import Carousel2 from '../assets/images/Carousel2.png';
import Carousel3 from '../assets/images/Carousel3.png';
import Carousel4 from '../assets/images/Carousel4.png';
import Carousel5 from '../assets/images/Carousel5.png';
import thumb1 from '../assets/images/thumb1.png';
import thumb2 from '../assets/images/thumb2.png';
import thumb3 from '../assets/images/thumb3.png';
import thumb4 from '../assets/images/thumb4.png';
import thumb5 from '../assets/images/thumb5.png';
import LoaderLinear from '../components/LoaderLinear';
import { useNavigate } from 'react-router';
import useLoadImagesHook from '../_hooks/useLoadImagesHook';

type ImageListType = {
  headerImage: string;
  headerText: string;
  TitleText: string;
  contentText: string;
  buttonText: string;
  image: string;
  textBlack: boolean;
  thumb: string;
  buttonClick?: () => void;
  // loaded: boolean;
};

export default function MainPageAfterLogin({
  changeMyPageRef,
}: {
  changeMyPageRef: (value: string) => void;
}) {
  const myImageList = {
    Carousel1Icon: Carousel1Icon,
    Carousel2Icon: Carousel2Icon,
    Carousel3Icon: Carousel3Icon,
    Carousel4Icon: Carousel4Icon,
    Carousel5Icon: Carousel5Icon,
    Carousel1: Carousel1,
    Carousel2: Carousel2,
    Carousel3: Carousel3,
    Carousel4: Carousel4,
    Carousel5: Carousel5,
    thumb1: thumb1,
    thumb2: thumb2,
    thumb3: thumb3,
    thumb4: thumb4,
    thumb5: thumb5,
  };

  const checkLoginState = sessionStorage.getItem('isLoggedIn');
  const checkNickname = sessionStorage.getItem('nickname') || '';

  useEffect(() => {
    if (checkLoginState && (checkNickname === '' || checkNickname === null))
      navigate('/tutorial');
  }, []);

  const { loadedImages, isLoaded } = useLoadImagesHook(myImageList);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 1000);
    }
  }, [isLoaded]);

  const navigate = useNavigate();

  const moveToWDPL = () => {
    navigate('/monopoly');
  };

  const moveToWDADV = () => {
    navigate('/explore');
  };

  const moveToRank = () => {
    changeMyPageRef('랭킹');
    navigate('/mypage');
  };

  const [imageList, setImageList] = useState<ImageListType[]>([
    {
      headerImage: Carousel2Icon,
      headerText: '월디 어드벤쳐',
      TitleText: '80일간의 세계일주, 8분만에',
      contentText:
        "쥘 베른의 소설 ‘80일간의 세계일주'에서 영감을 받아, 메타버스 속 세상을 탐험해보세요. 세계 방방곡곡에 숨어 있는 기념품들을 모아보세요. 어느새 탐험가가 되어있는 자신을 발견할 수 있어요. 지금 바로 탐험 시작!",
      buttonText: '탐험 시작',
      image: Carousel2,
      textBlack: false,
      thumb: thumb2,
      buttonClick: () => moveToWDADV(),
      // loaded: loadC2Bg,
    },
    {
      headerImage: Carousel1Icon,
      headerText: '월디폴리',
      TitleText: '게임으로 경험하는 새로운 세계',
      contentText:
        '세상은 넓고 알아야 할 것들은 많습니다. 친구들과 함께 세계를 모험 하면서 당신만의 도시를 건설해보세요. 모노폴리 형식으로 진행되는 게임은 4명의 친구들과 함께 플레이 할 수 있습니다.',
      buttonText: '게임 시작',
      image: Carousel1,
      textBlack: true,
      thumb: thumb1,
      buttonClick: () => moveToWDPL(),
      // loaded: loadC1Bg,
    },
    {
      headerImage: Carousel3Icon,
      headerText: '업데이트 1.0.1',
      TitleText: '새로운 패치노트를 만나보세요',
      contentText:
        '이번 패치노트에서는 밸런스를 위해 주사위 확률 변경, 아이템 강도 조정이 추가되었습니다. 여러분들의 피드백을 담아 좋은 게임으로 거듭나기 위해 노력하겠습니다.',
      buttonText: '',
      image: Carousel3,
      textBlack: true,
      thumb: thumb3,

      // loaded: loadC3Bg,
    },
    {
      headerImage: Carousel4Icon,
      headerText: '명예의 전당',
      TitleText: '최고의 플레이어들, 랭킹',
      contentText:
        '전국 모든 플레이어들과 함께하는 멋진 게임에서 랭킹 1위를 차지해보세요. 다양한 퀴즈들과 함께 즐길 수 있으며, 업데이트되는 랭킹에서 다른 게이머들과 경쟁할 수 있습니다. 지금 바로 참여하여 명성을 떨치는 게이머가 되어보세요',
      buttonText: '랭킹 확인하기',
      image: Carousel4,
      textBlack: false,
      thumb: thumb4,
      buttonClick: () => moveToRank(),
      // loaded: loadC2Bg,
    },
    {
      headerImage: Carousel5Icon,
      headerText: '지금 이 시각, 세계는',
      TitleText: '튀르키예-시리아 규모 7.8 지진',
      contentText:
        '지금 튀르키예-시리아는 도움의 손길이 절실합니다. 사상 최악의 대지진으로 삶의 터전이 한순간에 무너졌습니다. 지금 이시간에도 생명의 위협을 받고있는 튀르키예-시리아를 도와주세요. 재난구호 현장에 가장 필요한 도움을 전달합니다.',
      buttonText: '기부하기',
      image: Carousel5,
      textBlack: false,
      thumb: thumb5,
      // loaded: loadC5Bg,
    },
  ]);
  return (
    <div className='w-full h-full relative flex flex-col justify-center items-stretch bg-[#fafaf5]'>
      <div className='h-full outline-black flex flex-row items-center justify-center z-30'>
        <CarouselComponent images={imageList} loaded={loadedAll} />
      </div>
    </div>
  );
}
