import { getClient } from '@/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { GET_PRODUCTS } from '@/queries/getQueries';
import { Product } from '@/types/general';

export default async function Products() {
  const { loading, error, data } = await getClient().query({
    query: GET_PRODUCTS,
  });

  const products: Product[] = data.categoryList[0]?.products.items;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="m-8 text-2xl	font-bold">Products page</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
  );
}
