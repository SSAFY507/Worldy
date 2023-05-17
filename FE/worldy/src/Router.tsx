import './styles/RouterStyle.css';

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import GameInfo from "./routes/GameInfo";
//import Updates from "./routes/Updates";
import { useState, useRef, useEffect } from "react";
import Game from "./routes/Game";
import Payment from "./routes/Payment";
import Create from "./routes/Create";
import PaySuccess from "./routes/PayResult";
import Callback from "./routes/Callback";

import Country from './routes/Country';
import Explore from './routes/Explore';
import HelloPage from './components/Loaders/LoaderHello';
import IntroPage from './routes/IntroPage';
import LoaderHello from './components/Loaders/LoaderHello';
import LoginModal from './components/LoginModal';
import MainPageAfterLogin from './routes/MainPageAfterLogin';
import Monopoly from './routes/Monopoly';
import MyPage from './routes/MyPage';
import Navbar from './components/Nvabar';
import PayResult from './routes/PayResult';
import Socket from './routes/Socket';
import Support from './routes/Support';
import Tutorial from './routes/Tutorial';
import { loginState } from './_store/slices/loginSlice';
import pathBI from './assets/images/MainPageBackground.png';
import { useSelector } from 'react-redux';
import GameResult from './routes/GameResult';
import Matching from './components/create/Matching';

const AppLayout = () => {
  //Navbar 분기를 위해 useLocation써서 특정 페이지에는 navBar 주지 않습니다.
  const location = useLocation(); //현재 브라우저의 URL 위치 반환
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  //네브바에서 무료 플레이 버튼 누르면 모달 토글
  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    console.log(showLoginModal);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  //페이지 이동 Route용으로 <Route><Route> => <Routes><Route>로 변경했습니다.

  // useEffect(() => {
  //   if (login) setImageBackgroundImage(new Image());
  // }, [login]);

  //페이지 이동 Route용으로 <Route><Route> => <Routes><Route>로 변경했습니다.

  //카카오 로그인 눌렀을 때, 첫 로그인이면 Tutorial로, 아니면 Mainpage로
  const [firstLoginState, setFirstLoginState] = useState<boolean>(false);

  const handleFirstLogin = (firstLogin: boolean) => {
    console.log('LoginModal로부터 넘어온 firstLogin', firstLogin);
    if (firstLogin) {
      navigate('/tutorial');
    } else {
      const gameId = sessionStorage.getItem('gameId');

      // 헤더 확인해서 roomId 있으면
      if (gameId) {
        navigate(`/game/${gameId}`);
      } else {
        navigate('/');
      }
    }
    closeLoginModal();
  };


  const endTutorial = () => {

    const gameId = sessionStorage.getItem('gameId');

    // 헤더 확인해서 roomId 있으면
    if (gameId) {
      navigate(`/game/${gameId}`);
    } else {
      navigate('/');
    }
  };

  const exploreUrl = location.pathname.substr(0, 9);
  const monopolyUrl = location.pathname.substr(0, 9);
  const gameUrl = location.pathname.substr(0, 5);


  const [myPageRef, setMyPageRef] = useState<string>('');

  const [qnaModal, setQnaModal] = useState<number>(0);

  const handleQnaModal = (input: number) => {
    setQnaModal(input);
  };

  const checkLoginState = sessionStorage.getItem('isLoggedIn');
  const checkNickname = sessionStorage.getItem('nickname') || '';

  useEffect(() => {
    if (location.pathname !== '/user/kakao/callback')
      if (checkLoginState && (checkNickname === '' || checkNickname === null)) {
        //로그인돼있는데 닉네임 없으면 tutorial
        navigate('/tutorial');
        console.log('닉네임 설정해주세요 (tutorial로 이동)');
      } else if (!checkLoginState) {

        const gameId = sessionStorage.getItem('gameId');

        // 헤더 확인해서 roomId 있으면 
        if (gameId) {
          navigate(`/game/${gameId}`); // 게임 uri로 입장 후 로그인 안돼있으면
        } else {
          navigate('/'); //로그인 안돼있으면 홈으로
        }

        console.log("로그인 해주세요(Home으로 이동)");

      }
  }, []);

  return (
    <div
      className='hide-scrollbar w-screen h-screen flex flex-col overflow-hidden'
      style={{
        backgroundImage: checkLoginState ? undefined : `url(${pathBI})`,
        backgroundSize: '100%',
      }}
    >
      <div className='z-50'>
        {location.pathname !== '/tutorial' &&
          location.pathname !== '/user/kakao/callback' &&
          exploreUrl !== '/payment' &&
          exploreUrl !== '/explore/' &&
          monopolyUrl !== '/monopoly' &&
          gameUrl !== '/game' && <Navbar onLoginClick={handleLoginModal} />}
        {showLoginModal && <LoginModal onClose={closeLoginModal} />}
        {/* Routes : 여러 컴퍼넌트 중 URL과 일치하는 '첫번째' Route 컴퍼넌트만 렌더링 */}
      </div>
      <div className='flex-1 h-full max-h-full'>
        <Routes>
          {checkLoginState ? (
            <Route
              path='/'
              element={
                <MainPageAfterLogin
                  changeMyPageRef={(input: string) => setMyPageRef(input)}
                />
              }
            />
          ) : (
            <Route
              path='/'
              element={<IntroPage onLoginClick={handleLoginModal} />}
            />
          )}
          <Route path='/user/kakao/callback' element={<Callback />} />
          {/* <Route path='/updates' element={<Updates />} /> */}
          <Route path='/explore' element={<Explore />} />
          <Route path='/explore/:country' element={<Country />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/monopoly' element={<Monopoly />} />
          <Route
            path='/support'
            element={<Support qnaModalNumber={qnaModal} />}
          />
          <Route
            path='/mypage'
            element={
              <MyPage setRef={myPageRef} handleQnaModal={handleQnaModal} />
            }
          />
          <Route path="/create" element={<Create />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/game/result" element={<GameResult />} />
          <Route path="/socket" element={<Socket />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path='/create' element={<Create />} />
          <Route path='/ready' element={<Matching />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/:id' element={<Game />} />
          <Route path='/socket' element={<Socket />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/paymentsuccess' element={<PayResult />} />
          {/* <Route
>>>>>>> 539095da14296f795892706a9a49530355d10bbe
            path="/paymentfailure"
            element={<PayResult input={paymentFailureInput} />}
          /> */}
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </div>
    </div>
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