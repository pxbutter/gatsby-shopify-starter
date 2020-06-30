import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId, toggleCartOpen }) => {
  const { addProductToCart } = useContext(StoreContext)
  return (
    <button
      className="button is-primary is-rounded"
      onClick={() => { addProductToCart(variantId); toggleCartOpen()}}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart
