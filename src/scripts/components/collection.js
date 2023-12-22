/** @jsx h */
// import React { Component } from 'react'
import { h, render, Component } from 'preact'
import pages from 'lib/pages'

// import Modules from 'lib/modules'

class Collection extends Component {
  render () {
    return (
      <div>Collections</div>
    )
  }
}

export default root => {
  pages.on('updated', () => render(<Collection />, root))
  render(<Collection />, root)
}

// /**
//  * @see https://community.algolia.com/react-instantsearch/guide/Widgets.html
//  * @see https://community.algolia.com/shopify/named-tags.html
//  */
// import React from 'react'
// import { render, unmountComponentAtNode } from 'react-dom'
// import cx from 'classnames'
// import { Flex, Box } from 'ffx'
// import Media from 'react-media'
// import Lazy from 'relaze'
// import {
//   InstantSearch
// } from 'react-instantsearch/dom'
// import {
//   connectRefinementList,
//   connectMultiRange,
//   connectHits,
//   connectMenu
// } from 'react-instantsearch/connectors'
// import Accordion from 'accornion'
// import { getSizedImageUrl, imageSize } from 'slater/images'
// import { formatMoney } from 'slater/currency'
// import unique from 'array-unique'
//
// /**
//  * Operator instance
//  */
// import router from 'lib/router'
//
// /**
//  * Scripts binding helper
//  */
// import * as scripts from 'micromanager'
//
// /**
//  * Vitual menu
//  * @see https://community.algolia.com/react-instantsearch/guide/Virtual_widgets.html
//  */
// const VirtualMenu = connectMenu(() => null)
// const Collection = ({ handle }) => <VirtualMenu attributeName='named_tags.collection' defaultRefinement={handle} />
//
// /**
//  * Lazy img
//  */
// class Img extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       loaded: false,
//     }
//   }
//
//   show() {
//     this.setState({
//       loaded: true,
//     })
//   }
//
//   render() {
//     let cx = `obj-fit abs fill js-obj-fit-image lazy-img`
//
//     if (this.state.loaded) cx += ' is-loaded'
//
//     return (
//       <div className={cx}>
//         <svg viewBox="0 0 100 86" className='abs fill mxa cg'>
//           <use xlinkHref="#logo"></use>
//         </svg>
//         <img className='fill-h fill-v abs fill' {...this.props} onLoad={this.show.bind(this)}/>
//       </div>
//     )
//   }
// }
//
// function createURL (state) {
//   return encodeURIComponent(JSON.stringify(state))
// }
//
// function writeQueryString (state) {
//   router.push(window.location.pathname + '?filter=' + createURL(state))
// }
//
// function readQueryString () {
//   const q = window.location.search.split('?filter=')[1]
//
//   return q ? JSON.parse(decodeURIComponent(q)) : {}
// }
//
// function Checkbox ({
//   count,
//   isRefined,
//   label,
//   value,
//   refine
// }) {
//   return (
//     <label className='f aic rel pv05 s6'>
//       <input type='checkbox' checked={isRefined} className='input--reset abs fill' onChange={e => {
//         refine(value)
//       }} />
//       <span className='__box abs left top bottom bgy' />
//       <span className='__label sans cm book'>{label}</span>
//     </label>
//   )
// }
//
// class Filter extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       open: false
//     }
//   }
//
//   render () {
//     const { open } = this.state
//     const {
//       refine,
//       items,
//       filterLabel,
//       setOpenFilter,
//       closeOpenFilter
//     } = this.props
//
//     return (
//       <div className='collection__filter s6'>
//         <button className='button--reset fill-h al s0 sans f aic jcb' onClick={e => {
//           if (!open) {
//             closeOpenFilter()
//             setOpenFilter(() => {
//               this.setState({ open: false })
//             })
//           }
//
//           setTimeout(() => {
//             this.setState({ open: !open })
//           }, 0)
//         }}>
//           <span>{filterLabel}</span>
//           <span>{open ? '-' : '+'}</span>
//         </button>
//
//         <Accordion
//           open={open}
//           duration={400}
//           easing='ease-in-out'>
//           <div className='collection__filter__values'>
//             {items.map(item => (
//               <Checkbox {...item} refine={refine} />
//             ))}
//           </div>
//         </Accordion>
//       </div>
//     )
//   }
// }
//
// const RefinementList = connectRefinementList(Filter)
// const Price = connectMultiRange(Filter)
//
// class ProductCard extends React.Component {
//   render () {
//     const {
//       image = '',
//       title,
//       price,
//       compare_at_price, // eslint-disable-line no-unused-vars
//       handle
//     } = this.props
//     const img = image ? getSizedImageUrl(
//       image.replace('_' + imageSize(image), ''), '1400x' // TODO hacky af
//     ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'
//     return (
//       <Box width={[1 / 2, [1050, 1 / 3]]} className='product-card block rel mb1 pb1'>
//         <a href={`/products/${handle}`} className='block rel'>
//           <span className='__bg abs fill bgw'/>
//           <div className='product-card__img rel'>
//             <Img src={img} />
//           </div>
//           <div className='product-card__content pv1 mv05 ac rel'>
//             <h6 className='mt0 mb05 sans caps track small'>{title}</h6>
//             <h6 className='mv0 sans caps cm small'>{formatMoney(price * 100, '${{amount_no_decimals}}')}</h6>
//           </div>
//         </a>
//       </Box>
//     )
//   }
// }
//
// const Feature = ({ title, url, background, image, alternateLayout }) => {
//   const img = image ? getSizedImageUrl(
//     image.replace('_' + imageSize(image), ''), '1400x' // TODO hacky af
//   ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'
//
//   return (
//     <Box width={1}>
//       <div className={cx('collection-feature fill-h f aic fw', {
//         'is-alt-layout': alternateLayout
//       })}>
//         <div className='collection-feature__img rel fill-h'>
//           <div class='__bg abs fill' style={{ backgroundColor: background }} />
//           <div class='__img rel' style={{ backgroundImage: `url(${img})` }} />
//         </div>
//
//         <div className='collection-feature__text f aic jcc ac fill-h'>
//           <div className='collection-feature__text__inner outer mha'>
//             <h6 className='mv0 sans track cm caps small medium'>Featured</h6>
//             <h2 className='mv05 serif'>{title}</h2>
//             <a href={url} className='underline-link h6 small sans medium track caps inline-block rel'>Shop Now</a>
//           </div>
//         </div>
//       </div>
//     </Box>
//   )
// }
//
// const Products = connectHits(
//   ({ hits, featureModules }) => {
//     const isFiltered = window.location.search.length > 0
//     const features = featureModules.slice(0)
//
//     const products = unique(hits.map(hit => hit.handle)).map(hit => hits.filter(h => h.handle === hit)[0])
//
//     return (
//       <Flex gutter={[1.3, [900, 2]]} wrap>
//         {products.reduce((hits, hit, i) => {
//           const index = i + 1
//           const insertFeature = index > 5 && index % 6 === 0
//
//           if (isFiltered || !insertFeature) {
//             hits.push(<ProductCard key={hit.id} {...hit} />)
//           } else {
//             const featureModule = features.shift()
//
//             if (featureModule) {
//               hits.push(<ProductCard key={hit.id} {...hit} />)
//               hits.push(<Feature {...featureModule} />)
//             } else {
//               hits.push(<ProductCard key={hit.id} {...hit} />)
//             }
//           }
//           return hits
//         }, [])}
//       </Flex>
//     )
//   }
// )
//
// class Filters extends React.Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       searchState: readQueryString(),
//       openFilter: null,
//       filtersOpen: false
//     }
//   }
//
//   setOpenFilter (closeCallback) {
//     this.setState({ openFilter: closeCallback })
//   }
//
//   closeOpenFilter () {
//     const { openFilter } = this.state
//
//     openFilter && openFilter()
//   }
//
//   onSearchStateChange (state) {
//     writeQueryString(state)
//     this.setState({ searchState: state })
//     scripts.mount()
//   }
//
//   render () {
//     const { filtersOpen } = this.state
//     const { featureModules, collectionHandle, children } = this.props
//
//     return (
//       <div className='collection__products'>
//         <InstantSearch
//           searchParameters={{
//             hitsPerPage: 100
//           }}
//           searchState={this.state.searchState}
//           onSearchStateChange={this.onSearchStateChange.bind(this)}
//           createURL={createURL}
//           appId='9ZZ5ZKVNKF'
//           apiKey='e5c8de702ee6efa6eb668281b7e7cac6'
//           indexName='shopify_products'>
//
//           {children}
//
//           <Flex gutter={[1, [900, 5.5]]} wrap>
//             <Box width={[1, [900, '330px']]}>
//               <div className='collection__filters rel'>
//                 <button className='collection__filter-button h5 caps track sans medium fill-h' onClick={e => {
//                   this.setState({ filtersOpen: !filtersOpen })
//                 }}>
//                   <div className='f aic jcb h6'>
//                     <span>Filters</span>
//                     <span className='__plus'>{filtersOpen ? '-' : '+'}</span>
//                   </div>
//                 </button>
//
//                 <Media query='(min-width: 56.26em)'>
//                   {match => (
//                     <Accordion
//                       open={match ? true : filtersOpen}
//                       duration={400}
//                       easing='ease-in-out'>
//                       <div>
//                         <RefinementList
//                           limitMax={20}
//                           showMore={true}
//                           transformItems={items => {
//                             if (collectionHandle === 'men') {
//                               return items.filter(item => /Alejandro|Miguel|Julian/ig.test(item.label))
//                             } else if (collectionHandle === 'women') {
//                               return items.filter(item => {
//                                 return /Alejandra|Miguel|Julia|Lisa|Sara/ig.test(item.label)
//                               })
//                             }
//                             return items
//                           }}
//                           attributeName='vendor'
//                           filterLabel='Style'
//                           setOpenFilter={this.setOpenFilter.bind(this)}
//                           closeOpenFilter={this.closeOpenFilter.bind(this)} />
//                         <RefinementList
//                           attributeName='named_tags.weight'
//                           filterLabel='Weight'
//                           setOpenFilter={this.setOpenFilter.bind(this)}
//                           closeOpenFilter={this.closeOpenFilter.bind(this)} />
//                         <RefinementList
//                           attributeName='named_tags.material'
//                           filterLabel='Material'
//                           setOpenFilter={this.setOpenFilter.bind(this)}
//                           closeOpenFilter={this.closeOpenFilter.bind(this)} />
//                         <RefinementList
//                           transformItems={items => {
//                             /**
//                              * Removes "women" and "men" since
//                              * those are handled via the Collection
//                              * vitual menu component
//                              */
//                             return items.filter(item => !/women|men/.test(item.label))
//                           }}
//                           attributeName='named_tags.collection'
//                           filterLabel='Collection'
//                           setOpenFilter={this.setOpenFilter.bind(this)}
//                           closeOpenFilter={this.closeOpenFilter.bind(this)} />
//                         <Price
//                           attributeName='price'
//                           filterLabel='Price'
//                           setOpenFilter={this.setOpenFilter.bind(this)}
//                           closeOpenFilter={this.closeOpenFilter.bind(this)}
//                           items={[
//                             { end: 200, label: '$0 - $200' },
//                             { start: 200, end: 400, label: '$200 - $400' },
//                             { start: 400, end: 600, label: '$400 - $600' },
//                             { start: 600, end: 800, label: '$600 - $800' },
//                             { start: 800, end: 1000, label: '$800 - $1000' },
//                             { start: 1000, label: '$1000+' }
//                           ]} />
//                       </div>
//                     </Accordion>
//                   )}
//                 </Media>
//               </div>
//             </Box>
//             <Box width={[1, [900, 'calc(100% - 330px)']]}>
//               <Products featureModules={featureModules} />
//             </Box>
//           </Flex>
//         </InstantSearch>
//       </div>
//     )
//   }
// }
//
// export default function collection (outer) {
//   const root = document.getElementById('collectionRoot')
//   const handle = outer.getAttribute('data-collection')
//   const features = JSON.parse(document.getElementById(`collectionFeatures`).innerHTML).map((f, i) => {
//     if ((i + 1) % 2 === 0) {
//       f.alternateLayout = true
//     }
//     return f
//   })
//
//   render((
//     <Filters featureModules={features} collectionHandle={handle}>
//       <Collection handle={handle} />
//     </Filters>
//   ), root)
//
//   /**
//    * TODO
//    * may need to unmount react app when navigating away
//    */
//   return {
//     unmount () {
//       unmountComponentAtNode(root)
//     }
//   }
// }
