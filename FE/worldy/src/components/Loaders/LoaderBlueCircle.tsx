import './LoaderBlueCircleStyles.css';

export default function LoaderBlueCircle({ text }: { text: string }) {
  return (
    <div className='w-full h-full flex flex-col  justify-center items-center'>
      <div className='bluecirclecontainer '>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='text-2xl font-PtdRegular h-16 mt-[150px]'>
        <h2>{text}</h2>
      </div>
    </div>
  );
}
