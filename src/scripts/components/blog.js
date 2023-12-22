/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import storyCache from 'lib/stories'
import ImageFill from 'lib/templates/ImageFill'
import { Flex, Box } from 'ffx'
import moment from 'moment'

class Blog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // page: pages.get('home') || null
      stories: null
    }
  }
  componentDidMount () {
    const header = document.querySelector('header')
    header.classList.remove(['dark'], ['background'])

    const cache = storyCache.dump()
    const stories = Object.keys(cache).reduce((s, slug) => {
      s.push(cache[slug])
      return s
    }, [])

    const featured = stories.shift()

    this.setState({
      featured: featured,
      allStories: stories,
      stories: stories,
      activeCat: 'all'
    })
  }
  setVisible (tag) {
    this.setState({
      activeCat: tag
    })
    switch (tag) {
      case 'all':
        this.setState({
          stories: this.state.allStories
        })
        break
      case 'travel':
        let reducedStories = this.state.allStories.filter(story => story.tags.includes('travel'))
        this.setState({
          stories: reducedStories
        })
        break
      case 'places':
        let reducePlaces = this.state.allStories.filter(story => story.tags.includes('places'))
        this.setState({
          stories: reducePlaces
        })
        break
      case 'people':
        let reducePeople = this.state.allStories.filter(story => story.tags.includes('people'))
        this.setState({
          stories: reducePeople
        })
        break
    }
  }
  // visible (tags) {
  //   switch (this.state.activeCat) {
  //     case 'all':
  //       return true
  //     case 'places':
  //       let newStories = this.state.allStories.reduce((res, story) => {
  //         return res
  //       }, []).filter(story => story.tags.includes('places'))
  //
  //       this.setState({
  //         stories: newStories
  //       })
  //       break
  //     case 'people':
  //       return tags.includes('people')
  //     case 'travel':
  //       return tags.includes('travel')
  //   }
  // }
  renderModules (stories) {
    // return modules.map((module) => {
    //   const type = module.sys.contentType ? module.sys.contentType.sys.id : false
    //   return <Modules module={module} type={type} />
    // })
    return stories.map((story, i) => {
      let size
      if ((i + 1) % 2) {
        size = [700, 3 / 5]
      } else {
        size = [700, 2 / 5]
      }
      return (
        <Box width={[1, size]}>
          <div className={`blog__story rel ${story.tags}`}>
            <a href={`/blogs/passport/${story.slug}`} className='abs fit-x fill-h fill-v' />
            <div><img src={story.featuredImage.fields.file.url} /></div>
            <div className='px2 ac'>
              <p className='p4 mx0 px0 book'>{story.passportTitle}</p>
              <span className='small caps cgb gold mr05'>{story.tags} - </span><span className='small cgd bold'>{moment(story.publishedAt).format('MM.DD.YYYY')}</span>
              <p className='ph0 pt0 pb2 mb0 light'>{story.previewDescription}</p>
            </div>
          </div>
        </Box>
      )
    })
  }
  render () {
    const { stories, featured } = this.state
    if (stories && featured) {
      return (
        <div className='blog'>
          <div className='article__hero rel'>
            <div className='blog__featured z1 rel  fill-h fill-v px1'>
              <div className='container--xl mha f aie jcs fill-h fill-v'>
                <div className=''>
                  <p className='mb0 px0 s1 caps cw'>Featured Article</p>
                  <h2 className='cw mt0  mb05'>{featured.passportTitle}</h2>
                  <a href={`/blogs/passport/${featured.slug}`} className='cw underline underline--white caps bold'>Read More</a>
                </div>
              </div>
            </div>
            <ImageFill image={featured.featuredImage} />
          </div>
          <div className='bgw f jcc aic blog__features'>
            <h5 className={`caps mh1 xsmall bold ${this.state.activeCat === 'all' ? 'active' : ''}`} onClick={() => this.setVisible('all')}>All</h5>
            <h5 className={`caps mh1 xsmall bold ${this.state.activeCat === 'places' ? 'active' : ''}`} onClick={() => this.setVisible('places')}>Places</h5>
            <h5 className={`caps mh1 xsmall bold ${this.state.activeCat === 'travel' ? 'active' : ''}`} onClick={() => this.setVisible('travel')}>Travel Tips</h5>
            <h5 className={`caps mh1 xsmall bold ${this.state.activeCat === 'people' ? 'active' : ''}`} onClick={() => this.setVisible('people')}>People</h5>
          </div>
          <div className='container--xl mha blog__stories'>
            <Flex wrap gutter={2}>
              { this.renderModules(stories) }
            </Flex>
          </div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  storyCache.on('updated', () => render(<Blog />, root))
  render(<Blog />, root)
}
