import { Aggregations, CategoryUrlParams } from '@/types/general';
import Link from 'next/link';

interface FilterProps {
  aggregations: Aggregations[];
  searchParams: Record<string, string | string[] | undefined>;
  params: CategoryUrlParams;
  removeFilter: (
    attributeCode: string
  ) => Record<string, string | string[] | undefined>;
}

function Filter({
  aggregations,
  searchParams,
  params,
  removeFilter,
}: FilterProps) {
  return (
    <div className="md:col-span-1">
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
                  className="text-gray-700 cursor-pointer text-sm sm:text-base hover:text-blue-500"
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
    </div>
  );
}

export default Filter;
