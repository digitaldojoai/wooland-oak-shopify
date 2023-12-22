/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'

class YouMayLike extends Component {
  render ({content}) {
    const {
      products,
      title
    } = content.fields
    return (
      <section className='bgw product__related'>
        <div className='rel f aic jcc px2'>
          <div className='container rel fill-h'>
            <div className='outer container--c container--l ac'>
              <h4 className='serif mb0'>{title}</h4>
              <Flex wrap className='ac' justifyContent={`center`} gutter={2}>
                {products.map((product, i) => {
                  const {
                    variants,
                    productName,
                    productSubheader,
                    productShortDescription,
                    slug,
                    image,
                    shopTheStoryImage
                  } = product.fields
                  return (
                    <Box width={[
                      1,
                      [600, 1 / 2],
                      [900, 1 / 3]
                    ]} className='ac px2 rel product__related_single'>
                      <a href={`/products/${slug}`} className='abs fill-h fill-v fill z1' />
                      {shopTheStoryImage ? (
                        <img src={shopTheStoryImage.fields.file.url} />
                      ) : (
                        <img src={image[0].fields.file.url} />
                      )}
                      <p className='serif p4 px0 mx0'>{productName}</p>
                      {variants[0].fields.variantDiscountedPrice ? (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantDiscountedPrice} <span className='cm'> - Original price  ${variants[0].fields.variantPrice}</span></p>
                      ) : (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantPrice}</p>
                      )}
                      <hr className='cggb mha' style={{maxWidth: '60%'}} />
                      <div className='pv1 mh2'>
                        {variants ? (
                          <p className='caps cgd s1 medium px0 mb0 mt0'>Available in {variants.length} Colors</p>
                        ) : (
                          <p className='caps cgd s1 medium px0 mb0 mt0'>Available in 1 Color</p>
                        )}
                        <p className='sans s1 caps medium px0 cgd mx0'>{productSubheader}</p>
                        <p className='sans s1 caps medium px0 cgd mx0'>{productShortDescription}</p>
                      </div>
                    </Box>
                  )
                })}
              </Flex>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default YouMayLike
