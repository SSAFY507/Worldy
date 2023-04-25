import './LoaderLinearStyle.css';

export default function LoaderLinear({ text }: { text: string }) {
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
      {/* <div className='loader'>
        <p className='heading'>Loading</p>
        <div className='loading'>
          <div className='load'></div>
          <div className='load'></div>
          <div className='load'></div>
          <div className='load'></div>
        </div>
      </div> */}
    </div>
  );
}
