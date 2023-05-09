import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
