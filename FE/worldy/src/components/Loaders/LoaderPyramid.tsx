import './LoaderPyramidStyle.css';

export default function LoaderPyramid({ text }: { text: string }) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='pyramid-loader '>
        <div className='wrapper'>
          <span className='side side1'></span>
          <span className='side side2'></span>
          <span className='side side3'></span>
          <span className='side side4'></span>
          <span className='shadow'></span>
        </div>
      </div>
      <div className='text-2xl font-PtdRegular h-16'>
        <h2>{text}</h2>
      </div>
    </div>
  );
}
