import * as React from 'react';
import { useState, useEffect } from 'react';
import KakaoLoginButton from '../assets/images/KakaoLoginButton.png';
import { useSearchParams } from 'react-router-dom';

type KakaoLoginProps = {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
};

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    //eslint-disable-next-line

    window.Kakao.Auth.authorize({
      // 최종 배포이후에는 localhost가 아닌 j8a707 url로 요청해야함
      // redirectUri: 'https://k8a507.p.ssafy.io/user/kakao/callback',
      redirectUri: 'http://localhost:3000/user/kakao/callback',
    });
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img src={KakaoLoginButton} alt='카카오 로그인 버튼 이미지' />
    </button>
  );
}
