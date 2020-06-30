import React, { useContext } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { StoreContext } from "../context/StoreContext"
import AddToCart from "../components/Cart/AddToCart"
import Grid from "../helpers/Grid"

const ProductDetailTemplate = ({ data }) => {
  const { toggleCartOpen } = useContext(StoreContext)
  const { shopifyProduct: product } = data
  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product
  return (
    <>
      <Grid>
        <div className="grid-item grid-item__half--left">
          <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        </div>
        <div className="grid-item grid-item__half--right">
          <h1 className="title">{product.title}</h1>
          <p className="subtitle is-4">${firstVariant.price}</p>
          <p>{product.description}</p>
          <AddToCart
            variantId={firstVariant.shopifyId}
            toggleCartOpen={toggleCartOpen}
          />
        </div>
      </Grid>
    </>
  )
}

export default ProductDetailTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      handle
      title
      productType
      description
      variants {
        id
        shopifyId
        title
        price
        sku
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
`
