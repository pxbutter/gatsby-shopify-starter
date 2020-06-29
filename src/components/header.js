import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import Logo from "../assets/logo.svg"
import Sun from "../assets/icon-sun.svg"
import Moon from "../assets/icon-moon.svg"

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

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <Link to="/">
      <Logo />
    </Link>
    <div>
      <Link to="/contact">CONTACT</Link>
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
    {/* <h1 style={{ margin: 0 }}>
      <Link to="/">{siteTitle}</Link>
    </h1> */}
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
