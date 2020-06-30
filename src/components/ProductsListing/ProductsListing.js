import React from "react"
import { graphql, StaticQuery } from "gatsby"
import ProductCard from "./ProductCard"

const PRODUCTS_LISTING_QUERY = graphql`
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
`

const ProductsListing = () => {
  return (
    <div>
      <h2 className="title">Products</h2>
      <StaticQuery
        query={PRODUCTS_LISTING_QUERY}
        render={({ products }) => {
          return (
            <div className="">
              <h1>{products.handle}</h1>
              {products.edges.map(({ node: product }) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}

export default ProductsListing
