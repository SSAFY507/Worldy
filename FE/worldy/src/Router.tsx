import './styles/RouterStyle.css';

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Country from './routes/Country';
import Explore from './routes/Explore';
import GameInfo from './routes/GameInfo';
import IntroPage from './routes/IntroPage';
import LoginModal from './components/LoginModal';
import MainPageAfterLogin from './routes/MainPageAfterLogin';
import Monopoly from './routes/Monopoly';
import MyPage from './routes/MyPage';
import Navbar from './components/Nvabar';
import Socket from './routes/Socket';
import Support from './routes/Support';
import pathBI from './assets/images/MainPageBackground.png';
import Tutorial from './routes/Tutorial';
import { useState, useRef, useEffect } from 'react';
import Game from './routes/Game';
import Payment from './routes/Payment';
import Create from './routes/Create';
// import Updates from './routes/Updates';
import PaySuccess from './routes/PayResult';
import { loginState } from './_store/slices/loginSlice';
import { useSelector } from 'react-redux';
import PayResult from './routes/PayResult';
import Callback from './routes/Callback';

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

  const exploreUrl = location.pathname.substr(0, 8);
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
        navigate('/'); //로그인 안돼있으면 홈으로
        console.log('로그인 해주세요(Home으로 이동)');
      }
  }, []);

  type PayResultStringType = {
    result: string;
    content: JSX.Element;
    buttontext: string;
  };

  const paymentSuccessInput: PayResultStringType = {
    result: '결제 성공',
    content: (
      <div>
        결제가 성공적으로 처리되었습니다.
        <br />
        기부에 대한 감사를 전합니다!
        <br />
        당신의 소중한 행동이 많은 변화를 만들어낼 것입니다.
        <br />
        함께 더 나은 세상을 만들어나가는 데 기여해주셔서 감사합니다.
      </div>
    ),
    buttontext: '홈으로',
  };
  const paymentFailureInput: PayResultStringType = {
    result: '결제 실패',
    content: (
      <div>
        결제 및 기부가 정상적으로 처리되지 않았습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </div>
    ),
    buttontext: '돌아가기',
  };

  return (
    <div
      className='hide-scrollbar w-screen h-screen flex flex-col bg-white overflow-hidden'
      style={{
        backgroundImage: checkLoginState ? undefined : `url(${pathBI})`,
        backgroundSize: '100%',
      }}
    >
      <div className='z-50'>
        {location.pathname !== '/tutori' &&
          location.pathname !== '/user/kakao/callback' &&
          exploreUrl !== '/payment' &&
          exploreUrl !== '/explore' &&
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
          <Route path='/info' element={<GameInfo />} />
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
          <Route path='/create' element={<Create />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/:id' element={<Game />} />
          <Route path='/socket' element={<Socket />} />
          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/paymentsuccess' element={<PayResult />} />
          {/* <Route
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
