import './assets/tailwind.css';

import { GlobalStyle } from './assets/globalStyle';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { store } from './_store/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

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
