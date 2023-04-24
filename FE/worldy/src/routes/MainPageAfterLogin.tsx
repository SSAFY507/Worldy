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
import Carousel5 from '../assets/images/Carousel5.png';
import thumb1 from '../assets/images/thumb1.png';
import thumb2 from '../assets/images/thumb2.png';
import thumb3 from '../assets/images/thumb3.png';
import thumb4 from '../assets/images/thumb4.png';
import thumb5 from '../assets/images/thumb5.png';
import LoaderLinear from '../components/LoaderLinear';
import { useNavigate } from 'react-router';

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

export default function MainPageAfterLogin() {
  const [c1Bg, setC1Bg] = useState<HTMLImageElement>(new Image());
  const [loadC1Bg, seetLoadC1Bg] = useState<boolean>(false);
  useEffect(() => {
    c1Bg.src = Carousel1;
    c1Bg.onload = () => {
      setTimeout(() => {
        seetLoadC1Bg(true);
      });
    };
  }, [c1Bg]);

  const [c2Bg, setC2Bg] = useState<HTMLImageElement>(new Image());
  const [loadC2Bg, seetLoadC2Bg] = useState<boolean>(false);
  useEffect(() => {
    c2Bg.src = Carousel2;
    c2Bg.onload = () => {
      setTimeout(() => {
        seetLoadC2Bg(true);
      });
    };
  }, [c2Bg]);

  const [c3Bg, setC3Bg] = useState<HTMLImageElement>(new Image());
  const [loadC3Bg, seetLoadC3Bg] = useState<boolean>(false);
  useEffect(() => {
    c3Bg.src = Carousel3;
    c3Bg.onload = () => {
      setTimeout(() => {
        seetLoadC3Bg(true);
      });
    };
  }, [c3Bg]);

  const [c5Bg, setC5Bg] = useState<HTMLImageElement>(new Image());
  const [loadC5Bg, seetLoadC5Bg] = useState<boolean>(false);
  useEffect(() => {
    c5Bg.src = Carousel5;
    c5Bg.onload = () => {
      setTimeout(() => {
        seetLoadC5Bg(true);
      });
    };
  }, [c5Bg]);

  const [loadedAll, setLoadedAll] = useState<boolean>(false);
  useEffect(() => {
    if (loadC1Bg && loadC2Bg && loadC3Bg && loadC5Bg) {
      setTimeout(() => {
        setLoadedAll(true);
      }, 2000);
    }
  }, [loadC1Bg, loadC2Bg, loadC3Bg, loadC5Bg]);
  console.log(loadC1Bg, loadC2Bg, loadC3Bg, loadC5Bg);

  const [imageList, setImageList] = useState<ImageListType[]>([
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
      // loaded: loadC1Bg,
    },
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

      // loaded: loadC2Bg,
    },
    {
      headerImage: Carousel3Icon,
      headerText: '업데이트 1.7',
      TitleText: '새로운 패치노트를 만나보세요',
      contentText:
        '이번 패치노트에서는 밸런스를 위해 주사위 확률 변경, 아이템 강도 조정, 캐릭터 움직임 모션 변경, 초대하기 기능이 추가되었습니다. 여러분들의 피드백을 담아 사용성 좋은 게임으로 거듭나기 위해 노력하겠습니다.',
      buttonText: '패치노트 확인',
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
        "쥘 베른의 소설 ‘80일간의 세계일주'에서 영감을 받아, 메타버스 속 세상을 탐험해보세요. 세계 방방곡곡에 숨어 있는 기념품들을 모아보세요. 어느새 탐험가가 되어있는 자신을 발견할 수 있어요. 지금 바로 탐험 시작!",
      buttonText: '랭킹 확인하기',
      image: Carousel2,
      textBlack: false,
      thumb: thumb4,

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
    <div className='h-full flex flex-col justify-center items-stretch'>
      <div className='h-full outline outline-black flex flex-row items-center justify-center'>
        <CarouselComponent images={imageList} loaded={loadedAll} />
      </div>
      <div className='flex-1 outline-black'></div>
    </div>
  );
}
