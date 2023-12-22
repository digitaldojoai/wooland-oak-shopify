/** @jsx h */
import { h, Component } from 'preact'
import marked from 'marked'
import Hammer from 'hammerjs'
import { Flex, Box } from 'ffx'

class slideshowTestimonials extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: 0,
      length: props.content.fields.slide.length - 1
    }
    this.setActive = this.setActive.bind(this)
  }
  componentDidMount () {
    const self = this
    const imageContainer = document.querySelector('.slideshow__inner')
    if (imageContainer) {
      window.hammertime = new Hammer.Manager(imageContainer)
      window.hammertime.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10,
        pointers: 0
      }))
      window.hammertime.on('panend', (ev) => {
        if (ev.direction === Hammer.DIRECTION_RIGHT) {
          self.slide('left')
        } else {
          self.slide('right')
        }
      })
    }
    setInterval(() => {
      this.setActive(this.state.active)
    }, 6000)
  }

  setActive (active) {
    if (this.state.length > 1) {
      if (active !== this.state.length) {
        this.setState({active: this.state.active + 1})
      } else {
        this.setState({active: 0})
      }
    }
  }

  slide (direction) {
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
  render ({content}) {
    const {
      slide,
      helpfulTitle,
      companyLogo
    } = content.fields

    return (
      <section className='z1 rel testimonial'>
        <div className='rel f aic jcc px2'>
          <div className='container rel fill-h'>
            <div className='container--c container--l ac testimonial__inner'>
              <h4 className='serif mb0'>{helpfulTitle}</h4>
              <div className='container--m container--c rel'>
                <div className='slideshow  f aic jcc'>
                  <div className='product__image_controls_l product__image_controls z3' onclick={() => this.slide('left')}>
                    <div className='product__image_controls_arrow' />
                  </div>
                  <div className='product__image_controls_r product__image_controls z3' onclick={() => this.slide('right')}>
                    <div className='product__image_controls_arrow' />
                  </div>
                  <div className='slideshow__inner'>
                    {slide.map((testimonial, i) => {
                      const {
                        productLink,
                        quote,
                        personName
                      } = testimonial.fields
                      return (
                        <div className={`slideshow__slide ${this.state.active === i ? 'active' : null}`}>
                          <div className='p2' dangerouslySetInnerHTML={{ __html: marked(quote) }} />
                          <div className='f jcc aic'><span>{personName}</span> {productLink && (
                            <div>&nbsp;- <a className='underline co' href={`/products/${productLink.fields.slug}`}>{productLink.fields.productName}</a></div>
                          )}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className='f jcc aic fill-h mv2'>
                  {slide.map((slide, i) => (
                    <div onClick={() => this.setState({active: i})} className={`slideshow__dot ${this.state.active === i ? 'active' : null}`} />
                  ))}
                </div>
              </div>
              <hr className='bggb' />
              {companyLogo && (
                <Flex wrap className='slideshow__company mha mt2'>
                  {companyLogo.map((logo) => {
                    return (
                      <Box width={[1 / 2, [700, 1 / 4]]} className='px1'><img src={logo.fields.file.url} /></Box>
                    )
                  })}
                </Flex>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default slideshowTestimonials
