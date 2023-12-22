/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'

class TSAApproved extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      model: 'female'
    }
  }
  toggleModel (model) {
    this.setState({
      model: model
    })

    /* eslint-disable */
    dataLayer.push({
      event: 'toggleModel',
      buttonAction: 'TSAModelToggle',
      modelSelected: model
    })
    /* eslint-enable */
  }
  updateBagType (i, bag) {
    this.setState({active: i})

    /* eslint-disable */
    dataLayer.push({
      event: 'toggleBag',
      buttonAction: 'TSABagToggle',
      bagSelected: bag
    })
    /* eslint-enable */
  }
  render ({ content }) {
    const {
      title,
      description,
      sizeBlocks
    } = content.fields
    return (
      <div className='wrapper px2 z1 rel z1 bgg tsa'>
        <div className='container--l mha'>
          <Flex wrap alignItems={`flex-end`} className='tsa__bump'>
            <Box width={[1, [900, 1 / 2]]}>
              <h4 className='serif mb0 pb0 mt0'>{title}</h4>
              <p className='p2 light'>{description}</p>
              <div className='ac tsa__bags_mobile'>
                <div className='tsa__main_image rel'>
                  {sizeBlocks.map((block, i) => {
                    const {
                      mainImage
                    } = block.fields
                    return (
                      <div className={`tsa__bags ${this.state.active === i && 'active'}`} style={{backgroundImage: 'url(' + mainImage.fields.file.url + ')'}} />
                    )
                  })}
                  <img src={sizeBlocks[0].fields.mainImage.fields.file.url} />
                </div>
                <div className='button__group '>
                  <div className='bgw f jcc '>
                    {sizeBlocks.length > 1 && sizeBlocks.map((block, i) => {
                      const {
                        productName
                      } = block.fields
                      return (
                        <div onClick={() => this.updateBagType(i, productName)} className={`button__group_s px1 ph2 ${this.state.active === i && 'bgo cw'}`}><span className='bold caps'>{productName}</span></div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Box>
            <Box width={[1, [900, 1 / 2]]}>

              <div className='ac'>
                <div>
                  {this.state.model === 'female' ? (
                    <div className='tsa__model'>
                      <img src={sizeBlocks[this.state.active].fields.femaleModelImage.fields.file.url} />
                      <h5 className='bold xsmall'>{sizeBlocks[this.state.active].fields.femaleHeight}</h5>
                    </div>
                  ) : (
                    <div className='tsa__model'>
                      <img src={sizeBlocks[this.state.active].fields.maleModelImage.fields.file.url} />
                      <h5 className='bold xsmall'>{sizeBlocks[this.state.active].fields.maleHeight}</h5>
                    </div>
                  )}
                </div>

                <div className='button__group '>
                  <div className='bgw f jcc '>
                    <div onClick={() => this.toggleModel('female')} className={`button__group_s px1 ph2 ${this.state.model === 'female' && 'bgo cw'}`}><span className='bold caps'>Female</span></div>
                    <div onClick={() => this.toggleModel('male')} className={`button__group_s px1 ph2 ${this.state.model === 'male' && 'bgo cw'}`}><span className='bold caps'>Male</span></div>
                  </div>
                </div>
              </div>
            </Box>
          </Flex>
        </div>
      </div>
    )
  }
}

export default TSAApproved
