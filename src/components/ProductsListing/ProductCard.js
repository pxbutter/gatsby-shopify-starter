import React, { useContext } from "react"
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
  return (
    <article>
      <Link
        to={`/product/${product.handle}`}
        style={{ display: "block", marginBottom: "2rem" }}
      >
        <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        <h3 className="title is-3">{product.title}</h3>
        <p className="subtitle is-4">${firstVariant.price}</p>
      </Link>
      <AddToCart
        variantId={firstVariant.shopifyId}
        toggleCartOpen={toggleCartOpen}
      />
    </article>
  )
}

export default ProductCard
