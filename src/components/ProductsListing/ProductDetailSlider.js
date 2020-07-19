import React from "react"
import Image from "gatsby-image"

const ProductDetailSlider = ({ images }) => {
  return (
    <div>
      {images.map(img => {
        return (
          <Image key={img.id} fluid={img.localFile.childImageSharp.fluid} />
        )
      })}
    </div>
  )
}

export default ProductDetailSlider
