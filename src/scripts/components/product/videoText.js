/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import marked from 'marked'
import overunder from 'overunder'

class VideoText extends Component {
  render ({content}) {
    const {
      singleRow
    } = content.fields
    return (
      <section className='bgw z1 rel product__video_block px2'>
        <div className='rel f aic jcc ph2'>
          <div className='container rel fill-h'>
            <div className=' pv2 container--c container--xl ac'>
              {singleRow.map((single, i) => {
                let order = []
                let push = ''
                const {
                  text,
                  video,
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
                    key={i}
                    index={i}
                    icon={icon}
                    imageFallback={imageFallback}
                    text={text}
                    push={push}
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

export default VideoText

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
  render ({ video, imageFallback, text, order, push, icon, index }) {
    return (
      <Flex wrap dataSpeed='1' className='image__text product__vt_animate' alignItems={`center`} justifyContent={`space-between`}>
        <Box order={order} width={[1, [900, 4 / 7]]}>
          {video && (
            <div className='rel product__video'>
              <video className={`abs fill-h fill-v fill js-video-${index}`} muted playsinline webkit-playsinline loop src={video.fields.file.url} poster={imageFallback ? imageFallback.fields.file.url : ''} />
            </div>
          )}
        </Box>
        <Box width={[1, [900, 3 / 7]]}>
          <div className={`image__text_copy px1 ${push}`}>
            <div className='icon__image'>
              {icon && (<img src={icon.fields.blueIcon.fields.file.url} />)}
            </div>
            {text && (<div dangerouslySetInnerHTML={{ __html: marked(text) }} />)}
          </div>
        </Box>
      </Flex>
    )
  }
}
