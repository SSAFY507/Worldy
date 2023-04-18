import TestFor3D from '../components/TestFor3D';

function HoonsTestPage() {
  return (
    <div>
      <h1
        className='text-3xl font-bold underline'
        style={{ color: `var(--purple500-color)` }}
      >
        Hoons
      </h1>
      <TestFor3D />
    </div>
  );
}

export default HoonsTestPage;
