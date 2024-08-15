import { getClient } from '@/lib/client';
import Link from 'next/link';
import { Aggregations, CategoryUrlPageProps, Product } from '@/types/general';
import { GET_PRODUCTS_BY_CATEGORY } from '@/queries/getQueries';
import ProductGrid from '@/app/components/ProductGrid';
import Image from 'next/image';
import Filter from '@/app/components/Filter';

export default async function Products({
  params,
  searchParams,
}: CategoryUrlPageProps) {
  const fashionMaterial = searchParams.fashion_material || null;
  const fashionColor = searchParams.fashion_color || null;
  const fashionStyle = searchParams.fashion_style || null;
  const hasVideo = searchParams.has_video || null;

  const { loading, error, data } = await getClient().query({
    query: GET_PRODUCTS_BY_CATEGORY,
    variables: {
      category_url_key: params.category_url_key,
      fashion_material: fashionMaterial,
      fashion_color: fashionColor,
      fashion_style: fashionStyle,
      has_video: hasVideo,
    },
  });

  const products: Product[] = data.products.items;
  const aggregations: Aggregations[] = data.products.aggregations.filter(
    (agg: Aggregations) =>
      agg.label !== 'Category' &&
      agg.label !== 'Price' &&
      agg.label !== 'Has Video'
  );
  const categoryName = data.categories.items[0]?.name;

  const removeFilter = (param: string) => {
    const paramsClone = new URLSearchParams(searchParams);
    paramsClone.delete(param);
    return Object.fromEntries(paramsClone.entries());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {/* Aggregations Column */}
        <Filter
          aggregations={aggregations}
          searchParams={searchParams}
          params={params}
          removeFilter={removeFilter}
        />

        {/* <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">
            Filters{' '}
            {Object.keys(searchParams).length > 0 && (
              <span className="float-right">
                <Link
                  href={{
                    pathname: `/category/${params.category_url_key}`,
                  }}
                  className="text-red-600 "
                >
                  x
                </Link>
              </span>
            )}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-1">
            {aggregations.map((agg) => (
              <div key={agg.label} className="mb-4">
                <h3 className="text-xl font-semibold min-h-12 sm:min-h-6 sm:text-lg">
                  {agg.label}{' '}
                  {searchParams[agg.attribute_code] && (
                    <span className="sm:float-right text-red-600">
                      <Link
                        href={{
                          pathname: `/category/${params.category_url_key}`,
                          query: {
                            ...removeFilter(agg.attribute_code),
                          },
                        }}
                      >
                        x
                      </Link>
                    </span>
                  )}
                </h3>
                <ul className="sm:ml-4">
                  {agg.options.map((option) => (
                    <li
                      key={option.value}
                      className="text-gray-700 cursor-pointer text-sm sm:text-base  hover:text-blue-500"
                    >
                      <Link
                        href={{
                          pathname: `/category/${params.category_url_key}`,
                          query: {
                            ...searchParams,
                            [agg.attribute_code]: option.value,
                          },
                        }}
                      >
                        {option.label} ({option.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div> */}

        {/* Products Column(s) */}
        <ProductGrid products={products} />
        {/* <div className="sm:col-span-2 md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div> */}
      </div>
    </div>
  );
}
