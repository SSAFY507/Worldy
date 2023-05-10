import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { addToken, loginState } from '../_store/slices/loginSlice';
import { login } from '../_store/slices/loginSlice';

import LoaderPyramid from '../components/Loaders/LoaderPyramid';

export default function Callback(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const urlToken = searchParams.get('code');

  const [accessToken, setAccessToken] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const kakaoLogin = async () => {
    // console.log(urlToken);
    try {
      const kakaoLoginResponse = await axios.get(
        `https://k8a507.p.ssafy.io/api/user/kakao/login?code=${urlToken}`
      );
      // console.log('kakaologinresponse', kakaoLoginResponse);
      // console.log(
      //   '토큰토큰토큰kakaoLoginResponse.data.tokenDto.accessToken',
      //   kakaoLoginResponse.data.tokenDto.accessToken
      // );
      setAccessToken(kakaoLoginResponse.data.tokenDto.accessToken);
      setProfileImg(kakaoLoginResponse.data.profileImg);
    } catch (error) {
      console.error('카카오 로그인 새로운 api 실패', error);
    }
  };

  useEffect(() => {
    const handleAll = async () => {
      await kakaoLogin();
    };

    handleAll();
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(login({ profileImg: profileImg }));
      dispatch(addToken(accessToken));
      if (nickname === '') navigate('/tutorial');
      else navigate('/');
    }
  }, [accessToken]);

  return (
    <div className='w-full h-full bg-white grid place-content-center'>
      <LoaderPyramid text='로그인 중...' />
    </div>
  );
}
