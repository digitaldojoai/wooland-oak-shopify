/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import marked from 'marked'
import overunder from 'overunder'

class NewLaunchVideoText extends Component {
  render ({content}) {
    const {
      singleRow,
      helpfulTitle
    } = content.fields
    let hed = helpfulTitle.split(':')[0] ? helpfulTitle.split(':')[0] : ''
    let dek = helpfulTitle.split(':')[1] ? helpfulTitle.split(':')[1] : ''
    return (
      <section className='bgw z1 rel product__video_block new-launch'>
        <div className='rel f aic jcc ph15'>
          <div className='container rel fill-h pt2'>
            <div className='container--c container--s ac'>
              <h5 className='mb1'>{hed}</h5>
              <h4 className='mv0'>{dek}</h4>
            </div>
            <div className='pv2 container--c container--xl ac'>
              {singleRow.map((single, i) => {
                let order = []
                let push = ''
                const {
                  text,
                  video,
                  videoUrl,
                  icon,
                  alignment,
                  imageFallback
                } = single.fields

                if (alignment === 'left') {
                  order = [1, [900, -1]]
                  push = 'left'
                } else {
                  order = [1]
                  push = 'right'
                }
                return (
                  <VideoRow
                    video={video}
                    videoUrl={videoUrl}
                    key={i}
                    index={i}
                    icon={icon}
                    imageFallback={imageFallback}
                    text={text}
                    push={push}
                    alignment={alignment}
                    order={order} />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NewLaunchVideoText

class VideoRow extends Component {
  componentDidMount () {
    const module = this.base

    // Handle fun scrolling
    const video = document.querySelector('.js-video-' + this.props.index)
    const scroller = overunder.scroll(100, module, {watchResize: true, offset: -300})
    if (video) {
      scroller.on('over', (instance) => {
        module.classList.add('visible')
        setTimeout(() => {
          module.classList.add('text-visible')
          video.play()
        }, 500)
      })
    }
    scroller.check()
  }
  render ({ video, videoUrl, imageFallback, alignment, text, order, push, icon, index }) {
    const ctaText = videoUrl ? videoUrl.split(':')[0] : ''
    const ctaURL = videoUrl ? videoUrl.split(':')[1] : ''
    const alignmentCss = alignment ? alignment === 'left' ? 'ml0' : 'mr0' : ''
    return (
      <Flex wrap dataSpeed='1' className='image__text product__vt_animate' alignItems={`center`} justifyContent={`space-between`}>
        <Box order={order} width={[1, [900, 4 / 7]]}>
          {video && (
            <div className='rel product__video no-shadow'>
              <video className={`abs fill-h fill-v fill js-video-${index}`} muted playsinline webkit-playsinline loop data-component-example={videoUrl} src={video.fields.file.url} poster={imageFallback ? imageFallback.fields.file.url : ''} />
            </div>
          )}
        </Box>
        <Box width={[1, [900, 3 / 7]]}>
          <div className={`image__text_copy px1 ${push}`}>
            <div className='icon__image'>
              {icon && (<img src={icon.fields.blueIcon.fields.file.url} />)}
            </div>
            {text && (<div dangerouslySetInnerHTML={{ __html: marked(text) }} />)}
            <div className={`${alignmentCss} mt2`}>
              <p className='mt2'><a className='mt2 cbl underline underline--blue' href={ctaURL}>{ctaText}</a></p>
            </div>
          </div>
        </Box>
      </Flex>
    )
  }
}
