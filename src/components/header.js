import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import Logo from "../assets/logo.svg"
import Sun from "../assets/icon-sun.svg"
import Moon from "../assets/icon-moon.svg"

import { StoreContext } from "../context/StoreContext"
import Cart from "./Cart/Cart"

const HeaderWrapper = styled.header`
  padding: var(--gs);

  input {
    display: none;
  }

  .theme-toggler--wrapper {
    position: relative;
    cursor: pointer;
  }
  .icon-sun {
    position: absolute;
    left: 0px;
    width: 20px;
    height: 20px;
    opacity: 0;
    transform: rotate(0deg);
    transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0s,
      transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;

    body.dark & {
      opacity: 1;
      transform: rotate(360deg);
    }
  }
  .icon-moon {
    position: absolute;
    left: 0px;
    width: 20px;
    height: 20px;
    opacity: 1;
    transform: rotate(360deg);
    transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0s,
      transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;

    body.dark & {
      opacity: 0;
      transform: rotate(0deg);
    }
  }
`

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(StoreContext)
  let qty = 0;
  if (checkout && checkout.lineItems !== undefined) {
    qty = checkout.lineItems.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  }
  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <Link to="/collection/all">Shop</Link>
        <Link to="/#">Blog</Link>
        <Link to="/#">About</Link>
        <Link to="/#">Contact Us</Link>
      </div>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />
            <div className="theme-toggler--wrapper">
              <Sun />
              <Moon />
            </div>
          </label>
        )}
      </ThemeToggler>
      <button onClick={toggleCartOpen}>
        {qty > 0 && (
          <div
            style={{
              borderRadius: 15,
              textAlign: "center",
              height: 30,
              top: -5,
              right: -5,
              width: 30,
              lineHeight: "30px",
            }}
          >
            {qty}
          </div>
        )}
        {/* <CartIcon /> */}
      </button>
      <Cart isCartOpen={isCartOpen} />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
