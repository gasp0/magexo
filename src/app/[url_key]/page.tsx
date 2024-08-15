import React from 'react';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';
import Image from 'next/image';
import { Product, ProductDetailPageProps } from '@/types/general';

const GET_PRODUCT_BY_URL_KEY = gql`
  query getProductByUrlKey($url_key: String!) {
    products(filter: { url_key: { eq: $url_key } }) {
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
        description {
          html
        }
      }
    }
  }
`;

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { loading, error, data } = await getClient().query({
    query: GET_PRODUCT_BY_URL_KEY,
    variables: { url_key: params.url_key },
  });

  const product: Product | undefined = data.products.items[0];

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col md:flex-row ">
        <Image
          src={product.thumbnail.url}
          alt={product.name}
          width={300}
          height={300}
          className="w-full md:w-1/2 h-auto rounded-md"
        />
        <div className="mt-4 md:mt-0 md:ml-8">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">SKU: {product.sku}</p>
          <p className="text-2xl text-red-800 font-bold my-3">
            {product.price.regularPrice.amount.value}{' '}
            {product.price.regularPrice.amount.currency}
          </p>
          <h2 className="text-xl font-bold">Description</h2>
          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          />
        </div>
      </div>
    </div>
  );
}
