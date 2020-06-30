import React from "react"
import { graphql } from "gatsby"
import ProductCard from "../components/ProductsListing/ProductCard"

const ProductCategoriesTemplate = ({ data }) => {
  const { shopifyCollection } = data

  return (
    <>
      <div>
        <h2 className="title">{shopifyCollection.title}</h2>
        <div className="columns is-multiline">
          {shopifyCollection.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductCategoriesTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
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
`
