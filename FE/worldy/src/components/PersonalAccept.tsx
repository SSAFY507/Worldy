import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/PersonalAcceptStyles.css';

export default function PersonalAccept({ closePA }: { closePA: () => void }) {
  return (
    <div className='z-50 absolute top-0 left-0 flex flex-col justify-start items-center w-full h-full py-[5em]'>
      <div className=' absolute w-[auto] h-auto bg-white flex flex-col justify-stretch items-center shadow-2xl rounded-md'>
        <h1 className='font-PtdBold text-[35px] text-center mt-[1.5em] mb-[.5em]'>
          개인정보처리방침
        </h1>
        <div className='flex-1 flex  justify-center  items-center p-[2em]  outline-black w-auto h-auto'>
          <div className='w-[45em] h-[30em]  outline-gray-300 outline-[0.1rem] py-[1em] px-[2em] text-[16px] font-PtdRegular leading-[22px] overflow-y-scroll on-scrollbar'>
            <h1 className='font-PtdSemiBOld text-[25px]'>
              [개인 정보 수집 및 이용 동의]
            </h1>
            <br />
            <p>WORLDY SOFT는 다음과 같이 개인정보를 수집하고있습니다.</p>
            <br />
            <p>
              수집 및 이용 목적 : 문의 대응, 이용자 식별
              <br /> 항목 : 닉네임
              <br />
              보유 및 이용기간: 수집일로부터 1개월 (법령에 특별한 규정이 있을
              경우 관련 법령에 따라 보관)
            </p>
            <br />
            <p>
              문의 유형에 따라 ID, 이름, 이메일 주소, 휴대폰 번호, 생년월일,
              성별, 본인확인 정보 ,결제 정보, 자동으로 생성되는 정보 등 추가로
              수집하는 개인정보가 있을 수 있습니다.
            </p>
            <br />
            <br />
            <br />
            <h1 className='font-PtdSemiBOld text-[25px]'>
              [회원님의 정보를 이용하는 방법]
            </h1>
            <br />
            <p>
              WORLDY SOFT는 수집한 정보를 회원님에게 맞춤화된 환경을 제공하기
              위해 이용합니다.
              <br />
              <br />이 목적 중 일부를 위해 저희는 카카오톡 계정 정보를
              이용합니다. 저희가 이러한 목적으로 이용하는 정보는 저희의 시스템을
              통해 자동으로 처리됩니다. 그러나 경우에 따라 저희는 수동 검토를
              사용하여 회원님의 정보에 액세스하고 이를 검토할 수 있습니다.
              <br />
              <br />
              개별 이용자와 연결된 정보를 이용하는 것을 줄이기 위해 저희는
              경우에 따라 정보를 비식별화하거나 총계처리합니다. 더 이상 해당
              정보로 회원님을 식별하지 못하도록 정보를 익명화할 수도 있습니다.
            </p>
            <br />
            <p>
              저희는 수집하는 정보를 다음과 같이 이용합니다.
              <br />
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                서비스가 제대로 작동하는지 확인
              </span>
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                제대로 작동하지 않을 경우 문제 해결 및 수정
              </span>
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                제대로 작동하는지 알아보기 위해 테스트
              </span>
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                기능 관련 아이디어에 대한 의견 수렴
              </span>
            </p>
            <br />
            <br />
            <br />
            <h1 className='font-PtdSemiBOld text-[25px]'>
              [회원님의 정보 관련 권리 및 권리 행사 방법 ]
            </h1>
            <br />
            <p>
              회원님은 회원님의 정보와 관련하여 다음과 같은 요청을 할 수
              있습니다.
              <br />
              <br />
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                회원님의 정보를 열람하기 위한 서비스 내 도구를 이용하여
                개인정보의 열람 및 회원님의 정보 확인
              </span>
              <span className='flex justify-start items-center'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  height='1.5em'
                  width='1.5em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                삭제하기 위한 서비스 내 도구를 이용하여 개인정보의 삭제
              </span>
              <br />
              WORLDY SOFT는 회원님의 요청을 받은 후 회원님의 요청이 정당한지
              여부를 검토합니다. 관련 법률에 따라 정당한 거절 사유가 있는 경우
              요청이 거절될 수 있습니다.
            </p>
            <br />
            <br />
            <br />
            <p>
              * 그 외의 사항 및 자동 수집 정보와 관련된 사항은
              개인정보처리방침을 따릅니다.
            </p>
            <br />
            <br />
          </div>
        </div>
        <div className='h-[4em] outline-red-500 w-full flex justify-center items-center pb-[1em]'>
          <button
            className='bg-blue-500 w-[12em] h-full font-PtdSemiBOld text-white'
            onClick={closePA}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
