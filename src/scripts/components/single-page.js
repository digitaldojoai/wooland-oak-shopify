/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'

import Modules from 'lib/modules'

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
    if (this.props.slug === 'collections') {
      header.classList.add(['background'], ['dark'])
    } else {
      header.classList.remove(['dark'], ['background'])
    }

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
      return (
        <div className='single'>{ this.renderModules(page.modules) }</div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const slug = window.location.pathname.replace('/pages/', '')
  pages.on('updated', () => render(<SinglePage slug={slug} />, root))
  render(<SinglePage slug={slug} />, root)
}
