// Gatsby supports TypeScript natively!
import React from "react"
import StyledLink from "../helpers/StyledLink"

import SEO from "../components/seo"

const PageTwo = () => (
  <>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <StyledLink to="/">Go back to the homepage</StyledLink>
  </>
)

export default PageTwo
