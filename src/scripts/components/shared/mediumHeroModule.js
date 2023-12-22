/** @jsx h */
import { h } from 'preact'
import ImageFill from 'lib/templates/ImageFill'
import marked from 'marked'

const MediumHeroModule = ({ content }) => {
  const {
    image,
    title
  } = content.fields
  return (
    <div className='hero rel f aic jcc hero--single'>
      <div className='abs fill'>
        <ImageFill image={image} />
      </div>
      <div className='container rel fill-h'>
        <div className='outer container--c container--l'>
          <div className='ac'>
            {title && (<h1 className='mv0 serif mv025 hero-h1 cw' dangerouslySetInnerHTML={{ __html: marked(title) }} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediumHeroModule
