import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { StoreContext } from "../../context/StoreContext"
import AddToCart from "../Cart/AddToCart"

const ProductCard = ({ product }) => {
  const { toggleCartOpen } = useContext(StoreContext)
  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  const variantPricesMatch = product.variants.every(
    (val, i, arr) => val === arr[0]
  )

  const [currentPrice, setCurrentPrice] = useState(firstVariant.price)
  // Get currently selected variant price from child component callback
  const selectedVariantPriceFromChild = dataFromChild => {
    setCurrentPrice(dataFromChild)
  }

  return (
    <article>
      <Link
        to={`/product/${product.handle}`}
        style={{ display: "block", marginBottom: "2rem" }}
      >
        <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        <h3 className="title is-3">{product.title}</h3>
        <p className="subtitle is-4">
          {variantPricesMatch ? "" : "From "}${currentPrice}
        </p>
      </Link>
      <AddToCart
        firstVariant={firstVariant}
        variants={product.variants.length >= 2 ? product.variants : null}
        selectedVariantPriceFromChild={selectedVariantPriceFromChild}
        toggleCartOpen={toggleCartOpen}
        showQty={true}
      />
    </article>
  )
}

export default ProductCard
