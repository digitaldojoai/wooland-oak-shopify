/** @jsx h */
import { h, Component } from 'preact'
import Button from 'components/button'

class FAQ extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: null
    }
  }
  toggle (i, question) {
    if (i === this.state.active) {
      this.setState({active: null})
    } else {
      this.setState({active: i})
    }
    /* eslint-disable */
    dataLayer.push({
      event: 'faqOpen',
      faqQuestion: question
    })
    /* eslint-enable */
  }
  render ({ content }) {
    const {
      title,
      individualFaq,
      buttonTitle
    } = content.fields
    var clean = title.replace(/([^a-z0-9]+)/gi, '-').toLowerCase()
    return (
      <div className={`wrapper pv2 z1 rel z1 bgg js-faq faq__wrapper js-${clean}`}>
        <div className='container--m container--c'>
          <div className='outer ph2'>
            <div><h4 className='serif mt0 mb05'>{title}</h4></div>
            {individualFaq.map((faq, i) => {
              const {
                question, answer
              } = faq.fields
              return (
                <div className='faq al rel' onClick={() => this.toggle(i, question)}>
                  <div className={`faq__toggle ${this.state.active === i ? 'active' : null}`}><div className='faq__cross' /></div>
                  <div className='faq__content'>
                    <strong className='bold pv2'>{question}</strong>
                    {this.state.active === i && (
                      <p className='light  pt1'>{answer}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className='faq__button'>
            <div className='mt2'>
              {Button({
                url: '/pages/faq',
                cta: buttonTitle,
                light: true
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FAQ
