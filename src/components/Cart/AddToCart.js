import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId, variants, toggleCartOpen, showQty }) => {
  const { addProductToCart } = useContext(StoreContext)
  let selectedVariantId = variantId
  let qtyArr = Array.from(Array(10), (_, i) => i + 1)
  let qty = 1

  return (
    <>
      {variants && (
        <select
          name="variant"
          id="variant"
          onChange={event => {
            selectedVariantId = event.target.value
          }}
        >
          {variants.map(variant => {
            return (
              <option key={variant.shopifyId} value={variant.shopifyId}>
                {variant.title}
              </option>
            )
          })}
        </select>
      )}
      {showQty && (
        <select
          name="qty"
          id="qty"
          onChange={event => {
            qty = parseInt(event.target.value)
          }}
        >
          {qtyArr.map(val => {
            return (
              <option key={val} value={val}>
                {val}
              </option>
            )
          })}
        </select>
      )}

      <button
        className="button is-primary is-rounded"
        onClick={() => {
          addProductToCart(selectedVariantId, qty)
          toggleCartOpen()
        }}
      >
        Add To Cart
      </button>
    </>
  )
}

export default AddToCart
