/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import Button from 'components/button'
import enableInlineVideo from 'iphone-inline-video'
import overunder from 'overunder'

// import Lazy from 'relaze'
// import Img from 'components/shared/lazyImage'

class StopMotion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      interval: null,
      length: props.content.fields.slideshowImages.length
    }
    this.setActive = this.setActive.bind(this)
  }
  componentDidMount () {
    setInterval(() => {
      this.setActive(this.state.active)
    }, 6000)
    const inlineVideo = document.querySelector('.js-inline')
    if (inlineVideo) {
      enableInlineVideo(inlineVideo)
    }

    const module = this.base
    const stopSlider = module.querySelector('.js-stop-slider')
    const stopCopy = module.querySelector('.js-stop-copy')
    const stopVideo = module.querySelector('.js-stop-sec-video')
    const scroller = overunder.scroll(100, module, {watchResize: true, offset: -300})
    if (module) {
      scroller.on('over', (instance) => {
        stopCopy.classList.add('fade-in')
        setTimeout(() => {
          stopSlider.classList.add('fade-in')
        }, 500)
        setTimeout(() => {
          stopVideo.classList.add('fade-in')
        }, 1000)
      })
    }
  }
  setActive (active) {
    if (this.state.length > 1) {
      if (active === 0) {
        this.setState({active: 1})
      } else if (active === 1) {
        this.setState({active: 2})
      } else {
        this.setState({active: 0})
      }
    }
  }
  render ({content}) {
    const {
      productName,
      productDescription,
      productSubHeader,
      productLink,
      slideshowImages,
      alignment,
      productIcons,
      stopMotionImage,
      stopMotionVideo,
      videoUrl
    } = content.fields
    let order = []
    if (alignment === 'left') {
      order = [-1, [900, 1]]
    } else {
      order = [-1]
    }
    return (
      <section className='bgw stop__motion js-stop-motion'>
        <div className='rel f aic jcc pb2'>
          <div className='container rel fill-h'>
            <div className='container--c container--xl ac'>
              {/* <h4 className='serif'>{title}</h4> */}
              <Flex wrap className='ac stop__motion_container' gutter={[0, [900, 2]]} justifyContent='center'>
                <Box width={[1, [900, 1 / 2]]} order={order}>
                  <div className='rel fill-v js-stop-slider stop__motion_slider'>

                    {slideshowImages.length >= 1 && slideshowImages.map((image, i) => {
                      return (
                        <div className={`${this.state.active === i ? 'active' : null} stop__motion_slide`}>
                          {/* <Lazy src={image.fields.file.url}>
                            <Img />
                          </Lazy> */}
                          <div className='fill-v obj-fit abs fill js-obj-fit-image is-loaded stop__motion_slides' style={{backgroundImage: 'url(' + image.fields.file.url + '?fm=jpg&fl=progressive&q=70)'}} />
                        </div>
                      )
                    })}
                    <img className='obj-fit transparent' src={slideshowImages[0].fields.file.url} />
                    {slideshowImages.length > 1 && (
                      <div className='stop__motion_fun z2 abs f aic jcc'>
                        <h5 className='cw caps bold mx0'>The Pro</h5>
                        <div className='line'><div className={`${this.state.active === 0 ? 'active' : null} line--grow`} /></div>
                        <h5 className='cw caps bold mx0'>The Overnighter</h5>
                        <div className='line'><div className={`${this.state.active === 2 ? 'active' : null} line--grow`} /></div>
                        <h5 className='cw caps bold mx0'>The Weekender</h5>
                      </div>
                    )}
                  </div>
                </Box>
                <Box width={[1, [900, 1 / 2]]} className='ac stop__motion_copy_block'>
                  {/* <img className='obj-fit' src={image.fields.file.url} /> */}
                  <div className='stop__motion_copy'>
                    <div className='pv2 ph2 f aic jcc stop__motion_copy_inner_t js-stop-copy'>
                      <div className='stop__motion_lines_top' />
                      <div className='stop__motion_lines_bottom' />
                      <div>
                        <div className='container--s stop__motion_copy_bump'>
                          <h3 className='serif mb0 mt0'>{productName}</h3>
                          <p className='light'>{productDescription}</p>
                          <h5 className='bold s5'>{productSubHeader}</h5>
                          {Button({
                            url: `/products/${productLink.fields.slug}`,
                            orange: true,
                            cta: `Shop the ${productName}`
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='f fw stop__motion_sets stop__motion_copy_inner_b js-stop-sec-video'>
                      <div className='bgbl f fw stop__motion_icons'>
                        {productIcons.map((icon) => {
                          const {
                            title,
                            whiteIcon
                          } = icon.fields
                          return (
                            <div className='px1 f fw jcc aic stop__motion_icon'>
                              <div>
                                <img src={whiteIcon.fields.file.url} />
                                <p className='cw mv0 pv0'>{title}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className={`stop__motion_image rel ${alignment === 'right' ? 'stop__motion_order' : ''}`} style={{backgroundImage: 'url(' + stopMotionImage.fields.file.url + '?fm=jpg&fl=progressive&q=70)'}}>
                        {/* eslint-disable */}
                        {stopMotionVideo && (
                          <video className='abs video-fit js-inline fill fit-x' autoplay muted playsinline webkit-playsinline loop src={videoUrl ? videoUrl : stopMotionVideo.fields.file.url} poster={stopMotionImage.fields.file.url} />
                        )}
                        {/* eslint-enable */}
                        <img src={stopMotionImage.fields.file.url} />
                      </div>
                    </div>
                  </div>
                </Box>
              </Flex>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default StopMotion
