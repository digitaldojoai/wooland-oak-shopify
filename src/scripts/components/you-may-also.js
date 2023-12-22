/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import stories from 'lib/stories'

import Modules from 'lib/modules'

class YouMayAlso extends Component {
  constructor (props) {
    super(props)
    this.state = {
      story: stories.get(props.slug) || null
    }
  }
  componentDidMount () {
    const storyCache = stories.get(this.props.slug)
    const header = document.querySelector('header')
    header.classList.remove('dark')

    if (this.state.story) {
      return
    }

    if (storyCache) {
      this.setState({story: storyCache})
      return true
    }
  }
  renderModules (modules) {
    return modules.map((module) => {
      const type = module.sys.contentType ? module.sys.contentType.sys.id : false
      if (type === 'moduleYouMayLike') {
        return <Modules module={module} type={type} />
      }
    })
  }
  render () {
    const { story } = this.state
    if (story) {
      return (
        <div>
          <div className='z0'>{ this.renderModules(story.contentModules) }</div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const slug = window.location.pathname.replace('/blogs/passport/', '')
  stories.on('updated', () => render(<YouMayAlso slug={slug} />, root))
  render(<YouMayAlso slug={slug} />, root)
}
