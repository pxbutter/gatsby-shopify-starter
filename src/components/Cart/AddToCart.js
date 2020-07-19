import React, { useContext, useState, useEffect } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({
  firstVariant,
  variants,
  selectedVariantPriceFromChild,
  toggleCartOpen,
  showQty,
}) => {
  const { addProductToCart } = useContext(StoreContext)

  const [initVariantId, setInitVariantId] = useState(firstVariant.shopifyId)
  const [initVariantPrice, setInitVariantPrice] = useState(firstVariant.price)

  // Get first available variant and set in state
  useEffect(() => {
    if (variants != null) {
      variants.find(variant => {
        if (variant.availableForSale === true) {
          setInitVariantId(variant.shopifyId)
          setInitVariantPrice(variant.price)
        }
        return variant.availableForSale === true
      })
    }
  }, [])
  selectedVariantPriceFromChild(initVariantPrice)

  const [selectedVariantId, setSelectedVariantId] = useState(null)

  const [selectedQty, setSelectedQty] = useState(1)
  let qtyArr = Array.from(Array(10), (_, i) => i + 1)

  return (
    <>
      {variants && (
        <select
          name="variant"
          id="variant"
          onChange={event => {
            setSelectedVariantId(event.target.value)
            setInitVariantPrice(
              event.target.options[event.target.selectedIndex].dataset
                .variantPrice
            )
            if (selectedVariantPriceFromChild) {
              selectedVariantPriceFromChild(initVariantPrice)
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
          addProductToCart(
            selectedVariantId != null ? selectedVariantId : initVariantId,
            selectedQty
          )
          toggleCartOpen()
        }}
      >
        {/* {firstVariant.availableForSale ? "Add To Cart" : "Soldout"} */}
        Add To Cart
      </button>
    </>
  )
}

export default AddToCart
