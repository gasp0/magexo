import Link from 'next/link';
import { getClient } from '@/lib/client';
import HamburgerMenu from './Hamburger';
import { Category } from '@/types/general';
import { GET_MENU_CATEGORIES } from '@/queries/getQueries';

const Navbar = async () => {
  const { loading, error, data } = await getClient().query({
    query: GET_MENU_CATEGORIES,
  });

  const filterLevelTwoCategories = (categories: Category[]) => {
    return categories.filter((category) => category.level === 2);
  };
  const menuCategories = filterLevelTwoCategories(data.categories.items);

  return (
    <>
      <nav className="hidden lg:flex">
        <ul className="flex">
          <li className="lg:text-md p-4 px-8 font-bold  hover:text-fuchsia-700">
            <Link href="/">Home</Link>
          </li>

          {menuCategories.map((category) => (
            <li
              key={category.id}
              className="lg:text-md p-4  px-8  font-bold  hover:text-fuchsia-700"
            >
              <Link href={`/category/${category.url_path}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lg:hidden">
        <HamburgerMenu categories={menuCategories} />
      </div>
    </>
  );
};

export default Navbar;
