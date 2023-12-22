import mitt from 'mitt'

let cache = {}

const products = {
  ...mitt(),
  set (slug, data) {
    cache[slug] = data
  },
  get (slug) {
    return cache[slug]
  },
  dump () {
    return cache
  }
}

export default products
