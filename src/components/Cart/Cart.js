import React, { useContext, useState } from "react"
import { motion } from "framer-motion"
import { StoreContext } from "../../context/StoreContext"

const Cart = ({ isCartOpen }) => {
  const {
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    updateLineItem,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)
  const [coupon, setCoupon] = useState("")
  let qtyArr = Array.from(Array(10), (_, i) => i + 1)

  // Adds more select options to line item quantity selector if large quantities required
  checkout.lineItems.map(item => {
    if (item.quantity > 8) {
      qtyArr = Array.from(
        Array(Math.ceil(item.quantity / 10) * 10 + 10),
        (_, i) => i + 1
      )
    }
  })

  const cartDrawerVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        ease: [0.2, 0.8, 0.2, 1],
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: "200%",
      transition: {
        ease: [0.2, 0.8, 0.2, 1],
        duration: 0.9,
      },
    },
  }

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        // delay: 0.2,
        ease: [0.2, 0.8, 0.2, 1],
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        delay: 0.2,
        ease: [0.2, 0.8, 0.2, 1],
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <motion.div
        className="cart"
        animate={isCartOpen ? "open" : "closed"}
        variants={cartDrawerVariants}
        style={{
          zIndex: 100,
          position: "fixed",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          transform: "translateX(200%)",
          padding: "40px 2%",
          boxShadow:
            "0 4px 16px rgba(17, 17, 26, 0.05), 0 8px 32px rgba(17, 17, 26, 0.05)",
        }}
      >
        <button
          onClick={toggleCartOpen}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          Close Cart
        </button>
        <h3 className="title">Cart</h3>
        {checkout.lineItems.length > 0 ? (
          <>
            {checkout.lineItems.map(item => {
              return (
                <div
                  key={item.id}
                  style={{ display: "flex", marginBottom: "2rem" }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      overflow: "hidden",
                      marginRight: 10,
                    }}
                  >
                    <img src={item.variant.image.src} alt="" />
                  </div>
                  <div>
                    <h4 className="title is-4">{item.title}</h4>
                    <p>${item.variant.price}</p>
                    <select
                      name="qty"
                      id="qty"
                      value={item.quantity}
                      onChange={event =>
                        updateLineItem(item.id, parseInt(event.target.value))
                      }
                    >
                      {qtyArr.map(val => {
                        return (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        )
                      })}
                    </select>
                    <button
                      onClick={() => removeProductFromCart(item.id)}
                      className="is-small button is-danger is-outlined"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}

            <div>
              {checkout.discountApplications.length > 0 ? (
                <p>
                  Coupon:
                  <h5 className="title">
                    {checkout.discountApplications[0].code} -{" "}
                    {checkout.discountApplications[0].value.percentage}% off
                  </h5>
                  <button
                    onClick={() =>
                      removeCoupon(checkout.discountApplications[0].code)
                    }
                    className="is-small button is-danger is-outlined"
                  >
                    Remove
                  </button>
                </p>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    checkCoupon(coupon)
                  }}
                >
                  <div className="field">
                    <label htmlFor="coupon" className="label">
                      Coupon
                    </label>
                    <input
                      className="input"
                      id="coupon"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      type="text"
                    />
                  </div>
                  <button className="button">Add Coupon</button>
                </form>
              )}
            </div>
            <hr />
            <div>
              Total: <h5 className="title">${checkout.totalPrice}</h5>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <a href={checkout.webUrl}>Checkout Now</a>
            </div>
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </motion.div>
      <motion.div
        role="button"
        onClick={toggleCartOpen}
        animate={isCartOpen ? "open" : "closed"}
        variants={overlayVariants}
        style={{
          zIndex: 99,
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.6)",
          transform: isCartOpen ? "scale(1)" : "scale(0)",
        }}
      />
    </>
  )
}

// left: isOpen ? 0 : 100

export default Cart
