import React from "react"
import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: var(--gs);
  grid-row-gap: var(--gs);
  padding: 0 var(--gs);
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-width);
`

export default ({ children }) => <Grid className="grid">{children}</Grid>
