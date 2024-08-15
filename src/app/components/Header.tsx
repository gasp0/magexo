import Link from 'next/link';
import Navbar from './NavBar';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <div
        className="container  m-auto bg-white flex flex-col justify-evenly drop-shadow-md

"
      >
        <Link href="/" className="h-auto m-20 self-center">
          <Image src={'../next.svg'} width={300} height={100} alt={'logo'} />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
