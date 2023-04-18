import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import IntroPage from './routes/IntroPage';
import HoonsTestPage from './routes/HoonsTestPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<IntroPage />} />
      <Route path='/hoons' element={<HoonsTestPage />} />
    </Route>
  )
);

export default router;
