import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';

const GET_PRODUCTS = gql`
  query {
    categoryList {
      products {
        total_count
        items {
          name
          sku
          meta_title
          url_path
          thumbnail {
            url
          }
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
        }
      }
    }
  }
`;

export default async function Products() {
  const { loading, error, data } = await getClient().query({
    query: GET_PRODUCTS,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      Products page
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
