/** @jsx h */
import { h, Component } from 'preact'
import layzr from 'layzr.js'

class ImageFill extends Component {
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
      setTimeout(() => {
        this.setState({loaded: true})
      }, 300)
    })

    images.update().check()
  }
  render () {
    const { image } = this.props
    const img = image.fields.file.url
    const { loaded } = this.state
    return (
      <div class={`obj-fit abs fill js-obj-fit-image lazy-img ${loaded ? 'is-loaded' : null}`}>
        <img data-normal={img + `?fm=jpg&fl=progressive`} class='fill-h fill-v abs fill' />
      </div>
    )
  }
}

export default ImageFill
