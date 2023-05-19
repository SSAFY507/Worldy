import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { addNickname, addToken, loginState } from '../_store/slices/loginSlice';
import { login } from '../_store/slices/loginSlice';

import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import LoaderLinear from '../components/Loaders/LoaderLinear';

export default function Callback(): JSX.Element {
  const DOMAIN = process.env.REACT_APP_BASE_URL;
  const DOMAIN_S = process.env.REACT_APP_BASE_URL_SHORTER;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const urlToken = searchParams.get('code');

  const [accessToken, setAccessToken] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const kakaoLogin = async () => {
    //console.log(`uriToken${urlToken}`);
    try {
      const kakaoLoginResponse = await axios.get(
        DOMAIN + `/user/kakao/login?code=${urlToken}`
      );
      //console.log('전부', kakaoLoginResponse.data);
      setAccessToken(kakaoLoginResponse.data.tokenDto.accessToken);
      setProfileImg(kakaoLoginResponse.data.profileImg);
      setNickname(kakaoLoginResponse.data.nickName);
    } catch (error) {
      console.error('카카오 로그인 새로운 api 실패 ', error);
    }
  };

  useEffect(() => {
    const handleAll = async () => {
      await kakaoLogin();
    };

    handleAll();
  }, []);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(login({ profileImg: profileImg }));
      dispatch(addToken(accessToken));
      //console.log('토큰 추가 후 홈페이지로 이동', accessToken);
      if (nickname === '' || nickname === null) navigate('/tutorial');
      else {
        dispatch(addNickname(nickname));
        const gameId = sessionStorage.getItem('gameId');

        // 헤더 확인해서 roomId 있으면
        if (gameId) {
          navigate(`/game/${gameId}`); // 게임 uri로 입장 후 로그인 안돼있으면
        } else {
          navigate('/'); //로그인 안돼있으면 홈으로
        }
      }
    }
  }, [accessToken]);

  return (
    <div className='w-full h-full bg-white pt-20'>{/* <LoaderLinear /> */}</div>
  );
}
