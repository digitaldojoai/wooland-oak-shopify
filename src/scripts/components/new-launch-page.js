/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'

import Modules from 'lib/modules'

class NewLaunchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: JSON.parse(props.data)
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
      if (type === 'moduleLargeHero') {
        let type = 'moduleGifHero'
        return <Modules module={module} type={type} />
      } else if (type === 'moduleCta') {
        let type = 'moduleCtaNewLaunch'
        return <Modules module={module} type={type} />
      } else if (type === 'moduleCoreValues') {
        let type = 'moduleThreeWideImages'
        return <Modules module={module} type={type} />
      } else if (type === 'moduleVideoText') {
        let type = 'moduleNewLaunchVideoText'
        return <Modules module={module} type={type} />
      } else if (type === 'moduleFeatureHighlights') {
        let type = 'moduleLaunchVideoFeatureHighlights'
        return <Modules module={module} type={type} />
      } else if (type === 'moduleMediumHero') {
        let type = 'moduleNewLaunchMediumHero'
        return <Modules module={module} type={type} />
      } else {
        return console.log('hi')
      }
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
  pages.on('updated', () => render(<NewLaunchPage data={root.dataset.local} />, root))
  render(<NewLaunchPage data={root.dataset.local} />, root)
}
