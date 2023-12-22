/** @jsx h */
import { h } from 'preact'

const PressSingle = ({ content }) => {
  const {
    companyLogo,
    externalLink,
    shortDescription
  } = content.fields
  return (
    <div className='ac bgw fill-v press__single'>
      <div className='bgf px2'>
        <img style={{maxWidth: '160px'}} src={companyLogo.fields.file.url} />
      </div>
      <div className='px2'>
        <p className='p1'>{shortDescription}</p>
        <a href={externalLink} target='_blank' className='caps s5 bold'>Read More</a>
      </div>
    </div>
  )
}

export default PressSingle
