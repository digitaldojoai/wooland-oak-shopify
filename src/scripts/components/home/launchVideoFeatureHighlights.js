/** @jsx h */
import { h, Component } from 'preact'

class LaunchVideoFeatureHighlights extends Component {
  render ({content}) {
    let hed = content.fields.featureHighlights[0] ? content.fields.featureHighlights[0].fields.title.split(':')[0] : ''
    let dek = content.fields.featureHighlights[0] ? content.fields.featureHighlights[0].fields.title.split(':')[1] : ''
    let style = {
      objectFit: 'cover'
    }
    const placeholder = `//images.ctfassets.net/mhcx2sypq9if/2O516he19jZoqbPpq7f2GV/4fa4948804603ae4fbc894e71fc08f14/organization_is_key_placeholder.jpg`
    const video = content.fields.featureHighlights ? content.fields.featureHighlights[0].fields.image.fields.file.url : ``
    return (
      <section className='bgw'>
        <div className='ma ac jcc fdc f pb2 container--c container--mm ac'>
          <h5 className='f ma mb1 jcc'>{hed}</h5>
          <h4 className='f ma mt0 jcc mb05'>{dek}</h4>
        </div>
        <div className='cta bgq z1 rel f aic ac jcs cta__m new-launch-full mb2'>
          <div className='abs fill obj-fit mb1'>
            <video className='abs fill-h fill-v fill' style={style} autoplay muted playsinline webkit-playsinline loop src={video} poster={placeholder} />
          </div>
        </div>
        <div className='ma ac jcc fdc f pt2 container--c container--mm ac'>
          <h5 className='f ma mb1 jcc'>Luxe Quality</h5>
          <h4 className='f ma mt0 jcc mb05'>Crafted in Premium Full-Grain Leather to Elevate any Outfit for any Occasion</h4>
        </div>
      </section>
    )
  }
}

export default LaunchVideoFeatureHighlights
