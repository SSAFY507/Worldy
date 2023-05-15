import './SHLoader.css';

export default function SHLoader({ text }: { text: string }) {
  return (
    <div className='w-full h-full grid place-content-center bg-white'>
      <div className='SHLoader-wrapper'>
        <div className='SHLoader-circle'></div>
        <div className='SHLoader-circle'></div>
        <div className='SHLoader-circle'></div>
        <div className='SHLoader-shadow'></div>
        <div className='SHLoader-shadow'></div>
        <div className='SHLoader-shadow'></div>
      </div>
    </div>
  );
}
