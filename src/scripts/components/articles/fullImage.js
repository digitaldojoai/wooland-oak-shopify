/** @jsx h */
import { h } from 'preact'
import Button from 'components/button'

const FullImage = ({ content }) => {
  const {
    shopableReference
  } = content.fields
  let url
  if (shopableReference) {
    url = `/products/${shopableReference.fields.slug}`
  }
  return (
    <div className='mha container--mm pv1 rel'>
      {shopableReference && (
        <div className='abs fit-x article__shopable'>
          {Button({
            url: url,
            cta: `Shop ${shopableReference.fields.productName}`,
            light: true
          })}
        </div>
      )}
      <img src={content.fields.image.fields.file.url} />
    </div>
  )
}

export default FullImage
