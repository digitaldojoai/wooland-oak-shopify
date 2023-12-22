/** @jsx h */
import { h, Component } from 'preact'
import marked from 'marked'

class ArticleText extends Component {
  render ({content}) {
    const {
      textContent
    } = content.fields
    return (
      <section className='z1 rel'>
        <div className='rel f aic jcc'>
          <div className='container rel fill-h'>
            <div className='outer container--c container--a serif'>
              {textContent && (<div dangerouslySetInnerHTML={{ __html: marked(textContent) }} />)}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ArticleText
