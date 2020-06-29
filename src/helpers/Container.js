import React from "react"
import styled from "styled-components"

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: var(--gs);
  padding-right: var(--gs);
`

export default ({ children }) => (
  <Container className="container">{children}</Container>
)
