import React from "react"
import { graphql, useStaticQuery, StaticQuery } from "gatsby"
import ProductCard from "./ProductCard"
import styled from "styled-components"
import Grid from "../../helpers/Grid"

// const ProductGrid = styled.div``

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
      <Grid>
        <div className="grid-item grid-item__one-quarter">
          {products.map(
            ({ node: product }) =>
              product && <ProductCard key={product.id} product={product} />
          )}
        </div>
      </Grid>
    </>
  )
}

export default ProductsListing
