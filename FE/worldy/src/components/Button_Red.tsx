import * as React from 'react';
import { useState, useEffect } from 'react';

type Button_Red_Type = {
  text: React.ReactNode;
  rounded: boolean;
  width?: number;
  height?: number;
  fontSize: number;
  fontFamily?: string;
  onClick: any;
};

// 글꼴 목록 :
//font-PtdBlack
//font-PtdExtraBold
//font-PtdBold
//font-PtdExtraLight
//font-PtdLight
//font-PtdMedium
//font-PtdRegular
//font-PtdSemiBold
//font-PtdThin
export default function BUTTON_RED({
  text, //버튼 내부 텍스트
  rounded, //true : 동그랑 버튼, false : 네모난 버튼
  width, //직접 설정 or (null =>) w-fit
  height, //직접 설정 or (null => ) h-fit
  fontSize, //fontsize
  fontFamily, //글꼴 or (null => ) font-PtdSemiBold
  onClick, //버튼 함수
}: Button_Red_Type) {
  const [hoverState, setHoverState] = useState<boolean>(false);
  const Button_Red_Style = {
    borderRadius: rounded ? '999px' : '6px',
    // width: width,
    width: width ? width : 'fit-content',
    height: height ? height : 'fit-content',
    fontSize: fontSize + 'px',
    backgroundColor: hoverState ? 'rgba(255, 18, 5, 1)' : undefined,
  };

  const contentFontFamily = fontFamily ? fontFamily : 'font-PtdSemiBold';

  return (
    <div>
      <button
        className={`${contentFontFamily} bg-buttonRed px-3 py-2 text-white`}
        style={Button_Red_Style}
        onClick={onClick}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        {text}
      </button>
    </div>
  );
}
