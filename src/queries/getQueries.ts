import { gql } from '@apollo/client';

export const GET_MENU_CATEGORIES = gql`
  query getMenuCategories {
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

export const GET_PRODUCTS = gql`
  query {
    categoryList {
      products {
        total_count
        items {
          name
          sku
          meta_title
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
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getProductsByFilters(
    $category_url_key: String!
    $fashion_material: String
    $fashion_color: String
    $fashion_style: String
    $has_video: String
  ) {
    categories(filters: { url_path: { eq: $category_url_key } }) {
      items {
        name
      }
    }
    products(
      filter: {
        category_url_path: { eq: $category_url_key }
        fashion_material: { eq: $fashion_material }
        fashion_color: { eq: $fashion_color }
        fashion_style: { eq: $fashion_style }
        has_video: { eq: $has_video }
      }
      pageSize: 48
    ) {
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
      aggregations {
        label
        count
        attribute_code
        options {
          value
          count
          label
        }
      }
    }
  }
`;
