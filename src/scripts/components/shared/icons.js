/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'

class Icons extends Component {
  render ({content}) {
    const {
      icons,
      title
    } = content.fields
    return (
      <section className='bgg z1 rel'>
        <div className='rel f aic jcc px2 icon__container'>
          <div className='container rel fill-h'>
            <div className=' container--c container--l ac'>
              <h4 className='serif'>{title}</h4>
              <Flex wrap className='ac' justifyContent={`center`}>
                {icons.map((icon) => {
                  const {
                    blueIcon,
                    title
                  } = icon.fields
                  return (
                    <Box width={[1 / 2, [600, 1 / 3], [1200, 1 / 6]]} className='ac'>
                      {blueIcon && (<img src={blueIcon.fields.file.url} />)}
                      <h5 className='caps bold'>{title}</h5>
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

export default Icons
