import * as React from 'react';
import { useState, useEffect } from 'react';

export default function PersonalAccept({ closePA }: { closePA: () => void }) {
  return (
    <div className='z-50 absolute top-0 left-0 flex flex-col justify-start items-center w-full h-full bg-[rgba(255,255,255,0.5)] py-[8em]'>
      <div className=' absolute outline-black w-auto h-auto bg-white flex flex-col justify-stretch items-center'>
        <div className='flex-1 flex  justify-center  items-center p-[1em]  outline-black w-auto h-auto'>
          <div className='w-auto h-auto outline outline-gray-300 outline-[0.1rem] p-[1em] text-[16px] font-PtdRegular leading-[20px]'>
            <h1 className='font-PtdSemiBOld'>[개인 정보 수집 및 이용 동의]</h1>
            <br />
            <p>WORDLY SOFT는 다음과 같이 개인정보를 수집하고있습니다.</p>
            <br />
            <p>
              수집 및 이용 목적 : 문의 대응, 이용자 식별
              <br /> 항목 : 캐릭터 명<br />
              보유 및 이용기간:{' '}
              <span className='font-PtdSemiBOld text-[20px]'>
                수집일로부타 1개월 (법령에 특별한 규정이 있을 경우 관련 법령에
                따라 보관)
              </span>
            </p>
            <br />
            <p>
              문의 유형에 따라 ID, 이름, 이메일 주소, 휴대폰 번호, 생년월일,
              성별, 본인확인 정보 ,결제 정보, 자동으로 생성되는 정보 등 추가로
              수집하는 개인정보가 있을 수 있습니다.
            </p>
            <br />
            <p>동의를 거부할 경우 문의를 접수할 수 없습니다.</p>
            <br />
            <p>
              * 그 외의 사항 및 자동 수집 정보와 관련된 사항은
              개인정보처리방침을 따릅니다.
            </p>
          </div>
        </div>
        <div className='h-[4em]  outline-red-500 w-full flex justify-center items-center pb-[1em]'>
          <button
            className='bg-blue-500 w-[8em] h-full font-PtdSemiBOld text-white'
            onClick={() => closePA()}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
