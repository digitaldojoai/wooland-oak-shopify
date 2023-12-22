/** @jsx h */
import { h, Component } from 'preact'
import Button from 'components/button'
import cx from 'classnames'
import jump from 'jump.js'

// import Lazy from 'relaze'
// import Img from 'components/shared/lazyImage'

let currentViewportHeight = () => {
  let height = document.documentElement.clientHeight
  return height
}

class LargeHeroModule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: false,
      buttons: false,
      loaded: false,
      swipe: false
    }
  }
  componentDidMount () {
    let hero = document.querySelector('.hero__blue')
    setTimeout(() => {
      hero.classList.add('fade-in')
    }, 500)
    setTimeout(() => {
      hero.classList.add('slide-up')
    }, 700)
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 800)
    setTimeout(() => {
      this.setState({
        text: true
      })
    }, 1200)
    setTimeout(() => {
      this.setState({
        buttons: true
      })
    }, 1400)
  }
  render ({content}) {
    const {
      images,
      title,
      productcta,
      textColor,
      alignment
    } = content.fields
    return (
      <div className='hero rel f aic jcc rel'>
        <div className='abs fill'>
          <div className={`obj-fit abs fill js-obj-fit-image hero__home ${this.state.loaded ? 'is-loaded' : ''}`}>
            <img src={images[0].fields.file.url + `?fm=jpg&fl=progressive&q=70`} className={cx('lazy__image is-loaded fill-h fill-v abs fill')} />
          </div>
        </div>
        <div className='container rel fill-h fill-v'>
          <div className='outer container--c container--l fill-v'>
            <div className='ac fill-v hero__wrapper rel'>
              <div className='hero__breaks f jcc aic'>
                {alignment === 'top' ? (
                  <h2 class={cx('mv0 serif mv025 hero-top hero-animate', {
                    'cb': textColor === 'black',
                    'active': this.state.text,
                    'cw': textColor === 'light' || textColor === undefined
                  })}>{title}</h2>
                ) : (
                  <h1 class={cx('mv0 serif mv025 hero-h1 hero-animate', {
                    'cb': textColor === 'black',
                    'active': this.state.text,
                    'cw': textColor === 'light' || textColor === undefined
                  })}>{title}</h1>
                )}
              </div>
              <div className='hero__breaks f jcc aic'>
                <div className='f jcc aic fw'>
                  {productcta && productcta.map((cta) => {
                    const type = cta.sys.contentType.sys.id
                    let url, copy
                    let blue = false
                    let white = false
                    let external = false
                    if (type === 'singlePage') {
                      url = '/pages/' + cta.fields.slug
                      copy = cta.fields.ctaTitle ? cta.fields.ctaTitle : 'Find your Perfect Bag'
                      white = true
                    } else if (type === 'externalLink') {
                      console.log('ex', cta.fields)
                      url = cta.fields.slug
                      copy = cta.fields.ctaTitle
                      external = true
                      blue = true
                    } else {
                      url = '/products/' + cta.fields.slug
                      copy = 'Shop The ' + cta.fields.productName
                      blue = true
                    }
                    return (
                      <div className={cx('hero-animate-buttons', {
                        'active': this.state.buttons
                      })}>{Button({
                        url: url,
                        cta: copy,
                        blue: blue,
                        light: white,
                        external: external
                      })}</div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='scroll-down' onClick={() => jump(currentViewportHeight())}>
          <h5 className='cw caps bold'>Explore</h5>
          <div className='scroll-line'><div className='scroll-line-grow' /></div>
        </div>
      </div>
    )
  }
}

export default LargeHeroModule
