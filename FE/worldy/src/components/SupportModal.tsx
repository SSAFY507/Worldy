import * as React from 'react';
import { useState, useEffect } from 'react';

import '../styles/SupportModalStyles.css';
import PersonalAccept from './PersonalAccept';
import CustomAxios from '../API/CustomAxios';
import { loginToken, wholeState } from '../_store/slices/loginSlice';
import { useSelector } from 'react-redux';
import { useSelect } from '@react-three/drei';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    { value: 2, name: '게임문의' },
    { value: 3, name: '기타문의' },
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
          className={`flex-1 outline-[0.1em] outline-gray-300 p-[1em] align-top w-full rounded-sm text-[1.4em] leading-[1.5em] bg-[rgb(40,45,54)] text-white`}
          disabled={!ableWrite}
          rows={10} // 높이를 조절합니다 (행의 수를 설정하세요)
          cols={50} // 너비를 조절합니다 (열의 수를 설정하세요)
          style={{
            resize: 'none', // 리사이징 기능을 비활성화합니다
            overflow: 'auto', // 스크롤 기능을 활성화합니다
            whiteSpace: 'pre-wrap', // 자동 줄바꿈을 활성화합니다
            wordWrap: 'break-word', // 단어가 너비를 넘어갈 경우 줄바꿈을 적용합니다
          }}
          placeholder={`${ableWrite
            ? '문의 내용을 입력해주세요. (10~500자 내외)'
            : '위의 항목을 모두 채워주세요.'
            }`}
          maxLength={500}
        />
        <div className=' h-[1.5em] w-full font-PtdMedium px-[0.2em] text-gray-400 flex justify-end items-center text-[1.2em]'>
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

  const [result, setResult] = useState(null);
  const getToken: string | null = sessionStorage.getItem('token');
  const things = useSelector(wholeState);

  useEffect(() => {
    //console.log('토근 왜 안나와', getToken);
  }, [getToken]);

  useEffect(() => {
    //console.log('전부', things);
  }, [things]);

  const submitHelpAxios = async () => {
    //console.log('커스터엄 토큰 : ', getToken);
    try {
      const requestBody = new Map([
        ['category', askTypeList[askType].name],
        ['content', contentText],
      ]);

      const response = await CustomAxios({
        APIName: 'writeHelp',
        APIType: 'post',
        // UrlQuery: 'https://localhost:9090/api/help/write',
        UrlQuery: 'https://k8a507.p.ssafy.io/api/help/write',
        Body: requestBody,
        Token: getToken,
      });
      setResult(response);
      //console.log('리퀘스트 바디', requestBody);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 요청 헤더 및 바디를 포함하는 POST 요청 함수를 정의합니다.
  async function submitHelpAxiosBasic() {
    //console.log('문의 토큰 : ', getToken);

    try {
      const response = await axios.post(
        'https://k8a507.p.ssafy.io/api/help/write',
        // 요청 바디 데이터를 객체 형식으로 전달합니다.
        { category: askTypeList[askType].name, content: contentText },
        {
          headers: {
            // 요청 헤더 정보를 설정합니다.
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      //console.log(response.data);
      //console.log('문으 ㅣ전송 성공');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  const submitHelp = () => {
    submitHelpAxios();
    handleCloseModal();
    Swal.fire({
      title: '등록되었습니다.',
      confirmButtonText: '확인',
      customClass: {
        title: 'SWA2-support-title',

        confirmButton: 'btn btn-success SWA2-support-confirmbtn',
      },
      buttonsStyling: false,
    });
  };

  // submitHelpAxios().then(handleCloseModal);
  // submitHelpAxios();

  return (
    <div className='z-30 absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] flex flex-col justify-start items-center py-[5em]'>
      <div
        className={`bg-gray-700 flex flex-col justify-between items-center px-[5em]  py-[3em]  outline-[0.1em] outline-white rounded-2xl shadow-2xl`}
        style={{
          width: `${modalSize * 3}em`,
          minHeight: `${modalSize * 2.8}em`,
          height: 'fit',
        }}
      >
        <div className='h-[4em] w-full flex flex-row justify-between items-center mb-[1em]'>
          <div className='w-[45%] h-[4em]  outline-green-400 flex flex-col justify-between'>
            <span className='font-PtdSemiBOld h-[1em] mb-[0.5em]  outline-green-200 text-[1.2em] grid items-center text-gray-400'>
              작성 유형
            </span>
            <select
              className='pl-[.8em] flex-1 outline-[0.1em] rounded-md outline-gray-400 custom-select bg-[rgb(40,45,54)] text-gray-200 text-[20px] font-PtdMedium'
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
          <div className='w-[45%] h-[4em]  outline-green-400 flex flex-col justify-between '>
            {contentType === 0 ? (
              <>
                <span className='h-[1em] mb-[0.5em]  outline-green-200 text-[1.2em] font-PtdMedium grid items-center text-gray-400'>
                  문의 유형
                </span>
                <select
                  value={askType}
                  onChange={handleAskType}
                  className=' flex-1 outline-[0.1em] outline-gray-400  pl-[0.8em] custom-select bg-[rgb(40,45,54)] text-gray-200 rounded-md text-[20px] font-PtdMedium'
                >
                  {askTypeList.map((item, index) => (
                    <option
                      key={index}
                      defaultValue={askType}
                      value={item.value}
                      className=' h-[2.3em] text-white'
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <span className='font-PtdSemiBOld h-[1em] mb-[0.5em]  outline-green-200 text-[1.2em] grid items-center text-gray-400'>
                  신고 대상
                </span>
                <input
                  type='text'
                  value={reportOpponentID}
                  onChange={handleReportOpponentID}
                  className=' flex-1 outline-[0.1em]  outline-gray-400  pl-[0.8em] custom-select rounded-md bg-[rgb(40,45,54)] text-white  text-[20px] font-PtdMedium'
                  placeholder='닉네임'
                />
              </>
            )}
          </div>
        </div>
        <div className='outline-red-400 w-full flex-1 mt-[1em]'>
          <div className='w-full h-full flex flex-col justify-between items-center'>
            <div className='w-full flex-1  outline-green-500 flex flex-col justify-between'>
              <span className='font-PtdSemiBOld  h-[1.5em] mb-[0.5em] outline-green-200 text-[1.2em] grid items-center text-gray-400 '>
                문의 내용
              </span>
              <div className='flex-1 flex flex-col justify-stretch items-center pb-[1.5em] '>
                {textArea()}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[3em] pt-[.5em]  flex flex-row justify-between items-center'>
          <button
            onClick={submitHelp}
            className={`rounded-[4px] w-[47%] h-[60px]  outline-[rgba(255,255,255,0.6)] outline-1  font-PtdRegular ${submittable
              ? 'hover:bg-[rgb(255,18,5)] bg-buttonRed outline-[rgba(255,255,255,0.6)] text-white'
              : 'bg-[rgba(125,125,125,0.2)] outline-[rgba(121,121,121,0.6)] text-gray-400 text-[18px]'
              }`}
            disabled={!submittable}
          >
            확인
          </button>
          <button
            onClick={handleCloseModal}
            className=' rounded-[4px] w-[47%] h-[60px]  outline-[rgba(255,255,255,0.6)] outline-1 text-white font-PtdRegular text-[18px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(206,206,206,0.2)]'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
