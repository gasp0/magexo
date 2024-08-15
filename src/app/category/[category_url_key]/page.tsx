import { getClient } from '@/lib/client';
import { Aggregations, CategoryUrlPageProps, Product } from '@/types/general';
import { GET_PRODUCTS_BY_CATEGORY } from '@/queries/getQueries';
import ProductGrid from '@/app/components/ProductGrid';
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

        {/* Products Column(s) */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
