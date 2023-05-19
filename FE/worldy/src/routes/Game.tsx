import * as React from 'react';
import { useState, useEffect } from 'react';
import TestFor3DEdit from '../components/TestFor3DEdit';
import Main from '../components/game/Main';
import { useNavigate } from 'react-router';
import LoginModal from '../components/LoginModal';
import LoaderPyramid from '../components/Loaders/LoaderPyramid';
import { useParams } from 'react-router';
import LoaderLinear from '../components/Loaders/LoaderLinear';

export default function Game() {

  // 로그인 확인
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleFirstLogin = (firstLogin: boolean) => {
    //console.log(firstLogin);
  }

  useEffect(() => {
    if (!token) {
      setShowLoginModal(true);
      sessionStorage.setItem('gameId', `${gameId}`);
    } else {
      sessionStorage.removeItem('gameId')
    }
  }, [])

  const params = useParams();
  const gameId = params.id;

  const [loaded, setLoaded] = useState<boolean>(false);
  setTimeout(() => {
    setLoaded(true);
  }, 1000);
  return (
    <div className='w-screen h-screen '>
      {
        showLoginModal && (
          <LoginModal
            onClose={closeLoginModal}
          //onClickKakaoLogin={handleFirstLogin}
          />
        )
      }

      {loaded ? (
        <Main />
      ) : (
        <div className='w-full h-full bg-white pt-20 bg-[#FFFDF4]'>
          <LoaderLinear />
        </div>
      )}

    </div>
  );
}
