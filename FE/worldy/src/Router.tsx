import * as React from 'react';
import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import BackgroundImage from './assets/images/MainPageBackground.png';

import Navbar from './components/Nvabar';
import HoonsTestPage from './routes/HoonsTestPage';
import IntroPage from './routes/IntroPage';
import LoginModal from './components/LoginModal';
import LoginModalBackground from './components/LoginModalBackground';
import LoaderPyramid from './components/LoaderPyramid';

const AppLayout = () => {
  //Navbar 분기를 위해 useLocation써서 특정 페이지에는 navBar 주지 않습니다.
  const location = useLocation(); //현재 브라우저의 URL 위치 반환

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  //네브바에서 무료 플레이 버튼 누르면 모달 토글
  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    console.log(showLoginModal);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const [loadedBackgroundImage, setLoadedBackgroundImage] =
    useState<boolean>(false);

  const imageBackgroundImage = new Image();
  useEffect(() => {
    imageBackgroundImage.src = BackgroundImage;
    imageBackgroundImage.onload = () => {
      setTimeout(() => {
        setLoadedBackgroundImage(true);
      }, 1000);
    };
  }, [BackgroundImage]);

  //페이지 이동 Route용으로 <Route><Route> => <Routes><Route>로 변경했습니다.
  return (
    <>
      {loadedBackgroundImage ? (
        <div
          className='w-screen h-screen flex flex-col'
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: '100%',
          }}
        >
          <div className='z-10'>
            {location.pathname !== '/hoons' && (
              <Navbar onLoginClick={handleLoginModal} />
            )}
            {showLoginModal && <LoginModal onClose={closeLoginModal} />}
            {/* Routes : 여러 컴퍼넌트 중 URL과 일치하는 '첫번째' Route 컴퍼넌트만 렌더링 */}
          </div>
          <div className='flex-1 h-full'>
            <Routes>
              <Route
                path='/'
                element={<IntroPage onLoginClick={handleLoginModal} />}
              />
              <Route path='/hoons' element={<HoonsTestPage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className='h-screen w-screen'>
          <LoaderPyramid text='탐험가 모실 준비 중...' />
        </div>
      )}
    </>
  );
};

//마지막으로 useLocation을 BrowserRouter에 넣기 위해 Router와 AppLayout을 구분해줍니다.
const Router = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default Router;
