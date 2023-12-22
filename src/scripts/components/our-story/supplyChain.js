/** @jsx h */
import { h, Component } from 'preact'
import { Flex, Box } from 'ffx'
import marked from 'marked'

class SupplyChain extends Component {
  render ({content}) {
    const {
      factoryDescription,
      factoryImage,
      supplyChainDescription,
      supplyChainGraphic,
      supplyChainMobileGraphic
    } = content.fields

    return (
      <section className='bgbeige z1 rel supply__chain_container'>
        <div className='rel f aic jcc px2'>
          <div className='container rel fill-h'>
            <div className='container--c container--l'>
              <div className='container--c container--m ac mb2'>
                {supplyChainDescription && (<div dangerouslySetInnerHTML={{ __html: marked(supplyChainDescription) }} />)}
              </div>
              <div className='ac'>
                <img className='conainter--mm mv2 supply__chain_mobile' src={supplyChainMobileGraphic.fields.file.url} />
                <img className='container--mm mv2 supply__chain_desktop' src={supplyChainGraphic.fields.file.url} />
              </div>
              <Flex wrap className='container--l bgw supply__chain_factory pt1 mt2' alignItems={`center`}>
                <Box width={[1, [900, 1 / 2]]} className='px1 ac'>
                  <img src={factoryImage.fields.file.url} />
                </Box>
                <Box width={[1, [900, 1 / 2]]} className='pt0 ph2 pb2'>
                  {factoryDescription && (<div className='light' dangerouslySetInnerHTML={{ __html: marked(factoryDescription) }} />)}
                </Box>
              </Flex>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SupplyChain
