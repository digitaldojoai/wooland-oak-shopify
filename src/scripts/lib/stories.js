import mitt from 'mitt'

let cache = {}

const stories = {
  ...mitt(),
  set (slug, data) {
    cache[slug] = data
  },
  get (slug) {
    return cache[slug]
  },
  prev (slug) {
  },
  dump () {
    return cache
  }
}

export default stories
