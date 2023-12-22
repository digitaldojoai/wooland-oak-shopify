/** @jsx h */
import { h, Component } from 'preact'
import cx from 'classnames'

let playVideo = () => {
  let mainVideo = document.querySelector('.main-video')
  let mainVideoVideo = document.querySelector('.main-video__video-container')
  let mainVideoVideoContainer = document.querySelector('.main-video__video')
  let video = document.querySelector('.main-video__video')
  console.log('mainVideo', mainVideo)
  mainVideo.style.display = 'flex'
  mainVideoVideo.style.display = 'flex'
  mainVideoVideoContainer.style.display = 'flex'
  mainVideo.style.opacity = '1'
  mainVideoVideo.style.opacity = '1'
  mainVideoVideoContainer.style.opacity = '1'
  video.play()
}

let closeVideo = () => {
  let mainVideo = document.querySelector('.main-video')
  let mainVideoVideo = document.querySelector('.main-video__video-container')
  let mainVideoVideoContainer = document.querySelector('.main-video__video')
  let video = document.querySelector('.main-video__video')
  console.log('mainVideo', mainVideo)
  mainVideo.style.display = 'none'
  mainVideoVideo.style.display = 'none'
  mainVideoVideoContainer.style.display = 'none'
  mainVideo.style.opacity = '0'
  mainVideoVideo.style.opacity = '0'
  mainVideoVideoContainer.style.opacity = '0'
  video.pause()
}

class GifHeroModule extends Component {
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
    let styles = {
      objectFit: 'cover'
    }
    return (
      <div className='hero rel f aic jcc rel video'>
        <div className='main-video'>
          <a href='javascript:;' onclick={closeVideo} className='main-video__close' />
          <div className='video__container main-video__video-container'>
            <video className='main-video__video' controls='true' preload=''>
              <source src='https://videos.ctfassets.net/mhcx2sypq9if/6t8pIm6YKLAxUvaE3PsgFB/b7a3db2ca1d9a0f18b0f4ed08dfc6b80/Wool_Oak_v8_CONFORM_v3_0211_H264_1.mp4?fm=jpg&fl=progressive&q=70' type='video/mp4' />
            </video>
          </div>
        </div>
        <div className='abs fill'>
          <div className={`obj-fit abs fill js-obj-fit-image hero__home ${this.state.loaded ? 'is-loaded' : ''}`}>
            <video className={cx('lazy__image is-loaded fill-h fill-v abs fill')} autoplay playsinline loop muted webkit-playsinline controlsList='nodownload' style={styles} src={images[0].fields.file.url + `?fm=jpg&fl=progressive&q=70`} poster='https://images.ctfassets.net/mhcx2sypq9if/exyYxYyyPvMSOX2rGJvTw/47ca51d4887f560992b0ff633701651e/wo_landing_placeholder.jpg' />
          </div>
        </div>
        <div className='container rel fill-h fill-v'>
          <div className='outer container--c container--l fill-v'>
            <div className='ac fill-v hero__wrapper'>
              <div className='hero__breaks f jcc aic'>
                {alignment === 'top' ? (
                  <h2 class={cx('mv0 serif mv025 hero-top hero-animate', {
                    'cb': textColor === 'black',
                    'active': this.state.text,
                    'cw': textColor === 'light' || textColor === undefined
                  })}>{title}</h2>
                ) : (
                  <h2 class={cx('mv0 serif mv025 hero-h1 hero-animate', {
                    'cb': textColor === 'black',
                    'active': this.state.text,
                    'cw': textColor === 'light' || textColor === undefined
                  })}>{title}</h2>
                )}
              </div>
              <div className='hero__breaks f jcc aic'>
                <div className='f jcc aic fw'>
                  {productcta && productcta.map((cta) => {
                    return (
                      <div className={cx('hero-animate-buttons', {'active': this.state.buttons})}>
                        <button onclick={playVideo} className='new-launch__play-button' >
                          <svg width='93px' height='93px' viewBox='0 0 93 93' version='1.1' >
                            <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                              <g id='Play-Button' fill-rule='nonzero' fill='#F3ECE5'>
                                <g id='Page-1'>
                                  <g id='Landing-Page'>
                                    <g id='Page-1-Copy-4'>
                                      <g id='Fill-1-Clipped'>
                                        <path d='M58.7163,46.769 L41.0593,57.225 C40.9753,57.274 40.8803,57.3 40.7843,57.3 C40.6933,57.3 40.6023,57.276 40.5203,57.23 C40.3513,57.136 40.2473,56.959 40.2443,56.766 L40.1313,46.506 L40.0183,36.247 C40.0163,36.054 40.1173,35.874 40.2833,35.776 C40.4493,35.678 40.6563,35.676 40.8233,35.77 L58.7063,45.833 C58.8743,45.928 58.9793,46.105 58.9813,46.298 C58.9833,46.491 58.8823,46.67 58.7163,46.769 M46.5003,0 C20.8193,0 0.0003,20.819 0.0003,46.5 C0.0003,72.182 20.8193,93 46.5003,93 C72.1813,93 93.0003,72.182 93.0003,46.5 C93.0003,20.819 72.1813,0 46.5003,0' id='Fill-1' />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <div>Watch the Film</div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GifHeroModule
