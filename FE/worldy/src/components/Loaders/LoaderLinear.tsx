import './LoaderLinearStyle.css';

export default function LoaderLinear() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div id='load'>
        <div style={{ fontSize: 35 }}>Y</div>
        <div style={{ fontSize: 35 }}>D</div>
        <div style={{ fontSize: 35 }}>L</div>
        <div style={{ fontSize: 35 }}>R</div>
        <div style={{ fontSize: 35 }}>O</div>
        <div style={{ fontSize: 35 }}>W</div>
      </div>
    </div>
  );
}
