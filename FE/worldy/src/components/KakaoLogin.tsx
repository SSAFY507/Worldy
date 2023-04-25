import * as React from 'react';
import { useState, useEffect } from 'react';
import KakaoLoginButton from '../assets/images/KakaoLoginButton.png';

type KakaoLoginProps = {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
};

export default function KakaoLogin({ onSuccess, onFailure }: KakaoLoginProps) {
  const handleKakaoLogin = () => {
    //eslint-disable-next-line
    (window as any).Kakao.Auth.login({
      success: (response: any) => {
        onSuccess(response);
      },
      fail: (error: any) => {
        onFailure(error);
      },
    });
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img src={KakaoLoginButton} alt='카카오 로그인 버튼 이미지' />
    </button>
  );
}
