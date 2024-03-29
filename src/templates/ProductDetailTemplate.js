import React, { useContext, useState } from "react"
import { graphql } from "gatsby"
import { StoreContext } from "../context/StoreContext"
import ProductDetailSlider from "../components/ProductsListing/ProductDetailSlider"
import AddToCart from "../components/Cart/AddToCart"
import Grid from "../helpers/Grid"

const ProductDetailTemplate = ({ data }) => {
  const { toggleCartOpen } = useContext(StoreContext)
  const { shopifyProduct: product } = data
  const {
    variants: [firstVariant],
  } = product

  const [currentPrice, setCurrentPrice] = useState(firstVariant.price)
  // Get currently selected variant price from child component callback function
  const selectedVariantPriceFromChild = dataFromChild => {
    setCurrentPrice(dataFromChild)
  }

  return (
    <>
      <Grid>
        <div className="grid-item grid-item__half--left">
          <ProductDetailSlider images={product.images} />
        </div>
        <div className="grid-item grid-item__half--right">
          <h1 className="title">{product.title}</h1>
          <p className="subtitle is-4">${currentPrice}</p>
          <p>{product.description}</p>
          <AddToCart
            firstVariant={firstVariant}
            variants={product.variants.length >= 2 ? product.variants : null}
            selectedVariantPriceFromChild={selectedVariantPriceFromChild}
            toggleCartOpen={toggleCartOpen}
            showQty={true}
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
