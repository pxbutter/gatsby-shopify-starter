import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductCard from "./ProductCard"

const ProductsListing = () => {
  let products = {}
  const PRODUCTS_LISTING_QUERY = useStaticQuery(graphql`
    query ProductsListingQuery {
      products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }) {
        edges {
          node {
            title
            id
            handle
            description
            productType
            variants {
              shopifyId
              title
              price
              availableForSale
            }
            images {
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  products = PRODUCTS_LISTING_QUERY.products.edges

  return (
    <>
      <h2 className="title">Homepage Collection</h2>
      <div class="container">
        <div class="row">
          {products.map(
            ({ node: product }) =>
              product && (
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard key={product.id} product={product} />
                </div>
              )
          )}
        </div>
      </div>
    </>
  )
}

export default ProductsListing
