export interface Category {
  id: string;
  name: string;
  url_path: string;
  level: number;
}

export interface CategoryList {
  categoryList: Array<{
    products: {
      items: Product[];
    };
  }>;
}

export interface CategoryUrlPageProps {
  params: {
    category_url_key: string;
  };
  searchParams: any;
}

export interface CategoryUrlParams {
  category_url_key: string;
}

export interface Product {
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
  url_key?: string;
  description: { html: string };
}

export interface ProductsProps {
  data: CategoryList;
}

export interface ProductDetailPageProps {
  params: {
    url_key: string;
  };
}

export type QueryParamater =
  | 'fashion_material'
  | 'fashion_color'
  | 'fashion_style'
  | 'has_video';

export interface CategoryUrlSearchParams extends URLSearchParams {
  get(name: 'fashion_material'): string | null;
  get(name: 'fashion_color'): string | null;
  get(name: 'fashion_style'): string | null;
  get(name: 'has_video'): string | null;
}

export interface AggregationOptions {
  value: string;
  count: number;
  label: string;
}

export interface Aggregations {
  label: string;
  count: number;
  attribute_code: string;
  options: AggregationOptions[];
}

export interface ProductGridProps {
  products: Product[];
}
