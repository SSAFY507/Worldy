export default function LoginModalBackground({ onPointerOut }: any) {
  return (
    <div
      onClick={onPointerOut}
      className=' fixed top-4 left-0 w-full h-full bg-behindModalBackground z-10'
    ></div>
  );
}
