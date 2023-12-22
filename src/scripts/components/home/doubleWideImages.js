/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'

class DoubleWideImages extends Component {
  render ({content}) {
    const {
      value,
      title
    } = content.fields
    return (
      <section className='bgw'>
        <div className='rel f aic jcc px2'>
          <div className='container rel fill-h'>
            <div className='outer container--c container--l ac'>
              <h3 className='serif pb1'>{title}</h3>
              <Flex wrap className='ac' gutter='2' justifyContent='center'>
                {value.map((val) => {
                  const {
                    content,
                    header,
                    icon
                  } = val.fields
                  return (
                    <Box width={[ 1, [600, 1 / 3] ]} className='ac mb15'>
                      <img className='obj-fit' src={icon.fields.blueIcon.fields.file.url} />
                      <h5 className='caps bold'>{header}</h5>
                      <p className='light container--s mb1'>{content}</p>
                    </Box>
                  )
                })}
              </Flex>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DoubleWideImages
