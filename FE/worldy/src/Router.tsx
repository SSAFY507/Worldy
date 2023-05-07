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
import Support from './routes/Support';
import Tutorial from './routes/Tutorial';
import Updates from './routes/Updates';
import pathBI from './assets/images/MainPageBackground.png';
import { useState } from 'react';

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

  const [login, setLogin] = useState<boolean>(false);

  const handleLoginAdmin = () => {
    setLogin(!login);
  };

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
      navigate('/');
    }
    closeLoginModal();
  };

  const handleNavigate = (path: string, login: boolean) => {
    if (path === '/') {
      setLogin(login);
    }
    navigate(path);
  };

  const exploreUrl = location.pathname.substr(0, 8);
  const monopolyUrl = location.pathname.substr(0, 9);

  return (
    <div
      className='hide-scrollbar w-screen h-screen flex flex-col bg-white overflow-hidden'
      style={{
        backgroundImage: login ? undefined : `url(${pathBI})`,
        backgroundSize: '100%',
      }}
    >
      <div className='z-10'>
        {exploreUrl !== '/explore' &&
          monopolyUrl !== '/monopoly' && (
            <Navbar
              onLoginClick={handleLoginModal}
              onLoginAdmin={handleLoginAdmin}
            />
          )}
        {showLoginModal && (
          <LoginModal
            onClose={closeLoginModal}
            onClickKakaoLogin={handleFirstLogin}
          />
        )}
        {/* Routes : 여러 컴퍼넌트 중 URL과 일치하는 '첫번째' Route 컴퍼넌트만 렌더링 */}
      </div>
      <div className='flex-1 h-full max-h-full'>
        <Routes>
          {login ? (
            <Route path='/' element={<MainPageAfterLogin />} />
          ) : (
            <Route
              path='/'
              element={<IntroPage onLoginClick={handleLoginModal} />}
            />
          )}
          <Route path='/gameinfo' element={<GameInfo />} />
          <Route path='/updates' element={<Updates />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/explore/:country' element={<Country />} />
          <Route path='/monopoly' element={<Monopoly />} />
          <Route path='/support' element={<Support />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route
            path='/tutorial'
            element={
              <Tutorial onClickEndTutorial={() => handleNavigate('/', true)} />
            }
          />
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
