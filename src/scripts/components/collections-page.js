/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
// import srraf from 'srraf'
// import pages from 'lib/pages'

import Modules from 'lib/modules'

class SinglePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: JSON.parse(props.data)
    }
  }
  componentDidMount () {
    // const pageCache = pages.get(this.props.slug)
    const header = document.querySelector('header')
    header.classList.add(['background'], ['dark'])

    /* eslint-disable */
    if (this.state.page) return
    /* eslint-enable */
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
        <div className='single'>
          <div class='hero rel f aic jcc hero--single collection'>
            <div class='abs fill f jcc aic'>
              <div class='obj-fit abs fill js-obj-fit-image lazy-img is-loaded'>
                <img class='fill-h fill-v abs fill' src='//images.ctfassets.net/mhcx2sypq9if/6diWeMWh6EIei2sUgg6U4c/142540f2e4cc5ec3ea4949b8689a47c8/press-hero.jpg?fm=jpg&amp;fl=progressive' />
              </div>
              <div class='container rel fill-h'>
                <div class='outer container--c container--l'>
                  <div class='ac'>
                    <h1 class='mv0 serif mv025 mt2 hero-h1 cw'><h2 id='in-the-press'>The right companion<br />makes the journey</h2>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          { this.renderModules(page.modules) }
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  const slug = window.location.pathname.replace('/pages/', '')
  // pages.on('updated', () => render(<SinglePage slug={slug} data={root.dataset.local} />, root))
  render(<SinglePage slug={slug} data={root.dataset.local} />, root)
}
