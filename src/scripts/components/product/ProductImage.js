/** @jsx h */
import { h, Component } from 'preact'
import layzr from 'layzr.js'

class ProductImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount () {
    const images = layzr({
      normal: 'data-normal'
    }).handlers(true)

    images.on('src:after', img => {
      this.setState({loaded: true})
    })

    images.update().check()
  }
  componentWillReceiveProps () {
    const images = layzr({
      normal: 'data-normal'
    }).handlers(true)

    images.on('src:after', img => {
      this.setState({loaded: true})
    })

    images.update().check()
  }
  render () {
    const { image } = this.props
    const img = image.fields.file.url
    const { loaded } = this.state
    return (
      <div className={`obj-fit fill js-obj-fit-image lazy-img ${loaded ? 'is-loaded' : null}`}>
        <img data-normal={img} className='fill-h fill-v fill' />
      </div>
    )
  }
}

export default ProductImage
