/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import { addVariant, addAddOn, removeAddon } from 'slater/cart'
import Hammer from 'hammerjs'
import Popover from 'react-micro-popover'
import marked from 'marked'

// import Lazy from 'relaze'
// import Img from 'components/shared/lazyImage'

const colors = (color) => {
  switch (color) {
    case 'sand':
      return '#CC7544'
    case 'ruby':
      return '#BB3136'
    case 'oak':
      return '#8C493D'
    case 'chocolate':
      return '#4F2F2A'
    case 'navy':
      return '#34415e'
    case 'canvas':
      return '#232323'
    case 'camo':
      return '#363636'
    case 'black':
      return '#000000'
    case 'jet black':
      return '#232323'
    case 'bordeaux':
      return '#833731'
    case 'grey':
      return '#888888'
    case 'midnight black':
      return '#000000'
    case 'oxblood':
      return '#6e1816'
    case 'tote':
      return '#F3E2D1'
    case 'cream':
      return '#dcdcdc'
  }
}

const availabilityPopover = props => {
  return (
    <div className='product__pop_info'>
      <p className='small light px2'>{props.content ? props.content : 'Pre-ordering is a way for us to make better predictions for order quantities on our end and to not overstock. This allows us to keep prices low for you. We cannot make guarantees on delivery dates but promise to give our best to get them to you as soon as possible. As a thank you for your trust &amp; loyalty we offer a special pre-order price.'}</p>
    </div>
  )
}

