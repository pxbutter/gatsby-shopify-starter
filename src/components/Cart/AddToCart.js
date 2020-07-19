import React, { useContext, useState } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({
  variantId,
  variants,
  selectedVariantPriceFromChild,
  toggleCartOpen,
  showQty,
}) => {
  const { addProductToCart } = useContext(StoreContext)
  const [selectedVariantId, setSelectedVariantId] = useState(variantId)
  const [selectedQty, setSelectedQty] = useState(1)
  let qtyArr = Array.from(Array(10), (_, i) => i + 1)

  console.log("variants", variants)

  return (
    <>
      {variants && (
        <select
          name="variant"
          id="variant"
          onChange={event => {
            setSelectedVariantId(event.target.value)
            const selectedVariantPrice =
              event.target.options[event.target.selectedIndex].dataset
                .variantPrice
            if (selectedVariantPriceFromChild) {
              selectedVariantPriceFromChild(selectedVariantPrice)
            }
          }}
        >
          {variants.map(variant => {
            return (
              <option
                key={variant.shopifyId}
                value={variant.shopifyId}
                data-variant-price={variant.price}
                disabled={!variant.availableForSale}
              >
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
            setSelectedQty(parseInt(event.target.value))
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
          addProductToCart(selectedVariantId, selectedQty)
          toggleCartOpen()
        }}
      >
        {/* {currentVariantAvailable ? "Add To Cart" : "Soldout"} */}
        Add
      </button>
    </>
  )
}

export default AddToCart
