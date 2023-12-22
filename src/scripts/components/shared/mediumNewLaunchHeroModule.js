/** @jsx h */
import { h, Component } from 'preact'
import ImageFillNotLazy from 'lib/templates/ImageFillNotLazy'

class MediumNewLaunchHeroModule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: false,
      buttons: false,
      loaded: false,
      swipe: false,
      notifyOpen: false
    }
  }

  notifyOpen () {
    this.setState({
      notifyOpen: true
    })
    /* eslint-disable */
    dataLayer.push({
      event: 'notifyOpen',
      buttonAction: 'slideOutOpen',
      productName: this.props.name
    })
    /* eslint-enable */
  }

  render ({content}) {
    const {
      image,
      title,
      getNotified
    } = content.fields
    return (
      <div className='hero rel f aic jcc hero--single new-launch'>
        <div className={`${this.state.notifyOpen ? 'open' : null} product__slide_out z10`}>
          <div onClick={() => this.setState({notifyOpen: false})} className={`overlay ${this.state.notifyOpen ? 'open' : null}`} />
          <div className='bgw px05 ac rel'>
            <div onClick={() => this.setState({ notifyOpen: false })} className='product__image_controls_l product__image_controls'>
              <div class='product__image_controls_arrow' />
            </div>
            <p className='p2 serif'>Get Notified!</p>
          </div>
          <div className='product__slide_out_info bgg px1'>
            <div className='px1 ac'>
              {/* eslint-disable */}
                <p className='mt2 mb0 s16'>{getNotified ? getNotified : "Please keep me updated on the ALL DAY BAG campaign! I don't want to miss the pre-order discount!"}</p>
              {/* eslint-enable */}
              {!this.state.formSuccess ? (
                <form id='nEmail' action='//manage.kmail-lists.com/subscriptions/subscribe' data-ajax-submit='//manage.kmail-lists.com/ajax/subscriptions/subscribe' method='GET' target='_blank' novalidate='novalidate' className='newsletter__form mt2 inline-block mha fill-h'>
                  <input type='hidden' name='g' value='JiebPi' />
                  <div className=' rel'>
                    <input type='email' name='email' className='fill-h sans book small ac' placeholder='Enter your email' />
                    <div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='' tabindex='-1' value='' /></div>
                    <div className='newsletter__valid cm mb1 small'>
                      <span><input type='checkbox' className='mr1' required name='terms' /></span><span className='newsletter__valid_copy rel'>By checking this box you'll receive our newsletter on the newest products and happenings. You can unsubscribe any time you want. <a href='/pages/privacy'>Read more</a> here about how and why we ask for this data.</span>
                    </div>
                    <button type='submit' className='button caps bold sans fill-h mt05'>Submit</button>
                  </div>
                </form>
              ) : (
                <div className='mt2'>You're on the List!</div>
              )}
            </div>
          </div>
        </div>
        <div className='abs fill'>
          <ImageFillNotLazy image={image} />
        </div>
        <div className='container rel fill-h'>
          <div className='outer container--c container--l'>
            <div className='ac'>
              {title ? <div class='f jcc aic fw'><h2 className='serif mv05 cw'>{title}</h2></div> : null}
              <div class='f jcc aic fw'>
                <a target='' onClick={() => this.notifyOpen()} href='javascript:/' className='button rel f aic jcc sans caps track button--blue' role='button'><span class='f aic jcc'>Sign Up</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MediumNewLaunchHeroModule
