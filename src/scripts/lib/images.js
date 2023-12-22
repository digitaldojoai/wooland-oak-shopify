import layzr from 'layzr.js'

const images = layzr({
  normal: 'data-normal'
}).handlers(true)

images.on('src:after', img => {
  img.parentNode.classList.add('is-loaded')

  // if (!__features.objectFit) {
  //   console.log('stuff?')
  //   img.parentNode.style.backgroundImage = `url(${img.src})`
  //   img.style.opacity = 0
  //
  //   const loader = img.parentNode.getElementsByTagName('svg')[0]
  //   if (loader) loader.style.display = 'none'
  // }
})

document.addEventListener('DOMContentLoaded', () => {
  images
    .update()
    .check()
})

export default images
