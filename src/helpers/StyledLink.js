import styled from "styled-components"
import { Link } from "gatsby"

export default styled(Link)`
  position: relative;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (hover: hover) {
    &:hover,
    &:focus,
    &:active {
      color: var(--link-hover);
    }
  }
`
