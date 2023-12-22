/** @jsx h */
import { h } from 'preact'
import PressSingle from './pressSingle'
import { Flex, Box } from 'ffx'

const PressItems = ({ content }) => {
  const {
    // pressDownloadCta,
    pressItems,
    // pressKitDownload,
    pressTitle
  } = content.fields
  return (
    <div className='bgg pb2'>
      <div className='outer pb2'>
        <div className='container--l mha ac'>
          <h4 className='serif mb2'>{pressTitle}</h4>
          <Flex wrap gutter={[0, [500, 1], [900, 2]]} alignItems={`stretch`}>
            {pressItems.map((press, i) => (
              <Box key={i} width={[1, [500, 1 / 2], [900, 1 / 3]]} className='mb2'>
                <PressSingle content={press} />
              </Box>
            ))}
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default PressItems
