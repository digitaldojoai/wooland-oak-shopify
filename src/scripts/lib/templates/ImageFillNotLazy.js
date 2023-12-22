/** @jsx h */
import { h, Component } from 'preact'

class ImageFillNotLazy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: true
    }
  }

  render () {
    const { image } = this.props
    const img = image.fields.file.url
    return (
      <div class={`obj-fit abs fill js-obj-fit-image`}>
        <img data-normal={img + `?fm=jpg&fl=progressive`} class='fill-h fill-v abs fill' />
      </div>
    )
  }
}

export default ImageFillNotLazy
