import Navbar from './NavBar';

import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div
        className="container  m-auto bg-white flex flex-col justify-evenly drop-shadow-md

"
      >
        {/* <strong className="text-5xl text-center m-20">Header logo</strong> */}
        <Image
          src={'../next.svg'}
          width={300}
          height={100}
          alt={'logo'}
          className="h-auto m-20 self-center"
        />
        <Navbar />
      </div>
    </header>
  );
}
