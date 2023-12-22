/* eslint-disable */
import router from 'lib/router'
import Promise from 'promise-polyfill'
import * as scripts from 'micromanager'

/**
 * App styles
 */
import '../styles/main.css'

/**
 * Polyfill promise
 */
if (!window.Promise) {
  window.Promise = Promise
}

/**
 * Dev stuff
 */
if (module.hot) {
  module.hot.accept()
}
if (window.slater && window.slater.reload) {
  window.slater.reload()
}
/** Disable router inside the theme editor */
if (window.self !== window.top) {
  router.disable()
}

/**
 * Feature testing
 */
window.__features = {
  objectFit: document.documentElement.style.hasOwnProperty('objectFit'),
  touch: !!(('ontouchstart' in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch)
}
if (window.__features.touch){
  document.documentElement.classList.add('touchevents')
}
if (!window.__features.objectFit) {
  document.documentElement.classList.add('no-object-fit')
}

/**
 * Script management
 */
scripts.init({
  component: 'components/',
  util: 'util/'
})

scripts.mount()

/**
 * Share icons on the product page
 */
console.groupCollapsed('Site creditz 🍝')
console.log('Design & Development by The Couch https://thecouch.nyc')
console.log('Powered by https://www.contentful.com')
console.groupEnd()

/**
 * Send page views to
 * Google Analytics
 */
// function gaTrackPageView () {
//   if (!gtag) return
//
//   const data = {
//     page: window.location.pathname,
//     title: document.title
//   }
//
//   gtag('set', data)
//
//   gtag('send', 'pageview')
//
//   if (window.__debug) {
//     console.info('Google event', data)
//   }
// }
//
// gtag('send', 'event', {
//   eventCategory: 'Forms',
//   eventAction: 'submit',
//   eventLabel: 'Newsletter'
// })

router.on('afterRender', () => {
  var refreshIntervalId = setInterval(yotpoCheck(), 500)
  function yotpoCheck () {
    if (Yotpo) {
      const yotty = document.querySelector('.yotpo')
      if (yotty) {
        var api = new Yotpo.API(yotpo)
        api.refreshWidgets()
      }
        const yottyRev = document.querySelector('.yotpo-reviews')
        if (yottyRev) {
          var api = new Yotpo.API(yotpo)
          api.refreshWidgets()
        }

      clearInterval(refreshIntervalId)
    }
  }
  // gaTrackPageView()
  // sharers.update()
})
