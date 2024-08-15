import Link from 'next/link';
import Image from 'next/image';
import { ProductGridProps } from '@/types/general';

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="sm:col-span-2 md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p className="text-gray-600 m-2 text-center">SKU: {product.sku}</p>
            <p className="font-bold m-2 text-center text-red-800">
              {product.price.regularPrice.amount.value}{' '}
              {product.price.regularPrice.amount.currency}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
