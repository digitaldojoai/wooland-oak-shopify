/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import scrollMonitor from 'scrollMonitor'

class FeatureHighlights extends Component {
  constructor (props) {
    super(props)

    this.state = {
      classes: null
    }
  }
  componentDidMount () {
    // scroll monitor
    let monitors = document.querySelectorAll('.js-monitor')
    let highlight = document.querySelector('.js-highlight')

    const highlighter = scrollMonitor.create(highlight, { top: 120 })
    highlighter.lock()

    highlighter.stateChange(() => {
      if (highlighter.isAboveViewport && highlighter.isFullyInViewport) {
        this.setState({ classes: 'fixed' })
      } else if (highlighter.isAboveViewport && !highlighter.isFullyInViewport) {
        this.setState({ classes: 'bottom' })
      } else {
        this.setState({ classes: '' })
      }
    })

    monitors.forEach((monitor) => {
      const watcher = scrollMonitor.create(monitor)
      watcher.lock()

      watcher.stateChange(() => {
        if (watcher.isFullyInViewport) {

        }
      })

      return watcher
    })
  }
  render ({content}) {
    const {
      highlight
    } = content.fields

    return (
      <section className='bgw product__highlight js-highlight z0'>
        {highlight.map((high) => {
          const {
            description,
            title,
            image
          } = high.fields
          return (
            <Flex wrap alignItems={`center`} className='product__highlight_block'>
              <Box width={[1, [1200, 3 / 5]]} order={[-1, [1200, 1]]} className='product__highlight_image'>
                {image && (<img src={image.fields.file.url} />)}
              </Box>
              <Box width={[1, [1200, 2 / 5]]}>
                <div className='product__highlight_text ph2 pb2 mha js-monitor'>
                  <h4 className='serif mb0 pb0'>{title}</h4>
                  <p className='p2 light pt0'>{description}</p>
                </div>
              </Box>
            </Flex>
          )
        })}
        <div className={`product__highlight_fixed ${this.state.classes}`}>
          {highlight.map((high) => {
            const {
              image
            } = high.fields
            const background = {
              backgroundImage: 'url(' + image.fields.file.url + ')'
            }
            return (
              <div style={background} />
            )
          })}
        </div>
      </section>
    )
  }
}

export default FeatureHighlights
