/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import Button from 'components/button'

class ThreeWideImages extends Component {
  render ({content}) {
    const {
      value,
      title
    } = content.fields
    let buttonText = title ? title.split(':')[0] : null
    let buttonColor = title ? title.split(':')[1].trim() : null

    let lightTrue
    let orangeTrue
    if (buttonColor === 'light') {
      lightTrue = true
    }
    if (buttonColor === 'orange') {
      orangeTrue = true
    }
    return (
      <section className='bgw pb2'>
        <div className='rel f aic jcc pt2'>
          <div className='container rel fill-h'>
            <div className='outer container--c container--l ac'>
              <Flex wrap className='ac icon__values' gutter='2' justifyContent='center'>
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
              <div>
                {buttonText ? Button({url: '/products/all-day-bag', cta: buttonText, orange: orangeTrue, light: lightTrue}) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ThreeWideImages
