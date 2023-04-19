import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/Nvabar';
import HoonsTestPage from './routes/HoonsTestPage';
import IntroPage from './routes/IntroPage';

const AppLayout = () => {
  //Navbar 분기를 위해 useLocation써서 특정 페이지에는 navBar 주지 않습니다.
  const location = useLocation(); //현재 브라우저의 URL 위치 반환

  //페이지 이동 Route용으로 <Route><Route> => <Routes><Route>로 변경했습니다.
  return (
    <>
      {location.pathname !== '/hoons' && <Navbar />}
      {/* Routes : 여러 컴퍼넌트 중 URL과 일치하는 '첫번째' Route 컴퍼넌트만 렌더링 */}
      <Routes>
        <Route path='/' element={<IntroPage />} />
        <Route path='/hoons' element={<HoonsTestPage />} />
      </Routes>
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
