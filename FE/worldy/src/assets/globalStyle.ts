import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// react icons 스타일
const iconStyle = {
  verticalAlign: 'middle',
  color: 'var(--icon-color)',
  fontSize: '1.3rem',
  cursor: 'pointer',
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    /* Color */
    --gray800-color: #EBEBEB;
    --gray700-color: #D1D1D1;
    --gray600-color: #B8B8B8;
    --gray500-color: #9E9E9E;
    --gray400-color: #858585;
    --gray300-color: #6B6B6B;
    --gray200-color: #525252;
    --gray100-color: #383838;
    --white800-color: #FCF8F8;
    --white700-color: #EBD6D6;
    --white600-color: #DAB4B4;
    --white500-color: #C58B8B;
    --white400-color: #B46969;
    --white300-color: #9C4E4E;
    --white200-color: #7A3D3D;
    --white100-color: #582C2C;
    --yellow800-color: #FFEDD1;
    --yellow700-color: #FFD99E;
    --yellow600-color: #FFC56C;
    --yellow500-color: #FFB038;
    --yellow400-color: #FF9C05;
    --yellow300-color: #D17E00;
    --yellow200-color: #9E5F00;
    --yellow100-color: #6B4100;
    --red900-color: #fceaea;
    --red800-color: #FDD8D8;
    --red700-color: #FCA7A7;
    --red600-color: #FA7474;
    --red500-color: #F84444;
    --red400-color: #F61313;
    --red300-color: #CE0808;
    --red200-color: #9D0606;
    --red100-color: #6C0404;
    --purple900-color: #f6f2f8;
    --purple800-color: #EBDDF3;
    --purple700-color: #D5B6E7;
    --purple600-color: #BE90DA;
    --purple500-color: #A869CD;
    --purple400-color: #9244C0;
    --purple300-color: #76349D;
    --purple200-color: #592877;
    --purple100-color: #3C1B50;
    /* Color gradient */
    /* 5개나 만든 이유는.. 좋아하는 아이돌이 최대 5팀이니깐 */
    --red-gradient: linear-gradient(to bottom right, #FA7474 0%, #CE0808 100%);
    --red-gradient-hover: linear-gradient(to bottom right, #e06767 0%, #b50707 100%);
    --purple-gradient: linear-gradient(to bottom right, #A869CD 0%, #76349D 100%);
    --purple-gradient-hover: linear-gradient(to bottom right, #925bb3 0%, #642c85 100%);
    --gray-gradient: linear-gradient(to bottom right, #B8B8B8 0%, #6B6B6B 100%);
    --gray-gradient-hover: linear-gradient(to bottom right, #9e9e9e 0%, #525252 100%);
    --blue-gradient: linear-gradient(to bottom right, #9FC6F4 0%, #1976E1 100%);
    --blue-gradient-hover: linear-gradient(to bottom right, #8fb2db 0%, #1668c7 100%);
    --yellow-gradient: linear-gradient(to bottom right, #FFD99E 0%, #FF9B05 100%);
    --green-gradient: linear-gradient(to bottom right, #93F2A2 0%, #1AD138 100%);
    /* Graph color */
    --graph1-color: #4CD7F6;
    --graph2-color: #6DBFFF;
    --graph3-color: #7166F9;
    --graph4-color: #C74BF6;
    --graph5-color: #F946FF;
    /* background color */
    --background-color: #F9F7FA;
    /* Navigation bar height */
    --nav-height: 50px;
    /* empty space */
    --side-space: 200px;
    --content-space: 950px;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Humanbumsuk';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Humanbumsuk.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html, body {
    color: var(--gray100-color);
    width: 100%;
    //height: 100%;
    font-family: "Pretendard", -apple-system, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
  }
  button {
    border: none;
    cursor: pointer;
    padding: 0;
  }
  input {
    border: none;
    background-color: inherit;
  }
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
  }
  h1, h2, h3 {
    margin: 0px;
  }
`;

export { iconStyle, GlobalStyle };
