/** @jsx h */
import { h, render, Component } from 'preact'
import products from 'lib/products'

import Modules from 'lib/modules'
import ProductHero from 'components/product/productHero'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: products.get(this.props.id) || null
    }
  }
  componentDidMount () {
    const productCache = products.get(this.props.id)
    const header = document.querySelector('header')
    header.classList.add('dark')
    header.classList.remove('background')

    if (this.state.product) return

    if (productCache) {
      this.setState({product: productCache})
      return true
    }
  }
  renderModules (modules) {
    return modules.map((module) => {
      const type = module.sys.contentType ? module.sys.contentType.sys.id : false
      return <Modules module={module} type={type} />
    })
  }

  render () {
    const { product } = this.state
    if (product) {
      return (
        <div>
          <div className='bgg z1 '>
            <ProductHero
              description={product.productDescription}
              subDescription={product.productSubheader}
              name={product.productName}
              root={this.props.rootId}
              sizer={this.props.sizer}
              image={product.image}
              price={product.price}
              shopTheStoryImage={product.shopTheStoryImage}
              getNotified={product.getNotifiedCopy}
              productShortDescription={product.productShortDescription}
              icons={product.contentModules ? product.contentModules[0] : null}
              compareProducts={product.compareProductModule}
              moduleCtaText={product.moduleCtaText}
              details={product.detailsAndCare}
              variants={product.variants} />
          </div>
          <div className='z0'>{ product.contentModules ? this.renderModules(product.contentModules) : null }</div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const productId = root.getAttribute('data-id')
  const rootId = root.getAttribute('product-id')
  const sizebox = document.getElementById('sizer')
  const sizeURL = sizebox.getAttribute('data-sizer')
  products.on('updated', () => render(<Product id={productId} rootId={rootId} sizer={sizeURL} />, root))
  render(<Product id={productId} rootId={rootId} />, root)
}
