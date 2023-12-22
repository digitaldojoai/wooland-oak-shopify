/** @jsx h */
/* eslint-disable */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import Button from 'components/button'
import cx from 'classnames'
import _ from 'lodash'
import srraf from 'srraf'
import jump from 'jump.js'
/* eslint-enable */

import scrollMonitor from 'scrollMonitor'

class ProductGrid extends Component {
  renderProducts (content) {
    const type = content.gridType
    switch (type) {
      case 'compact':
        return <ColumnGrid {...content} />
      case 'full':
        return <FullGrid {...content} />
      case 'featured':
        return <FeaturedGrid {...content} />
    }
  }
  render ({content}) {
    return (
      <section>
        { this.renderProducts(content.fields) }
      </section>
    )
  }
}

const handleMaterial = (material) => {
  switch (material) {
    case 'leather':
      return 'Full Grain Leather'
    case 'canvas':
      return 'Canvas'
    case 'nylon':
      return 'Water-resistant Nylon'
    default:
      return ''
  }
}

export default ProductGrid

class FeaturedGrid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      videoOpen: false
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.monitorFixed()
    }, 1000)
    const jumps = document.querySelector('.js-jumps')
    srraf((...args) => {
      const [ { y, py } ] = args
      if (py > y) {
        if (y > 50) {
          jumps.classList.remove('stick-hide')
        } else {
          jumps.classList.add('stick-hide')
        }
      } else {
        if (y > 50) {
          jumps.classList.add('stick-hide')
        }
      }
    })
    let hash = window.location.hash.substring(1)
    if (hash) {
      console.log('hey hashy', hash)
      setTimeout(() => {
        switch (hash) {
          case 'backpacks':
            jump('.js-featured', { offset: -74 })
            break
          case 'handbags':
            jump('.js-handbags', { offset: -74 })
            break
          case 'duffles':
            jump('.js-duffles', { offset: -74 })
            break
          case 'accessories':
            jump('.js-accessories', { offset: -74 })
            break
        }
      }, 1000)
    }
  }
  openVideo () {
    this.setState({
      videoOpen: !this.state.videoOpen
    })
    const video = document.querySelector('.js-video')
    if (video && this.state.videoOpen) {
      video.play()
    }
  }
  monitorFixed () {
    const self = this
    let featured = document.querySelector('.js-featured-monitor')
    let handbag = document.querySelector('.js-handbag-monitor')
    let duffle = document.querySelector('.js-duffle-monitor')
    let accessories = document.querySelector('.js-accessories-monitor')

    if (featured) {
      const featuredMonitor = scrollMonitor.create(featured, {top: 100})
      featuredMonitor.lock()

      featuredMonitor.stateChange(() => {
        if (featuredMonitor.isAboveViewport) {
          self.setState({ fixBar: 'fixed' })
        } else {
          this.setState({ fixBar: '' })
        }
      })

      featuredMonitor.fullyEnterViewport(() => {
        self.setState({ active: 0 })
        console.log('setState featured')
      })

      const handbagMonitor = scrollMonitor.create(handbag, {top: 100})
      // handbagMonitor.lock()

      handbagMonitor.fullyEnterViewport(() => {
        self.setState({ active: 1 })
        console.log('setState handbag')
      })

      const duffleMonitor = scrollMonitor.create(duffle, {top: 100})
      // duffleMonitor.lock()

      duffleMonitor.fullyEnterViewport(() => {
        self.setState({ active: 2 })
        console.log('setState duffle')
      })

      const accessoriesMonitor = scrollMonitor.create(accessories, {top: 100})
      // accessoriesMonitor.lock()

      accessoriesMonitor.fullyEnterViewport(() => {
        self.setState({ active: 3 })
        console.log('setState accessories')
      })
    }
  }

  handleMaterial (material) {
    switch (material) {
      case 'leather':
        return 'Full Grain Leather'
      case 'canvas':
        return 'Canvas'
      case 'nylon':
        return 'Water-resistant Nylon'
      default:
        return ''
    }
  }

  handleJump (destination, clean) {
    jump(destination, { offset: -74 })
    window.history.pushState(null, null, '#' + clean)
  }

  render ({ type, title, gridType, products, videoModule, videoOpen }) {
    // const featured = _.take(products, 1)
    // const sets = _.slice(products, [1])

    return (
      <div className='rel'>
        <div className={`bgw product__jumps fixed js-jumps`}>
          <div className='product__jumps-inner f aic jcc  fill-h'>
            <h5 onClick={() => this.handleJump('.js-featured', 'backpacks')} className={`caps bold s5 mh2 ${this.state.active === 0 ? 'active' : null}`}>Backpacks</h5>
            <h5 onClick={() => this.handleJump('.js-handbags', 'handbags')} className={`caps bold s5 mh2 ${this.state.active === 1 ? 'active' : null}`}>Handbags</h5>
            <h5 onClick={() => this.handleJump('.js-duffles', 'duffles')} className={`caps bold s5 mh2 ${this.state.active === 2 ? 'active' : null}`}>Duffles</h5>
            <h5 onClick={() => this.handleJump('.js-accessories', 'accessories')} className={`caps bold s5 mh2 ${this.state.active === 3 ? 'active' : null}`}>Accessories</h5>
          </div>
        </div>
        <div className='bgw product__grid product__grid_featured js-featured js-featured-monitor'>
          <div className='px1 co bgg ac'>
            <h4 class='mx0 px1 ph2'>{title}</h4>
          </div>
          <div className='ph2 container--xl container--c mt0 pt1'>
            {/* {featured.map((product, i) => {
              const {
                variants,
                productName,
                slug,
                image,
                productSubheader,
                productShortDescription
              } = product
              return (
                <Flex wrap gutter={2} alignItems={`center`} className='px2'>
                  <Box width={[1, [800, 2 / 3]]} className='rel'>

                    <a href={`/products/${slug}`} className='abs fill-h fill-v fill' />
                    {image[0].fields && (<img src={image[0].fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:f9f9f9'} />)}
                  </Box>
                  <Box width={[1, [800, 1 / 3]]} className='al px2'>
                    <div className=' product__full_desc'>
                      <a href={`/products/${slug}`} className='abs fill-h fill-v fill' />
                      <p className='serif h4 px0 mx0'>{productName}</p>
                      {variants[0].fields.variantDiscountedPrice ? (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantDiscountedPrice} <span className='cm'> - Original price  ${variants[0].fields.variantPrice}</span></p>
                      ) : (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantPrice}</p>
                      )}
                      <hr className='cggb' />
                      <p className='caps medium cgd s1 px0 pt1 mv0'>Available in {variants.length} Colors</p>
                      {productSubheader && (
                        <p className='caps medium cgd s1 px0 mv0 '>{productSubheader}</p>
                      )}
                      {productShortDescription && (
                        <p className='caps medium cgd s1 px0 mv0'>{productShortDescription}</p>
                      )}
                      <div className='mt2 m__button'>
                        {Button({
                          url: `/products/${slug}`,
                          cta: `Shop ${productName}`,
                          outline: true
                        })}
                      </div>
                    </div>
                  </Box>
                </Flex>
              )
            })} */}
            {/* <div>
              <div>
                <div className='rel product__grid_connect mv1 pb2'>
                  <div className='mha bgw drop-shadow rel z1' style={{maxWidth: '570px', cursor: 'pointer'}}>
                    <div className='f jcs aic relative' ontouchstart={() => this.openVideo()} onClick={() => this.openVideo()}>
                      <img src={videoModule.fields.imageFallback.fields.file.url} />
                      <div className='ml1'>
                        <div className='product__grid_connect_play bgo' />
                      </div>
                      <div className='s16 product__grid_connect_text' dangerouslySetInnerHTML={{ __html: marked(videoModule.fields.text) }} />
                    </div>
                  </div>
                  <hr className='bggb product__grid_connect_bar z0 abs fill-h' />
                </div>
                <div className={`product__grid_connect_video aic jcc f ${this.state.videoOpen ? 'visible' : null}`}>
                  <div className='rel product__video'>
                    <video className={`js-video`} loop poster={videoModule.fields.imageFallback.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:f9f9f9'} src={videoModule.fields.video.fields.file.url} />
                    <div class='ac'>
                      <div className='cw caps s16 mt05 bold pointer' onClick={() => this.openVideo()}>Close Video</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='mt1 pt1'>
              <div className=''>
                {products.map((product, i) => {
                  const {
                    variants,
                    productName,
                    productSubheader,
                    productShortDescription
                  } = product
                  return (
                    <div className='pv1 product__grid-block'>
                      <div className='f jcs fw aic fill-h mb1 pb1'>
                        <h4 className='serif mx0 px0 p4 mr1 fill-h product__grid-title'>{productName}</h4> <p className='mx0 px0'>{productShortDescription} - {productSubheader}</p>
                      </div>
                      <ProductSlides variants={variants} product={product} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ProductSlides extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      slideshow: null
    }
  }
  componentDidMount () {
    const Flickity = require('flickity')
    const flky = new Flickity(this.slideshow, {
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      watchCSS: true,
      groupCells: true,
      // draggable: false,
      wrapAround: false,
      cellAlign: 'left'
    })
    this.setState({
      slideshow: flky
    })
    flky.on('change', (index) => {
      this.setState({
        slide: index
      })
    })
    setTimeout(() => {
      flky.resize()
    }, 300)
    setTimeout(() => {
      flky.resize()
    }, 1000)
    setTimeout(() => {
      flky.resize()
    }, 1500)
  }
  slide (direction) {
    switch (direction) {
      case 'left':
        this.state.slideshow.previous()
        break
      case 'right':
        this.state.slideshow.next()
        break
    }
  }
  /* eslint-disable */
  render () {
    const {
      variants,
      product
    } = this.props
    const {
      productName,
      slug,
      image
    } = product
    return (
      <div className={cx(`fill-h rel product__grid_slideshow ${slug}`, {
        'two__count': variants.length === 2,
        'three__count': variants.length === 3
      })}>
        <div className='product__image_controls_l product__image_controls z3' onclick={() => this.slide('left')}>
          <div className='product__image_controls_arrow' />
        </div>
        <div className='product__image_controls_r product__image_controls z3' onclick={() => this.slide('right')}>
          <div className='product__image_controls_arrow' />
        </div>
        <div className='fill-h product__grid_slideshow-wrapper' ref={slideshow => { this.slideshow = slideshow }}>
          {variants.map((variant, i) => (
            <div className={`mr15 product__grid_single m_s ${slug}`}>
              <a href={`/products/${slug}#${i}`} className='abs fill-h z2 fill-v fill' />
              {image[0].fields && (
                <div className='rel'>
                  {variant.fields.variantCLPHover && (<div className='grid__hidden abs fill fit-x'><img src={variant.fields.variantCLPHover.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:ffffff'} /></div>)}
                  <img src={variant.fields.variantCLPImage.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:f9f9f9'} />
                </div>
              )}
              <div className='f jcb aic'>
                <div>
                  {/* <p className='p1 px0 mx0'>{productName}</p> */}
                  <p className='s1 cgd mx0 px0'>{handleMaterial(variant.fields.material)}</p>
                  {/* <span className='cgd  px0 mt0 pt0 small'>
                    Available in {variants.length}  Colors<br />
                  </span> */}
                </div>
                {variant.fields.variantDiscountedPrice ? (
                  <p className='sans s1 pt05 medium px0 pb0 mx0'>${variant.fields.variantDiscountedPrice} <span className='cm'> - Original price  ${variant.fields.variantPrice}</span></p>
                ) : (
                  <p className='sans s1 pt05 medium px0 pb0 mx0'>${variant.fields.variantPrice}</p>
                )}
              </div>
              <div className='pt0 pb15 al' />
              {/* <a href={`/products/${slug}`} className='s5 sans caps bold co product__grid_link'>Shop {productName}</a> */}
            </div>
            )
          )}
        </div>
      </div>
    )
  }
  /* eslint-enable */
}

class FullGrid extends Component {
  render ({ type, title, slug, gridType, products }) {
    let jsType = 'js-handbags js-handbag-monitor'
    products.forEach(product => {
      if (product.slug === 'duffle-suitcase-20') {
        jsType = 'js-duffles js-duffle-monitor'
      }
    })
    return (
      <div className={`bgw product__grid ${jsType} js-${slug}`}>
        <div className='px1 co bgg ac'>
          <h4 class='mx0 px1 ph2'>{title}</h4>
        </div>
        <div className='ph2 container--xl container--c mt0 pt1'>
          <div className='mt1 pt1'>
            <div className=''>
              {products.map((product, i) => {
                const {
                  variants,
                  productName,
                  productSubheader,
                  productShortDescription
                } = product
                return (
                  <div className='pv1 product__grid-block'>
                    <div className='f fw jcs aic fill-h mb1 pb1'>
                      <h4 className='serif mx0 px0 p4 mr1 product__grid-title'>{productName}</h4> <p className='mx0 px0'>{productShortDescription} - {productSubheader}</p>
                    </div>
                    <ProductSlides variants={variants} product={product} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// class FullGrid extends Component {
//   render ({ type, title, gridType, products }) {
//     return (
//       <div className='bgw product__grid js-stand'>
//         <div className=' container--xl container--c'>
//           {products.map((product, i) => {
//             let order = []
//             const {
//               variants,
//               productName,
//               slug,
//               image,
//               productSubheader,
//               collectionHover,
//               productShortDescription
//             } = product
//             if ((i + 1) % 2) {
//               order = [-1, [900, 1]]
//             } else {
//               order = [-1]
//             }
//             return (
//               <Flex wrap gutter={2} alignItems={`center`} className='px2 product__grid_item'>
//                 <Box width={[1, [800, 3 / 5]]} order={order} className='rel'>
//                   {image[0].fields && (
//                     <div className='rel'>
//                       <a href={`/products/${slug}`} className='abs fill-h fill-v fill z1' />
//                       {collectionHover && (<div className='grid__hidden abs fill fit-x'><img src={collectionHover.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:ffffff'} /></div>)}
//                       <img src={image[0].fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:ffffff'} />
//                     </div>
//                   )}
//                 </Box>
//                 <Box width={[1, [800, 2 / 5]]} className='al px2'>
//                   <div className=' product__full_desc'>
//                     <a href={`/products/${slug}`} className='abs fill-h fill-v fill' />
//                     <p className='serif h4 px0 mx0'>{productName}</p>
//                     {variants[0].fields.variantDiscountedPrice ? (
//                       <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantDiscountedPrice} <span className='cm'> - Original price  ${variants[0].fields.variantPrice}</span></p>
//                     ) : (
//                       <p className='sans s1 pt05 medium px0 pb1 mx0'>${variants[0].fields.variantPrice}</p>
//                     )}
//                     <hr className='cggb' />
//                     <p className='caps cgd s1 px0 pt1 mv0'>Available in {variants.length} Colors</p>
//                     {productSubheader && (
//                       <p className='caps cgd s1 px0 mv0'>{productSubheader}</p>
//                     )}
//                     {productShortDescription && (
//                       <p className='caps cgd s1 px0 mv0'>{productShortDescription}</p>
//                     )}
//                     <div className='mt2 m__button'>
//                       {Button({
//                         url: `/products/${slug}`,
//                         cta: `Shop ${productName}`,
//                         outline: true
//                       })}
//                     </div>
//                   </div>
//                 </Box>
//               </Flex>
//             )
//           })}
//         </div>
//       </div>
//     )
//   }
// }

class ColumnGrid extends Component {
  render ({ type, title, slug, gridType, products }) {
    let items = []
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        let productItem = {
          slug: product.slug,
          productName: product.productName,
          image: product.image,
          variants: product.variants,
          variant: variant
        }
        items.push(productItem)
      })
    })
    /* eslint-disable */
    return (
      <div className={`bgw ac product__grid js-accessories js-accessories-monitor`}>
        <div className='px1 co bgg ac'>
          <h4 class='mx0 px1 ph2'>{title}</h4>
        </div>
        <div className='container--xl container--c ph05 mt2'>
          <Flex wrap className='ac ph15' gutter={2}>
            {items.map((product, i) => {
              const {
                variant,
                productName,
                slug,
                variants,
                image
              } = product
              return (
                <Box width={[1, [500, 1 / 2], [800, 1 / 3]]} className='al px075'>
                  <div className='mr15 product__grid_single m_s rel'>
                    <a href={`/products/${slug}`} className='abs z1 fill-h fill-v fill' />
                    {image[0].fields && (
                      <div className='rel'>
                        {variant.fields.variantCLPHover && (<div className='grid__hidden abs fill fit-x'><img src={variant.fields.variantCLPHover.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:ffffff'} /></div>)}
                        <img src={variant.fields.variantCLPImage.fields.file.url + '?fm=jpg&fl=progressive&q=70&bg=rgb:f9f9f9'} />
                      </div>
                    )}
                    <div className='f jcb aic'>
                      <div>
                        <p className='p1 px0 mx0'>{productName}</p>
                        <p className='s1 cgd mx0 px0'>{handleMaterial(variant.fields.material)}</p>
                      </div>
                      {variant.fields.variantDiscountedPrice ? (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variant.fields.variantDiscountedPrice} <span className='cm'> - Original price  ${variant.fields.variantPrice}</span></p>
                      ) : (
                        <p className='sans s1 pt05 medium px0 pb1 mx0'>${variant.fields.variantPrice}</p>
                      )}
                    </div>
                    {/* <div className='pv1 al'>
                      <p className='cgd  px0 mt0 pt0 small'>
                        Available in {variants.length}  Colors<br />
                      </p>
                    </div> */}
                    {/* <a href={`/products/${slug}`} className='s5 sans caps bold co product__grid_link'>Shop {productName}</a> */}
                  </div>
                </Box>
              )
            })}
          </Flex>
        </div>
      </div>
    )
    /* eslint-enable */
  }
}
