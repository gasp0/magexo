import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="">
      <ul className="flex">
        <li className="text-lg p-4 px-8 font-bold  hover:text-fuchsia-700">
          <Link href="/">Home</Link>
        </li>
        <li className="text-lg p-4  px-8  font-bold hover:text-fuchsia-700 ">
          <Link href="/category">Category</Link>
        </li>
        <li className="text-lg p-4  px-8  font-bold  hover:text-fuchsia-700 ">
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
