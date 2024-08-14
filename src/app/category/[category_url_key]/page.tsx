import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';
import { ProductsQuery, useProductsQuery } from '@/generated/graphql';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($url_key: String!) {
    categoryList(filters: { url_key: { eq: $url_key } }) {
      products {
        items {
          sku
          name
          url_key
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
    products(filter: { category_url_path: { eq: $url_key } }) {
      aggregations {
        attribute_code
        count
        label
        position
        options {
          count
          label
          value
        }
      }
    }
  }
`;

interface CategoryUrlPageProps {
  params: {
    category_url_key: string;
  };
}

interface Product {
  name: string;
  sku: string;
  thumbnail: {
    url: string;
  };
  price: {
    regularPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
  };
}

interface CategoryList {
  categoryList: Array<{
    products: {
      items: Product[];
    };
  }>;
}

interface ProductsProps {
  data: CategoryList;
}

export default async function Products({ params }: CategoryUrlPageProps) {
  const { loading, error, data } = await getClient().query<ProductsQuery>({
    query: GET_PRODUCTS_BY_CATEGORY,
    variables: { url_key: params.category_url_key },
  });

  // const { loading, error, data } = await useProductsQuery();
  // const ProductsGrid: React.FC<ProductsProps> = ({ data }) => {
  const products = data.categoryList[0]?.products.items;
  const aggregations = data.products.aggregations;

  // Manage client-side state for filtering
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{params.category_url_key}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Aggregations Column */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold">Filters</h2>
          {aggregations.map((agg) => (
            <div key={agg.attribute_code} className="mb-4">
              <h3 className="text-lg font-semibold">{agg.label}</h3>
              <ul className="ml-4">
                {agg.options.map((option) => (
                  <li key={option.value} className="text-gray-700">
                    {option.label} ({option.count})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Products Column(s) */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.sku}>
              <Link href={`/${product.url_key}`}>
                <Image
                  src={product.thumbnail.url}
                  width={300}
                  height={300}
                  alt={product.name}
                  className="w-full h-auto rounded-md"
                />
                <h3 className="text-lg font-semibold text-center mt-4">
                  {product.name}
                </h3>
                <p className="text-gray-600 m-2 text-center">
                  SKU: {product.sku}
                </p>
                <p className="font-bold m-2 text-center text-red-800">
                  {product.price.regularPrice.amount.value}{' '}
                  {product.price.regularPrice.amount.currency}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
