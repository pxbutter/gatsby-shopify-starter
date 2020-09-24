import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: `${process.env.SHOPIFY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.SHOPIFY_API_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  updateLineItem: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

// Check if it's a browser
const isBrowser = typeof window !== "undefined"

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout)
  const [isCartOpen, setCartOpen] = useState(false)
  // const [isLoading, setLoading] = useState(false)

  const toggleCartOpen = () => setCartOpen(!isCartOpen)

  // run init checkout on mount
  useEffect(() => {
    initializeCheckout()
  }, [isCartOpen])

  // get new checkout ID if one does not exist in local storage
  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }
      return newCheckout
    } catch (e) {
      console.error(e)
    }
  }

  // create new checkout
  const initializeCheckout = async () => {
    try {
      // Check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      // check if current checkout exists in local storage
      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout === null || newCheckout.completedAt !== null) {
          newCheckout = await getNewId()
        }
      } else {
        // If id does not, create new checkout
        newCheckout = await getNewId()
      }

      // Set checkout to state
      setCheckout(newCheckout)
    } catch (e) {
      console.error(e)
    }
  }

  const addProductToCart = async (variantId, qty) => {
    try {
      // setLoading(true)
      const lineItems = [
        {
          variantId,
          quantity: qty,
        },
      ]
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      setCheckout(newCheckout)
      // Buy Now Button Code
      // window.open(newCheckout.webUrl, "_blank")
      // setLoading(false)
    } catch (e) {
      // setLoading(false)
      console.error(e)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      // setLoading(true)
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])
      setCheckout(newCheckout)
      // setLoading(false)
    } catch (e) {
      // setLoading(false)
      console.error(e)
    }
  }

  const updateLineItem = async (lineItemId, qty) => {
    try {
      // setLoading(true)
      const lineItemsToUpdate = [
        {
          id: lineItemId,
          quantity: qty,
        },
      ]
      const newCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      )
      setCheckout(newCheckout)
      // setLoading(false)
    } catch (e) {
      // setLoading(false)
      console.error(e)
    }
  }

  const checkCoupon = async coupon => {
    // setLoading(true)
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
    setCheckout(newCheckout)
    // setLoading(false)
  }

  const removeCoupon = async coupon => {
    // setLoading(true)
    const newCheckout = await client.checkout.removeDiscount(
      checkout.id,
      coupon
    )
    setCheckout(newCheckout)
    // setLoading(false)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        toggleCartOpen,
        isCartOpen,
        removeProductFromCart,
        updateLineItem,
        checkCoupon,
        removeCoupon,
      }}
    >
      {/* isLoading, */}
      {children}
    </StoreContext.Provider>
  )
}
