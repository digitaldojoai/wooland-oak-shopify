/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import marked from 'marked'

import Lazy from 'relaze'
import Img from 'components/shared/lazyImage'

class ImageText extends Component {
  render ({content}) {
    const {
      singleRow
    } = content.fields

    return (
      <section className='bgw z1 rel pb2'>
        <div className='rel f aic jcc '>
          <div className='container rel fill-h'>
            <div className='container--c container--l ac'>
              {singleRow.map((single, i) => {
                let order = []
                let push = ''
                const {
                  text,
                  image,
                  icon,
                  alignment
                } = single.fields
                if (alignment === 'left') {
                  order = [1, [900, -1]]
                  push = 'left'
                } else {
                  order = [1]
                  push = 'right'
                }
                return (
                  <Flex wrap className='image__text' alignItems={`center`} justifyContent={`space-between`}>
                    <Box order={order} width={[1, [900, 4 / 7]]}>
                      {image && (
                        <div className='rel image__text_img'>
                          <Lazy src={image.fields.file.url}>
                            <Img />
                          </Lazy>
                          <img src={image.fields.file.url} className='transparent' />
                        </div>
                      )}
                    </Box>
                    <Box width={[1, [900, 3 / 7]]}>
                      <div className={`image__text_copy pt2 ph2 ${push}`}>
                        <div className='icon__image'>
                          {icon && (<img src={icon.fields.blueIcon.fields.file.url} />)}
                        </div>
                        {text && (<div dangerouslySetInnerHTML={{ __html: marked(text) }} />)}
                      </div>
                    </Box>
                  </Flex>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ImageText
