import operator from 'operator.js'
import stories from 'lib/stories'
import pages from 'lib/pages'
import products from 'lib/products'
import * as scripts from 'micromanager'
import images from 'lib/images'
import api from 'lib/contentful'

const router = operator({
  transitionSpeed: 400,
  routes: {
    '/blogs/passport/:slug': ({ slug }) => {
      const cached = stories.get(slug)

      if (cached) {
        return true
      }

      return api.getEntries({
        content_type: 'passports',
        'fields.slug': slug,
        include: 8
      }).then(({ items }) => {
        stories.set(slug, items[0].fields)
        stories.emit('updated')
        return true
      })
    },

    /**
     * Get all stories
     */
    '/blogs/passport': () => {
      return api.getEntries({
        content_type: 'passports',
        order: '-fields.publishedAt',
        include: 8
      }).then(({ items }) => {
        for (let item of items) {
          stories.set(item.fields.slug, item.fields)
        }
        stories.emit('updated')
        return true
      })
    },

    '/pages/collections': ({ slug }) => {
      console.log('collections page')
      return true
    },

    '/pages/:slug': ({ slug }) => {
      const cached = products.get(slug)
      if (cached) {
        return true
      }

      return api.getEntries({
        content_type: 'singlePage',
        'fields.slug': slug,
        include: 6
      }).then(({ items }) => {
        if (items[0]) {
          pages.set(slug, items[0].fields)
          pages.emit('updated')

          api.getEntries({
            content_type: '2PqfXUJwE8qSYKuM0U6w8M',
            include: 8
          }).then(({ items }) => {
            for (let item of items) {
              products.set(item.fields.slug, item.fields)
            }
            return true
          })
          return true
        }
      })
    },

    /**
     * Get single product
     */
    '/products/:slug': ({ slug }) => {
      const cached = products.get(slug)

      if (cached) {
        return true
      }

      return api.getEntries({
        content_type: '2PqfXUJwE8qSYKuM0U6w8M',
        'fields.slug': slug,
        include: 6
      }).then(({ items }) => {
        products.set(slug, items[0].fields)
        products.emit('updated')
        return true
      })
    },

    /**
     * Get the homepage
     */

    '/': () => {
      return true
        // api.getEntries({
        //   content_type: '2PqfXUJwE8qSYKuM0U6w8M',
        //   include: 8
        // }).then(({ items }) => {
        //   for (let item of items) {
        //     products.set(item.fields.slug, item.fields)
        //   }
        //   return true
        // })
    }
    // '/': () => {
    //   const cached = pages.get('home')
    //
    //   if (cached) return true
    //
    //   return api.getEntries({
    //     content_type: 'singlePage',
    //     'fields.slug': 'home',
    //     include: 6
    //   }).then(({ items }) => {
    //     pages.set('home', items[0].fields)
    //     pages.emit('updated')
    //
    //     api.getEntries({
    //       content_type: '2PqfXUJwE8qSYKuM0U6w8M',
    //       include: 8
    //     }).then(({ items }) => {
    //       for (let item of items) {
    //         products.set(item.fields.slug, item.fields)
    //       }
    //       return true
    //     })
    //     return true
    //   })
    // }
  }
})

/**
 * Handle unmounting and leave animations
 */
router.addRoute('*', () => {
  const cache = scripts.cache.dump()
  let modules = []

  for (let key in cache) {
    modules.push(cache[key])
  }

  return Promise.all(modules.map(mod => {
    return mod.leave ? mod.leave() : mod
  }))
})
/**
 * Remount scripts on new routes
 */
router.on('afterRender', requestedRoute => {
  scripts.unmount()

  const cartDrawer = scripts.cache.get('cart-drawer')
  cartDrawer && cartDrawer.close()
  const nav = scripts.cache.get('mobileNav')
  nav && nav.close()

  setTimeout(() => {
    scripts.mount()
    images.update().check()
  }, 0)
})

export default router
