import { Link } from 'react-router-dom';
import BUTTON_RED from '../components/Button_Red';

function IntroPage() {
  const tempClick = () => {
    console.log('버튼 눌림 공통');
  };

  return (
    <div>
      <h1
        className='text-3xl font-bold underline'
        style={{ color: `var(--purple500-color)` }}
      >
        Hello
      </h1>
      <Link to='/hoons'>
        <button>HoonsPage 이동</button>
      </Link>
      <BUTTON_RED
        text='게임 시작'
        rounded={true}
        fontSize={20}
        onClick={tempClick}
      ></BUTTON_RED>
    </div>
  );
}

export default IntroPage;
