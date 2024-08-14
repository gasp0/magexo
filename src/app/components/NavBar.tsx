import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { getClient } from '@/lib/client';

const GET_CATEGORIES = gql`
  query Categories {
    categories(filters: { parent_id: { eq: "2" } }) {
      items {
        id
        name
        url_path
        level
      }
    }
  }
`;

const Navbar = async () => {
  const { loading, error, data } = await getClient().query({
    query: GET_CATEGORIES,
  });

  const filterLevelTwoCategories = (categories) => {
    return categories.filter((category) => category.level === 2);
  };
  const menuCategories = filterLevelTwoCategories(data.categories.items);

  return (
    <nav className="">
      <ul className="flex">
        <li className="text-lg p-4 px-8 font-bold  hover:text-fuchsia-700">
          <Link href="/">Home</Link>
        </li>

        {menuCategories.map((category) => (
          <li
            key={category.id}
            className="text-lg p-4  px-8  font-bold  hover:text-fuchsia-700"
          >
            <Link href={`/category/${category.url_path}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
