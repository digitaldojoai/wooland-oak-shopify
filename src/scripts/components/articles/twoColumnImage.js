/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import FullImage from './fullImage'

class TwoColumnImage extends Component {
  render ({content}) {
    const {
      images
    } = content.fields
    return (
      <section className='z1 rel'>
        <div className='container pv1'>
          <div className='mha container--mm ac'>
            <Flex wrap gutter={[0, [600, 1.5]]}>
              {images.map((image, i) => (
                <Box width={[1 / 2]}>
                  <FullImage content={image} />
                </Box>
              ))}
            </Flex>
          </div>
        </div>
      </section>
    )
  }
}

export default TwoColumnImage
