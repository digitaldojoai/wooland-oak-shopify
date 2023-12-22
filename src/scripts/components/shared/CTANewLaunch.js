/** @jsx h */
import { h, Component } from 'preact'
import cx from 'classnames'
import marked from 'marked'
import Button from 'components/button'
// import scrollMonitor from 'scrollMonitor'
import Lazy from 'relaze'
import Img from 'components/shared/lazyImage'

class CTANewLaunch extends Component {
  render ({content}) {
    const {
      fields
    } = content
    let blue = true
    let url = ''
    console.log(url)
    if (fields.link) {
      const type = fields.link.sys.contentType ? fields.link.sys.contentType.sys.id : false

      switch (type) {
        case 'singlePage':
          url += '/pages/'
          break
        case 'products':
          url += '/products/'
          break
      }
      url += fields.link.fields.slug
    }
    return (
      <div refs='cta' className={`${cx('cta bgw z1 rel f aic', {
        'ac jcc': fields.alignment === 'center',
        'al jcs cta__m': fields.alignment === 'left',
        'cw': fields.textStyle === true
      })}`}>
        {fields.backgroundImage && (
          <div className='abs fill'>
            {/* <div className={`obj-fit abs fill js-obj-fit-image lazy-img is-loaded`}>
              <img src={fields.backgroundImage.fields.file.url} className='fill-h fill-v abs fill' />
            </div> */}
            <Lazy src={fields.backgroundImage.fields.file.url + '?fm=jpg&fl=progressive&q=70'}>
              <Img />
            </Lazy>
          </div>
        )}
        <div className='outer'>
          <div className={`${cx('cta__fields container--l container--c rel', {
            // 'container--m': fields.buttonVisibility === false,
            // 'container--m': fields.buttonVisibility === true
          })}`}>
            <div className='rel'>
              {/* <div className='outer'> */}
              {fields.content && (<div dangerouslySetInnerHTML={{ __html: marked(fields.content) }} />)}
              {fields.buttonVisibility ? (
                <div>
                  {Button({
                    url: '/products/all-day-bag',
                    cta: fields.linkText,
                    blue: blue
                  })}
                </div>
              ) : ''}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default CTANewLaunch
