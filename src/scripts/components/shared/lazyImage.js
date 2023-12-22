/** @jsx h */
import { h, Component } from 'preact'
import cx from 'classnames'

class Img extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  show () {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
      // this.props.showText
    }, 100)
  }

  render () {
    let classes = `lazy__image fill-h fill-v abs fill`

    if (this.state.loaded) classes += ' is-loaded'

    return (
      <div className={`obj-fit abs fill js-obj-fit-image ${this.state.loaded ? 'is-loaded' : ''}`}>
        <img className={cx(classes)} {...this.props} onLoad={this.show.bind(this)} />
      </div>
    )
  }
}

export default Img
