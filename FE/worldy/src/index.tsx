import './assets/tailwind.css';

import { GlobalStyle } from './assets/globalStyle';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import store from './_store/store';
import { useEffect } from 'react';
import { login } from './_store/slices/loginSlice';

const container = document.getElementById('root')!;
const root = createRoot(container);

const KakaoAppKey = '19dbd953fa840cb821c17969d419e263';
const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        //eslint-disable-next-line
        (window as any).Kakao.init(KakaoAppKey);
};

const isLoggedIn = sessionStorage.getItem('isLoggedIn');
const nickname = sessionStorage.getItem('nickname') || '';
const profileImg = sessionStorage.getItem('profileImg');
if (isLoggedIn === 'true' && profileImg) {
  store.dispatch(
    login({
      // nickname,
      profileImg,
    })
  );
}

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
    {/* <RouterProvider router={Router} /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
