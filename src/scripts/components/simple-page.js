/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'

import Modules from 'lib/modules'

class SimplePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: pages.get(props.slug) || null
    }
  }
  componentDidMount () {
    const pageCache = pages.get(this.props.slug)
    const header = document.querySelector('header')
    header.classList.add(['dark'], ['background'])

    if (this.state.page) {
      return
    }

    if (pageCache) {
      this.setState({page: pageCache})
      return true
    }
  }
  renderModules (modules) {
    return modules.map((module) => {
      const type = module.sys.contentType ? module.sys.contentType.sys.id : false
      return <Modules module={module} type={type} />
    })
  }
  render () {
    const { page } = this.state
    if (page) {
      const {
        modules,
        title
      } = page
      return (
        <div className='single'>
          <div className='single__title title serif ac mt2'><h3>{title}</h3></div>
          <div className='simple__text'>{ this.renderModules(modules) }</div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const slug = window.location.pathname.replace('/pages/', '')
  pages.on('updated', () => render(<SimplePage slug={slug} />, root))
  render(<SimplePage slug={slug} />, root)
}
