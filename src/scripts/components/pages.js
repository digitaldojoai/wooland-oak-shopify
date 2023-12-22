/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'

import Modules from 'lib/modules'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: JSON.parse(props.data)
    }
  }
  componentDidMount () {
    // const pageCache = pages.get('home')
    const header = document.querySelector('header')
    header.classList.remove(['dark'], ['background'])

    /* eslint-disable */
    if (this.state.page) return

    // if (pageCache && this.state.page !== null) {
    //   this.setState({page: pageCache})
    //   return true
    // }
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
        <div className='home'>{ this.renderModules(page.modules) }</div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  // console.log('sup roots', root.dataset.local)
  pages.on('updated', () => render(<Page data={root.dataset.local} />, root))
  render(<Page data={root.dataset.local} />, root)
}
