/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import nav from 'lib/nav'
import { Flex, Box } from 'ffx'
import cx from 'classnames'
import marked from 'marked'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nav: nav.get('nav') || null,
      activeLink: 0,
      hovering: false
    }
  }
  componentDidMount () {
    const navCache = nav.get('nav')

    if (this.state.nav) return

    if (navCache) {
      this.setState({nav: navCache})
      return true
    }
  }

  navClick (name, slug) {
    this.setState({hovering: false})
    /* eslint-disable */
    dataLayer.push({
      event: 'megaNavClick',
      buttonText: name,
      buttonAction: 'Link',
      target: slug
    })
    /* eslint-enable */
  }

  render () {
    const { nav, hovering } = this.state
    if (nav) {
      /* eslint-disable */
      const { links, featuredLinks, linkListTitle } = nav
      /* eslint-enable */
      return (
        <div className='bold fill-v f aic header__mega_container' onmouseenter={() => this.setState({hovering: true})} onmouseleave={() => this.setState({hovering: false})}>
          <div className='bold fill-v f aic pointer z1'>
            <span className='mr05'>Products</span>
            {/* eslint-disable */}
            <svg className={`down-arrow ${hovering ? 'flip' : ''}`} width='14px' height='8px' viewBox='0 0 14 8'><g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Navigation/Fill/White' transform='translate(-185.000000, -70.000000)' stroke-width='2' stroke='#000000'><g id='Navigation/Hover'><g id='Links'><polyline id='Rectangle-3' transform='translate(192.000000, 71.000000) rotate(-225.000000) translate(-192.000000, -71.000000) ' points='188 67 188 67 196 67 196 75'></polyline></g></g></g></g></svg>
            {/* eslint-enable */}
          </div>
          <div className={cx('header__mega ph1', {
            'active': hovering
          })}>
            <div className='outer'>
              <div className='container--xl container--c'>
                <Flex wrap alignItems='stretch'>
                  <Box width={[0.95 / 2]}>
                    <Flex alignItems='stretch'>
                      <Box width={[3 / 9]}>
                        <div>
                          <h4 className='serif cb mb0 pb05 p4 mt1 normal' />
                          {links.map((link, i) => {
                            const { productName, slug } = link.fields
                            const active = i === this.state.activeLink
                            return (
                              <div>
                                <a href={`/${slug}`} onclick={() => this.navClick(productName, slug)} className={cx('header__mega_link sans p2 pb05 nw normal', {
                                  'active': active
                                })} onmouseenter={() => this.setState({activeLink: i})}>
                                  {productName}
                                  {/* eslint-disable */}
                                  <svg className='ml05' width='8px' height='13px' viewBox='0 0 8 13'><g id='Navigation' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Navigation-3' transform='translate(-207.000000, -256.000000)' stroke-width='2' stroke='#CC663A'><g id='Navigation---Products-Open'><polyline id='Rectangle-3' transform='translate(207.656854, 262.656854) scale(1, -1) rotate(-315.000000) translate(-207.656854, -262.656854) ' points='203.656854 258.656854 203.656854 258.656854 211.656854 258.656854 211.656854 266.656854'></polyline></g></g></g></svg>
                                  {/* eslint-enable */}
                                </a>
                              </div>
                            )
                          })}
                          {/* <a href='/pages/collections' onclick={() => this.navClick('Collections', '/pages/collections')} className='header__mega_link header__mega_link_all caps pb2 mt2 co bold'>See All</a> */}
                        </div>
                      </Box>
                      <Box width={[6 / 9]}>
                        <div className='header__mega_featured'>
                          {links.map((link, i) => {
                            const { image, productName, slug, description } = link.fields
                            const active = i === this.state.activeLink
                            return (
                              <div
                                style={{backgroundImage: 'url(' + image.fields.file.url + ')'}}
                                className={cx('header__mega_featured_image', {
                                  'active': active
                                })}>
                                <a onclick={() => this.navClick(productName, slug)} className='abs fill z1' href={`/${slug}`} />
                                <h4 className='serif px1 mx0 normal'>{productName}</h4>
                                {description && (
                                  <div className='normal px1 header__mega_description bgbl cw'>
                                    <div dangerouslySetInnerHTML={{ __html: marked(description) }} />
                                  </div>)}
                                <img src={image.fields.file.url} />
                              </div>
                            )
                          })}
                        </div>
                      </Box>
                    </Flex>
                  </Box>
                  <Box width={[1.05 / 2]}>
                    <div className='header__mega_featured_items pv1'>
                      <h5 className='mb0 pb0'>Featured</h5>
                      <Flex wrap gutter={1}>
                        {featuredLinks.map((link) => {
                          const { featureProductImage, featureProductSubtitle, slug, featureProductTitle } = link.fields
                          return (
                            <Box width={[1 / 2]}>
                              <div className='rel header__mega_featured_item'>
                                <div
                                  style={{backgroundImage: 'url(' + featureProductImage.fields.file.url + ')'}}
                                  className='header__mega_featured_img rel'>
                                  <img src={featuredLinks[0].fields.featureProductImage.fields.file.url} />
                                </div>

                                <a onclick={() => this.setState({hovering: false})} className='abs fill' href={`/products/${slug}`} />
                                <div className='f jcs aic'>
                                  <p className='normal serif px0 mx0'>{featureProductTitle}</p>
                                  {featureProductSubtitle && (
                                    <h5 className='header__mega_featured_items_sub bold cgd mx0 px0'>{featureProductSubtitle}</h5>
                                  )}
                                </div>
                              </div>
                            </Box>
                          )
                        })}
                      </Flex>
                    </div>
                  </Box>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      )
    } else { return (<div />) }
  }
}

export default root => {
  nav.on('updated', () => render(<Nav />, root))
  render(<Nav />, root)
}
