/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'
import jump from 'jump.js'

import Modules from 'lib/modules'
import scrollMonitor from 'scrollMonitor'

class SinglePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: pages.get(props.slug) || null
    }
  }
  componentDidMount () {
    const pageCache = pages.get(this.props.slug)
    const header = document.querySelector('header')
    header.classList.remove('dark')

    setTimeout(() => {
      this.monitorFixed()
    }, 1000)

    if (this.state.page) {
      return
    }

    if (pageCache) {
      this.setState({page: pageCache})
      return true
    }
  }
  monitorFixed () {
    let monitors = document.querySelector('.js-monitor')

    const highlighter = scrollMonitor.create(monitors, { top: 20 })
    highlighter.lock()

    highlighter.stateChange(() => {
      if (highlighter.isAboveViewport && highlighter.isFullyInViewport) {
        this.setState({ classes: 'fixed' })
      } else if (highlighter.isAboveViewport && !highlighter.isFullyInViewport) {
        // this.setState({ classes: 'bottom' })
      } else {
        this.setState({ classes: '' })
      }
    })
  }
  renderModules (modules) {
    return modules.map((module) => {
      const type = module.sys.contentType ? module.sys.contentType.sys.id : false
      if (type !== 'moduleFaq') return <Modules module={module} type={type} />
    })
  }
  renderFaqs (modules) {
    return modules.map((module) => {
      const type = module.sys.contentType ? module.sys.contentType.sys.id : false
      if (type === 'moduleFaq') return <Modules module={module} type={type} />
    })
  }
  render () {
    const { page } = this.state
    if (page) {
      const faqs = page.modules.slice(1)
      return (
        <div className='single faq'>
          { this.renderModules(page.modules) }
          <div className='container--xl mha js-monitor'>
            <div className={`faq__container px1 ${this.state.classes}`}>
              <div className={`faq__navigation ${this.state.classes}`}>
                <div className='bgw drop-shadow fill-h block px2'>
                  {faqs.map((faq) => {
                    const { title } = faq.fields
                    const clean = title.replace(/([^a-z0-9]+)/gi, '-').toLowerCase()
                    const jumper = `.js-${clean}`
                    return (
                      <p onClick={() => jump(jumper, { offset: -100 })} className='faq__line_item pb05'>{title}</p>
                    )
                  })}
                </div>
              </div>
              <div className='faq__page_content'>
                { this.renderFaqs(page.modules) }
              </div>
            </div>
          </div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const slug = window.location.pathname.replace('/pages/', '')
  pages.on('updated', () => render(<SinglePage slug={slug} />, root))
  render(<SinglePage slug={slug} />, root)
}
