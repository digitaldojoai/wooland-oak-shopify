/* eslint-disable */
var enc = s => encodeURIComponent(s)

var merge = (target, ...args) => {
  args.forEach(a => Object.keys(a).forEach(k => target[k] = a[k]))
  return target
}

var openPopup = url => {
  var width = 500
  var height = 300
  var left = (screen.width / 2) - (width / 2)
  var top = (screen.height / 3) - (height / 2)

  window.open(url,'',`menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=${width},height=${height},top=${top},left=${left}`)
}

var networks = {
  pinterest: ({ image, url, description }) => (
    `https://pinterest.com/pin/create/bookmarklet/?media=${ image }&url=${ url }&description=${ enc(description) }`
  ),
  facebook: ({ url }) => (
    `http://www.facebook.com/sharer.php?u=${ url }`
  ),
  twitter: ({ url, description, via, hashtags }) => (
    `https://twitter.com/share?url=${ url }&text=${ enc(description) }${ via ? `&via=${via}` : '' }${ hashtags ? `&hashtags=${enc(hashtags)}` : '' }`
  ),
  tumblr: ({ url, title, description, image }) => (
    `https://www.tumblr.com/widgets/share/tool?posttype=photo&title=${ enc(title) }&caption=${ enc(description) }&content=${ image }&photo-clickthru=${ url }`
  )
}

/**
 * Scrape head for all social meta tags
 */
var getMeta = () => {
  var meta = {}
  var metaTags = [].slice.call(document.head.getElementsByTagName('meta'))

  for (var i = 0; i < metaTags.length; i++){
    var attributes = [].slice.call(metaTags[i].attributes);

    for (var a = 0; a < attributes.length; a++){
      var attr = attributes[a]

      if (attr.nodeName.match(/name|property/) && attr.value.match(/twitter|og/)){
        var property = attr.value.split(/^(\w+\:)/)[2]
        var selector = `[${attr.nodeName}="${attr.value}"]`

        var propertyValue = document.head.querySelector(selector).getAttribute('content') || false

        if (propertyValue) meta[property] = propertyValue
      }
    }
  }

  return meta
}

/**
 * Get names and values of all data-*
 * attributes on the share link
 *
 * @param {object} target The DOM node representing the social ink
 * @return {object}
 */
var parseLocalData = target => Array.prototype.slice.call(target.attributes).reduce((prev, curr) => {
  /data-/.test(curr.name) ? prev[curr.name.split(/data-/)[1]] = curr.value : null
  return prev
}, {})

export default (options = {}) => {
  var selector = options.selector || 'data-social'

  var meta = getMeta()

  var update = () => {
    meta = getMeta()
    bindLinks()
  }

  var bindLinks = () => {
    var targets = [].slice.call(document.querySelectorAll(`[${selector}]`)) || []

    targets.forEach((target) => {
      // var target = targets[i]

      var network = target.getAttribute(selector)
      var data = merge(meta, parseLocalData(target))
      var url = networks[network](data)

      target.onclick = e => {
        e.preventDefault()
        e.stopPropagation()
        openPopup(url)
      }
    })
  }

  bindLinks()

  return {
    update,
    getMeta
  }
}