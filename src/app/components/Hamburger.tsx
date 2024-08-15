'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types/general';

interface HamburgerMenuProps {
  categories: Category[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <button onClick={toggleMenu} className="p-4 flex gap-3 font-bold">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        Menu
      </button>
      <ul
        className={`flex flex-col ${
          isOpen ? 'block bg-white fixed w-full sm:w-1/2' : 'hidden'
        }`}
      >
        <li className="text-lg p-4 px-8 font-bold hover:text-fuchsia-700">
          <Link onClick={() => setIsOpen(false)} href="/">
            Home
          </Link>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className="text-lg p-4 px-8 font-bold hover:text-fuchsia-700"
          >
            <Link
              onClick={() => setIsOpen(false)}
              href={`/category/${category.url_path}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