class ProductHero extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeProduct: this.props.variants[0].fields,
      activeColor: this.props.variants[0].fields.colorSwatch,
      availability: this.props.variants[0].fields.availability,
      activeMaterial: this.props.variants[0].fields.material,
      sizer: this.props.sizer,
      bundle: [],
      detailsOpen: false,
      notifyOpen: false,
      compareOpen: false,
      updated: false,
      productAdded: false,
      formSuccess: false,
      productZoom: false,
      modal: false
    }

    this.updateAddOns = this.updateAddOns.bind(this)
    this.switchMaterial = this.switchMaterial.bind(this)
  }
  updateActiveProduct (i) {
    this.setState({
      activeProduct: this.props.variants[i].fields,
      activeColor: this.props.variants[i].fields.colorSwatch,
      availability: this.props.variants[i].fields.availability,
      bundle: [],
      updated: true
    })
    /* eslint-disable */
    dataLayer.push({
      event: 'colorSelected',
      buttonAction: 'Variant Selected',
      colorSelected: this.props.variants[i].fields.colorSwatch,
      productName: this.props.name
    })
    let hash = this.props.variants[i].fields.variantId
    window.history.pushState(null, null, '#' + i)
    /* eslint-enable */
  }
  updateAddOns (e) {
    let bundle = this.state.bundle

    /* eslint-disable */
    dataLayer.push({
      event: 'bundleClick',
      buttonItem: e,
      buttonActtion: 'Bundle',
      productName: this.props.name
    })
    /* eslint-enable */

    // check if the item exists
    if (bundle.indexOf(e) > -1) {
      bundle.splice(bundle.indexOf(e), 1)
    } else {
      bundle.push(e)
    }
    this.setState({
      bundle: bundle
    })
  }
  componentDidMount () {
    const self = this
    const sizebox = document.getElementById('sizer')
    if (sizebox) {
      this.setState({
        sizer: sizebox.getAttribute('data-sizer')
      })
    }
    const props = this.props
    const state = this.state
    var refreshIntervalId = setInterval(yotpoCheck(), 500)
    function yotpoCheck () {
      /* eslint-disable */
      if (Yotpo) {
        const yotty = document.querySelector('.yotpo')
        if (!yotty) {
          var div = document.createElement('div')
          div.setAttribute('class', 'yotpo yotpo-main-widget container--l mha mt15')
          div.setAttribute('data-product-id', props.root)
          div.setAttribute('data-name', props.name)
          var tsaCheck = document.querySelectorAll('div.wrapper.px2.z1.rel.z1.bgg.tsa')
          var allDayGo = document.querySelectorAll('body#all-day-bag section.bgw.z1.rel.product__video_block')
          if (tsaCheck[0]) {
            tsaCheck[0].appendChild(div)
          } else if (allDayGo[0]) {
            allDayGo[0].appendChild(div)
          } else {
            console.log("yotty can't append")
          }

          var div = document.createElement('div')
          div.setAttribute('class', 'yotpo bottomLine')
          div.setAttribute('data-product-id', props.root)
          var quadCheck = document.querySelectorAll('.product__quad')
          if (quadCheck[0]) {
            quadCheck[0].appendChild(div)
          }

          var api = new Yotpo.API(yotpo)
          api.refreshWidgets()
        }

        clearInterval(refreshIntervalId)
      }
      /* eslint-enable */
    }

    const _learnq = window._learnq || []

    const item = {
      Name: props.name,
      ProductID: props.root,
      ImageURL: props.image[0].fields.file.url,
      Price: state.activeProduct.variantPrice
    }
    _learnq.push(['track', 'Viewed Product', item])
    _learnq.push(['trackViewedItem', {
      Title: props.name,
      ItemId: item.ProductID,
      ImageUrl: item.ImageURL,
      Metadata: {
        Price: item.Price
      }
    }])
    console.log('learn qa page track', _learnq)

    /* eslint-disable */
    KlaviyoSubscribe.attachToForms('#nEmail', {
      hide_form_on_success: true,
      success: () => {
        self.setState({ formSuccess: true })
        setTimeout(() => {
          self.setState({notifyOpen: false})
        }, 2000)
      }
    })
    this.props.variants.forEach(variant => {
      if (variant.fields.material === 'nylon') {
        this.setState({
          nylon: true
        })
      }
    })
    /* eslint-enable */
  }
  componentWillMount () {
    let hash = window.location.hash.substring(1)

    if (hash) {
      this.setState({
        activeProduct: this.props.variants[hash].fields,
        activeColor: this.props.variants[hash].fields.colorSwatch,
        availability: this.props.variants[hash].fields.availability,
        activeMaterial: this.props.variants[hash].fields.material
      })
    }
  }
  addItemsToCart () {
    let product = this.state.activeProduct

    /* eslint-disable */
    dataLayer.push({
      event: 'addItemToCart',
      buttonAction: 'Add To Cart',
      productName: this.props.name,
      ecommerce: {
        add: {
          products: [
            {
              name: this.props.name,
              price: this.props.price
            }
          ]
        }
      }
    })
    addVariant({id: product.variantId}, 1).then(({ item, cart }) => {
      this.setState({
        productAdded: product.variantId
      })
      const _learnq = window._learnq || []
      _learnq.push(['track', 'Added to Cart', item])
      console.log('learn add to cart', _learnq)
    })
  }
  compareOpen () {
    this.setState({
      compareOpen: true
    })
    /* eslint-disable */
    dataLayer.push({
      event: 'compareOpen',
      buttonAction: 'slideOutOpen',
      productName: this.props.name
    })
    /* eslint-enable */
  }
  detailsOpen () {
    this.setState({
      detailsOpen: true
    })
    /* eslint-disable */
    dataLayer.push({
      event: 'detailsOpen',
      buttonAction: 'slideOutOpen',
      productName: this.props.name
    })
    /* eslint-enable */
  }
  notifyOpen () {
    this.setState({
      notifyOpen: true
    })
    /* eslint-disable */
    dataLayer.push({
      event: 'notifyOpen',
      buttonAction: 'slideOutOpen',
      productName: this.props.name
    })
    /* eslint-enable */
  }
  switchMaterial (material) {
    let updateColor = false
    this.props.variants.forEach((varaint, i) => {
      if (updateColor === false) {
        if (varaint.fields.material === material) {
          this.updateActiveProduct(i)
          updateColor = true
        }
      }
    })
    this.setState({
      activeMaterial: material
    })
  }
  render ({ description,
    name,
    price,
    variants,
    image,
    getNotified,
    sizer,
    icons,
    details,
    subDescription,
    productShortDescription,
    compareProducts,
    shopTheStoryImage,
    moduleCtaText
  }) {
    const { availability } = this.state
    const { activeProduct } = this.state

    const {
      variantDiscountedPrice,
      variantPrice,
      getNotifiedMessage,
      availabilityStatus
    } = activeProduct

    return (
      <div>
        <div className={`${this.state.notifyOpen ? 'open' : null} product__slide_out z10`}>
          <div onClick={() => this.setState({notifyOpen: false})} className={`overlay ${this.state.notifyOpen ? 'open' : null}`} />
          <div className='bgw px05 ac rel'>
            <div onClick={() => this.setState({ notifyOpen: false })} className='product__image_controls_l product__image_controls'>
              <div class='product__image_controls_arrow' />
            </div>
            <p className='p2 serif'>Get Notified!</p>
          </div>
          <div className='product__slide_out_info bgg px1'>
            <div className='px1 ac'>
              {/* eslint-disable */}
                <p className='mt2 mb0 s16'>{getNotified ? getNotified : "This product is currently on backorder, get notified when it's back in stock!"}</p>
              {/* eslint-enable */}
              {!this.state.formSuccess ? (
                <form id='nEmail' action='//manage.kmail-lists.com/subscriptions/subscribe' data-ajax-submit='//manage.kmail-lists.com/ajax/subscriptions/subscribe' method='GET' target='_blank' novalidate='novalidate' className='newsletter__form mt2 inline-block mha fill-h'>
                  <input type='hidden' name='g' value='JiebPi' />
                  <div className=' rel'>
                    <input type='email' name='email' className='fill-h sans book small ac' placeholder='Enter your email' />
                    <div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='' tabindex='-1' value='' /></div>
                    <div className='newsletter__valid cm mb1 small'>
                      <span><input type='checkbox' className='mr1' required name='terms' /></span><span className='newsletter__valid_copy rel'>By checking this box you'll receive our newsletter on the newest products and happenings. You can unsubscribe any time you want. <a href='/pages/privacy'>Read more</a> here about how and why we ask for this data.</span>
                    </div>
                    <button type='submit' className='button caps bold sans fill-h mt05'>Submit</button>
                  </div>
                </form>
              ) : (
                <div className='mt2'>You're on the List!</div>
              )}
            </div>
          </div>
        </div>
        <div className={`${this.state.detailsOpen ? 'open' : null} product__slide_out z10`}>
          <div onClick={() => this.setState({detailsOpen: false})} className={`overlay ${this.state.detailsOpen ? 'open' : null}`} />
          <div className='bgw px05 ac rel'>
            <div onClick={() => this.setState({ detailsOpen: false })} className='product__image_controls_l product__image_controls'>
              <div class='product__image_controls_arrow' />
            </div>
            <p className='p2 serif'>Details &amp; Care</p>
          </div>
          <div className='product__slide_out_info bgg px1'>
            {details && (
              <div className='product__slide_out_small' dangerouslySetInnerHTML={{ __html: marked(details) }} />
            )}
          </div>
        </div>
        <div className={`${this.state.compareOpen ? 'open' : null} product__slide_out compare z10`}>
          <div onClick={() => this.setState({compareOpen: false})} className={`overlay ${this.state.compareOpen ? 'open' : null}`} />
          <div className='bgw px05 ac rel'>
            <div onClick={() => this.setState({ compareOpen: false })} className='product__image_controls_l product__image_controls'>
              <div class='product__image_controls_arrow' />
            </div>
            <p className='p2 serif'>Compare Bags</p>
          </div>
          <div className='product__slide_out_info bgg px1'>
            <Flex wrap gutter={[0, [500, 2]]} className='mt2'>
              <Box width={[1, [500, 1 / 2], [1000, 1 / 3]]} className='ac'>
                <div className='product__slide_out_bag aic f jcc mt1'>
                  {shopTheStoryImage && (<img src={shopTheStoryImage.fields.file.url} />)}
                </div>
                <h6 className='serif mb0 mt05'>{name}</h6>
                <div className='mt05'>
                  <p className='sans s1 caps medium px0 cgd mx0'>{subDescription}</p>
                  <p className='sans s1 caps medium px0 cgd mx0'>{productShortDescription}</p>
                </div>
              </Box>
              {compareProducts && compareProducts.map((compare) => {
                const {
                  productName,
                  shopTheStoryImage,
                  productSubheader,
                  productShortDescription,
                  slug
                } = compare.fields

                return (
                  <Box width={[1, [500, 1 / 2], [900, 1 / 3]]} className='ac'>
                    <div className='product__slide_out_bag aic jcc f mt1'>
                      <img src={shopTheStoryImage.fields.file.url} />
                    </div>
                    <h6 className='serif mb0 mt05'>{productName}</h6>
                    <div className='mt05'>
                      <p className='sans s1 caps medium px0 cgd mx0'>{productSubheader}</p>
                      <p className='sans s1 caps medium px0 cgd mx0'>{productShortDescription}</p>
                    </div>
                    <div className='fill-h ac mt0'>
                      <a href={`/products/${slug}`} className='s5 mt1 mb2 caps bold co px1'>Shop {productName}</a>
                    </div>
                  </Box>
                )
              })}
            </Flex>
          </div>
        </div>
        <div className='product__hero pt1 z2 bgg f aic rel'>
          <Flex wrap alignItems={`center`}>
            <Box className='relative' width={[1, [900, '60%']]}>
              <div className='f aic relative'>
                <ProductImages updateZoom={() => this.setState({productZoom: !this.state.productZoom})} product={this.state.activeProduct} name={name} sizer={this.state.sizer} updateModal={() => this.setState({modal: !this.state.modal})} />
              </div>
            </Box>
            <Box width={[1, [900, '40%']]} className='f jcc product__information'>
              <div className='product__description'>
                <div className='product__description_mobile'>
                  <h4 className='serif pb0 mb0 mt0'>{name}</h4>
                  {variantDiscountedPrice ? (
                    <div className='pt05 product__price'>${variantDiscountedPrice} <span className='cm'> - Original price  ${variantPrice}</span></div>
                  ) : (
                    <div className='pt05 product__price'>${variantPrice}</div>
                  )}
                  <div>
                    <div className='small product__quad' style="margin: 4px 0 10px 0; min-height: 20px;">
                      <quadpay-widget amount={variantDiscountedPrice ? variantDiscountedPrice : variantPrice}></quadpay-widget>
                    </div>
                  </div>
                  {activeProduct.variantDescription ? (
                    <div className='light s16 mb1' dangerouslySetInnerHTML={{ __html: marked(activeProduct.variantDescription) }} />
                  ) : (
                    <div className='light s16 mb1' dangerouslySetInnerHTML={{ __html: marked(description) }} />
                  )}
                  <div className='f aic product__c_l'>
                    {details && (
                      <span onClick={() => this.detailsOpen()} className='underline mb1 s1 co pointer'>Details &amp; Care</span>
                    )}
                    {compareProducts && (
                      <span onClick={() => this.compareOpen()} className='underline ml1 s1 mb1 co pointer'>Compare Products</span>
                    )}
                  </div>
                  {activeProduct.availableCopy && (
                    <div className='f product__c_l aic'>
                      <div className='icon__calendar f jcc aic mr05'>
                        <div className='icon__calendar_bars' />
                        <span className='icon__text'>16</span>
                      </div>
                      <p className='s1'>{activeProduct.availableCopy}</p>
                      <span onClick={() => this.notifyOpen()} className='underline mh05 s1 co pointer'>Notify Me</span>
                      <Popover render={availabilityPopover} content={getNotifiedMessage} position={'top'} transitionSpeed={200}>
                        {({ pin, unpin }) => {
                          return (
                            <div onmouseover={e => pin()} onmouseleave={e => unpin()} className='product__pop f aic jcc ml1'>
                              <span>?</span>
                            </div>
                          )
                        }}
                      </Popover>
                    </div>
                  )}

                  {this.state.nylon && (
                    <div className='material__block mb15 mt1'>
                      <div class='button__group'>
                        <div class='bgw f jcc '>
                          <div onClick={() => this.switchMaterial('leather')} class={`button__group_s blue px1 ph2 ${this.state.activeMaterial === 'leather' ? 'bgbb cw' : 'bgw'}`}>
                            <span class='bold caps'>Leather</span>
                          </div>
                          <div onClick={() => this.switchMaterial('nylon')} class={`button__group_s blue px1 ph2 ${this.state.activeMaterial === 'nylon' ? 'bgbb cw' : 'bgw'}`}>
                            <span class='bold caps'>Nylon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='color__block mt1'>
                    <div className='f product__colors'>
                      {variants.map((variant, i) => {
                        const id = variant.sys.id
                        const { colorSwatch, material } = variant.fields
                        return (
                          <div onClick={() => this.updateActiveProduct(i)} width={'auto'} key={id} className={`product__color no-ajax mr1 ${this.state.activeMaterial === material ? 'visible' : 'hide'} ${this.state.activeColor === colorSwatch ? 'active' : null} ${colorSwatch}`} style={{backgroundColor: colors(colorSwatch)}}>
                            <span className='absolute fill-x' style={{borderColor: colors(colorSwatch)}} />
                          </div>
                        )
                      })}
                    </div>
                    <div className='pt05 s1'><span className='caps'>Color:</span> <span className='bold'>{activeProduct.cleanVariantName}</span></div>
                  </div>
                </div>
                <div>
                  {activeProduct.addOns && activeProduct.addOns.length && (
                    <div>
                      {/* <h5 className='caps mb05 s1'>Add Ons</h5> */}
                      <div className='f jcb ais mt15'>
                        {activeProduct.addOns.map((addOn) => {
                          const addonTotal = activeProduct.addOns.length
                          return (
                            <BundleItem addOn={addOn} total={addonTotal} productAdded={this.state.productAdded} updateAddOns={this.updateAddOns} />
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {availabilityStatus ? (
                    <div className='f jcs aic mt15'>
                      {availabilityStatus === 'sold-out' ? (
                        <button disabled className='button button--light bgo rel sans caps track fill-h' role='button'><span className='f aic jcc'>Sold Out</span></button>
                      ) : (
                        <button onClick={() => this.addItemsToCart()} id='AddToCart' className='button button--orange bgo rel sans caps track fill-h' role='button'><span className='f aic jcc'>{availabilityStatus === 'pre-order' ? 'Pre-Order' : 'Add To Cart'}</span></button>
                      )}
                    </div>
                  ) : (
                    <div className='f jcs aic mt15'>
                      <button onClick={() => this.addItemsToCart()} id='AddToCart' className='button button--orange bgo rel sans caps track fill-h' role='button'><span className='f aic jcc'>{!availability ? 'Pre-Order' : 'Add To Cart'}</span></button>
                    </div>
                  )}
                  <div>
                    {/* <span className='small caps cgd mt1 block'>As low as $53/month at 0% APR with Affirm</span> */}
                  </div>
                </div>
              </div>
            </Box>
          </Flex>

          {this.state.modal && (
            <div className='product__modal'>
              <div className='modal__close' onClick={() => this.setState({modal: false})}><div className='modal__cross' /></div>
              <iframe src={this.state.activeProduct.spinView} width='100%' height='100%' frameborder='0' allowfullscreen />
            </div>
          )}
        </div>
        <div className='product__brand_cta rel z1'>
          {this.state.activeProduct.moduleCtaBackgroundImage && (
            <BrandMoment product={this.state.activeProduct} show={this.state.productZoom} cta={moduleCtaText} />
          )}
        </div>
      </div>
    )
  }
}

export default ProductHero

class BrandMoment extends Component {
  render ({ product, cta, show }) {
    const image = product.moduleCtaBackgroundImage ? product.moduleCtaBackgroundImage.fields.file.url : `//images.contentful.com/mhcx2sypq9if/3mF1gMH2zYeUEaeoMUqQ0w/55eeb49041d95b1c0daeba03ae3f1d52/voyager-pdp-sand.jpg`
    return (
      <div className={`cta bgq z1 rel f aic ac jcs cta__m ${show && 'hidden'}`} style={{backgroundImage: 'url(' + image + '?fm=jpg&fl=progressive)'}}>
        <div className='abs fill obj-fit'>
          <img src={image} />
        </div>
        <div className='outer'>
          <div className='cta__fields container--l container--c rel'>
            {cta && (<div className='cw' dangerouslySetInnerHTML={{ __html: marked(cta) }} />)}
          </div>
        </div>
      </div>
    )
  }
}

class BundleItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  componentWillReceiveProps () {
    this.setState({selected: false})
  }
  pushBundle (variant) {
    if (this.state.selected) {
      removeAddon(variant)
    } else {
      addAddOn({id: variant}, 1)
    }
    this.setState({
      selected: !this.state.selected
    })
  }
  render ({addOn, total, updated}) {
    const { fields } = addOn
    const { selected } = this.state
    const width = total === 1 ? 100 : (((1 / total) * 100) - 2)
    return (
      <div style={{ width: width + '%' }} onClick={() => this.pushBundle(fields.variantId)} className={`product__bundle px05 jcc f aic ac ${selected ? 'selected' : null}`}>
        <div>
          <p className='caps bold pt05 s5 mx0'>{fields.bundleNameOptional}</p>
          <div>{selected ? (
            <span className='light'>Added!</span>
          ) : (
            <div>
              {fields.variantDiscountedPrice ? (
                <span className='light'><span className='medium'>+${fields.variantDiscountedPrice}</span> <s>${fields.variantPrice}</s></span>
              ) : (
                <span className='light'>+${fields.variantPrice}</span>
              )}
            </div>
          )}</div>
        </div>
      </div>
    )
  }
}

class ProductImages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeProduct: null,
      active: 0,
      length: props.product.images ? props.product.images.length - 1 : 0,
      modal: false,
      zoom: false,
      hammer: null
    }
  }
  componentDidMount () {
    const self = this
    const imageContainer = document.querySelector('.product__pan')
    if (imageContainer) {
      self.state.hammer = new Hammer.Manager(imageContainer)
      self.state.hammer.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10,
        pointers: 0
      }))
      self.state.hammer.on('panend', (ev) => {
        if (ev.direction === Hammer.DIRECTION_RIGHT) {
          self.slide('left')
        } else {
          self.slide('right')
        }
      })
    }
  }
  updateProduct (i) {
    this.setState({
      active: i,
      activeProduct: this.props.product.images[i]
    })
  }
  handleZoom () {
    let body = document.querySelector('body')
    this.setState({zoom: !this.state.zoom})
    this.props.updateZoom()
    /* eslint-disable */
    dataLayer.push({
      event: 'productZoom',
      productName: this.props.name
    })
    if (this.state.zoom) {
      body.classList.add('noscroll')
    } else {
      body.classList.remove('noscroll')
    }
    /* eslint-enable */
  }
  slide (direction) {
  /* eslint-disable */
    dataLayer.push({
      event: 'galleryEvent',
      productName: this.props.name
    })
    /* eslint-enable */
    switch (direction) {
      case 'left':
        switch (this.state.active) {
          case 0:
            this.setState({ active: this.state.length })
            break
          default:
            this.setState({ active: this.state.active - 1 })
            break
        }
        break
      case 'right':
        switch (this.state.active) {
          case this.state.length:
            this.setState({ active: 0 })
            break
          default:
            this.setState({ active: this.state.active + 1 })
            break
        }
    }
  }
  render ({product}) {
    return (
      <div className={`relative product__image ${this.state.zoom ? 'zoom' : null}`}>
        <div className='product__zoom' onClick={() => this.handleZoom()}><div className='product__zoom_cross' /></div>
        <div className='product__image_inner relative'>
          <div className='product__image_controls_l product__image_controls z3' onclick={() => this.slide('left')}>
            <div className='product__image_controls_arrow' />
          </div>
          <div className='product__image_controls_r product__image_controls z3' onclick={() => this.slide('right')}>
            <div className='product__image_controls_arrow' />
          </div>
          <div className='product__zoom_desktop abs fix-x fill-h fill-v z2' onClick={() => this.handleZoom()} />
          <div className='product__pan abs fit-x fill-h fill-v z1' />
          <img className='product__image_sizer' src={this.props.sizer} />
          <img className='product__image_real abs fill' src={this.props.product.images[this.state.active].fields.file.url + `?fm=jpg&fl=progressive`} />
        </div>
        <div className='product__preview f jcc aic mx1'>
          {product.images && product.images.map((image, i) => (
            <div onMouseOver={() => this.updateProduct(i)} onClick={() => this.updateProduct(i)} className={`product__preview_thumb f jcc aic ${this.state.active === i ? 'active' : null}`}><img src={image.fields.file.url + `?fm=jpg&fl=progressive`} /></div>
          ))}
          {product.spinView && (
            <div className='product__preview_spin rel f jcc aic'>
              <img className='product__preview_spin-image' src={this.props.product.images[0].fields.file.url + `?fm=jpg&fl=progressive`} />
              <div className='z3 fill-h fill-v abs top left f jcc aic' onClick={() => this.props.updateModal()}>
                <svg width='24' height='24' viewBox='0 0 24 24'><path d='M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z' /></svg>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
