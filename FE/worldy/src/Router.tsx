import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import BinsTestPage from './routes/BinsTestPage';
import HoonsTestPage from './routes/HoonsTestPage';
import IntroPage from './routes/IntroPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<IntroPage />} />
      <Route path='/hoons' element={<HoonsTestPage />} />
      <Route path='/bins' element={<BinsTestPage />} />
    </Route>
  )
);

export default router;
