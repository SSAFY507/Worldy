import { Link } from 'react-router-dom';

function IntroPage() {
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
    </div>
  );
}

export default IntroPage;
