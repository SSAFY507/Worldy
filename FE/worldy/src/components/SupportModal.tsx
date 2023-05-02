import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/SupportModalStyles.css';
import PersonalAccept from './PersonalAccept';

type askTypeListType = {
  value: number;
  name: string;
};

export default function SupportModal({
  type,
  handleCloseModal,
}: {
  type: boolean;
  handleCloseModal: () => void;
}) {
  const modalSize: number = 16;

  const [contentType, setContentType] = useState<number>();
  useEffect(() => {
    setContentType(type ? 0 : 1);
  }, []);

  const [askType, setAskType] = useState<number>(0);
  const handleAskType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setAskType(parseInt(selectedType, 10));
  };

  const askTypeList: askTypeListType[] = [
    { value: 0, name: '-' },
    { value: 1, name: '계정/보안' },
    { value: 2, name: '게임 문의' },
    { value: 3, name: '기타 문의' },
  ];

  const [ableWrite, setAbleWrite] = useState<boolean>(type);

  const [contentText, setContentText] = useState<string>('');

  const handleContentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContentText(text);
  };

  const [submittable, setSubmittable] = useState<boolean>(false);

  const handleContentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setContentType(parseInt(selectedType, 10));
    setAskType(0);
  };

  const textArea = () => {
    return (
      <>
        <textarea
          value={contentText}
          onChange={handleContentText}
          className={`bg-[rgb(240,240,240)] flex-1 outline-[0.1em] outline outline-gray-300 p-[1em] align-top w-full rounded-sm`}
          disabled={!ableWrite}
          rows={10} // 높이를 조절합니다 (행의 수를 설정하세요)
          cols={50} // 너비를 조절합니다 (열의 수를 설정하세요)
          style={{
            resize: 'none', // 리사이징 기능을 비활성화합니다
            overflow: 'auto', // 스크롤 기능을 활성화합니다
            whiteSpace: 'pre-wrap', // 자동 줄바꿈을 활성화합니다
            wordWrap: 'break-word', // 단어가 너비를 넘어갈 경우 줄바꿈을 적용합니다
          }}
          placeholder={`${
            ableWrite
              ? '문의 내용을 입력해주세요. (10~500자 내외)'
              : '2번 항목을 채워주세요.'
          }`}
          maxLength={500}
        />
        <div className=' h-[1.5em] w-full font-PtdMedium px-[0.2em] text-white flex justify-end items-center'>
          {contentText.length}/500
        </div>
      </>
    );
  };

  const [checkPersonalAccept, setCheckPersonalAccept] =
    useState<boolean>(false);

  const handleCheckPersonalAccept = () => {
    setCheckPersonalAccept(!checkPersonalAccept);
  };

  const [showPersonalAccept, setShowPersonalAccept] = useState<boolean>(false);
  const handleShowPersonalAccept = () => {
    setShowPersonalAccept(!showPersonalAccept);
  };

  const [reportOpponentID, setReportOpponentID] = useState<string>('');
  const handleReportOpponentID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportOpponentID(e.target.value);
  };

  useEffect(() => {
    if (contentType === 0) {
      setAbleWrite(askType !== 0);
    } else {
      setAbleWrite(reportOpponentID.length !== 0);
    }
    setContentText('');
  }, [askType, contentType, reportOpponentID]);

  useEffect(() => {
    if (contentText.length >= 10) {
      setSubmittable(true);
    } else setSubmittable(false);
  }, [contentText]);

  return (
    <div className='z-30 absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] flex flex-col justify-start items-center py-[5em]'>
      {showPersonalAccept && (
        <PersonalAccept closePA={() => setShowPersonalAccept(false)} />
      )}
      <div
        className={`bg-gray-700 flex flex-col justify-between items-center px-[5em]  py-[3em]  outline-[0.1em] outline-white rounded-2xl ${
          showPersonalAccept ? 'blur-sm' : ''
        } shadow-2xl`}
        style={{
          width: `${modalSize * 3}em`,
          minHeight: `${modalSize * 2.8}em`,
          height: 'fit',
        }}
      >
        <div className='h-[4em] w-full flex flex-row justify-between items-center mb-[1em]'>
          <div className='w-[45%] h-[4em]  outline-green-400 flex flex-col justify-between'>
            <span className='font-PtdSemiBOld h-[1.5em] mb-[0.5em]  outline-green-200 text-[1.2em] grid items-center text-white'>
              작성 유형
            </span>
            <select
              className='pl-[.8em] flex-1 outline-[0.1em] outline outline-gray-400 custom-select bg-[rgb(240,240,240)] rounded-sm'
              value={contentType}
              onChange={handleContentType}
            >
              <option value={0} defaultValue={contentType}>
                문의
              </option>
              <option value={1} defaultValue={contentType}>
                신고
              </option>
            </select>
          </div>
          <div className='w-[45%] h-[4em]  outline-green-400 flex flex-col justify-between'>
            {contentType === 0 ? (
              <>
                <span className='font-PtdSemiBOld h-[1.5em] mb-[0.5em]  outline-green-200 text-[1.2em] grid items-center text-white'>
                  문의 유형
                </span>
                <select
                  value={askType}
                  onChange={handleAskType}
                  className=' flex-1 outline-[0.1em] outline outline-gray-400  pl-[0.8em] custom-select bg-[rgb(240,240,240)] rounded-sm'
                >
                  {askTypeList.map((item, index) => (
                    <option
                      key={index}
                      defaultValue={askType}
                      value={item.value}
                      className='text-black  h-[2.3em]'
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <span className='font-PtdSemiBOld h-[1.5em] mb-[0.5em]  outline-green-200 text-[1.2em] grid items-center text-white'>
                  신고 대상(닉네임)
                </span>
                <input
                  type='text'
                  value={reportOpponentID}
                  onChange={handleReportOpponentID}
                  className=' flex-1 outline-[0.1em] outline outline-gray-400  pl-[0.8em] custom-select bg-[rgb(240,240,240)] rounded-sm'
                  placeholder='신고 대상의 닉네임을 입력해주세요...'
                />
              </>
            )}
          </div>
        </div>
        <div className='outline-red-400 w-full flex-1 mt-[1em]'>
          <div className='w-full h-full flex flex-col justify-between items-center'>
            <div className='w-full flex-1  outline-green-500 flex flex-col justify-between'>
              <span className='font-PtdSemiBOld  h-[1.5em] mb-[0.5em] outline-green-200 text-[1.2em] grid items-center text-white'>
                문의 내용
              </span>
              <div className='flex-1 flex flex-col justify-stretch items-center pb-[1.5em]'>
                {textArea()}
              </div>
            </div>
          </div>
        </div>
        {/* <div className='outline-white h-[1.5em] w-full mb-[1em] flex flex-row justify-start items-center'>
          <button
            className='hover:underline hover:underline-white hover:text-white text-[rgb(200,200,200)]'
            onClick={handleShowPersonalAccept}
          >
            <span className='mr-[0.5em]'>[개인 정보 처리 방침] 동의</span>
          </button>
          <div className='container-custm'>
            <input
              type='checkbox'
              id='cbx2'
              style={{ display: 'none' }}
              onChange={handleCheckPersonalAccept}
            />
            <label htmlFor='cbx2' className='check-custom'>
              <svg width='18px' height='18px' viewBox='0 0 18 18'>
                <path d='M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z'></path>
                <polyline points='1 9 7 14 15 4'></polyline>
              </svg>
            </label>
          </div>
        </div> */}
        <div className='w-full h-[3em] pt-[.5em]  flex flex-row justify-between items-center'>
          <button
            onClick={() => handleCloseModal()}
            className={`rounded-[4px] w-[47%] h-[4em]  outline-[rgba(255,255,255,0.6)] outline-1  font-PtdRegular text-[15px]  ${
              submittable
                ? 'hover:bg-[rgb(255,18,5)] bg-buttonRed outline-[rgba(255,255,255,0.6)] text-white'
                : 'bg-[rgba(125,125,125,0.2)] outline-[rgba(121,121,121,0.6)] text-gray-400'
            }`}
            disabled={!submittable}
          >
            확인
          </button>
          <button
            onClick={() => handleCloseModal()}
            className=' rounded-[4px] w-[47%] h-[4em]  outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[15px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(206,206,206,0.2)]'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
