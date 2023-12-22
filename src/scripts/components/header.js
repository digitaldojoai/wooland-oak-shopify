/** @jsx h */
// import React { Component } from 'react'
import * as scripts from 'micromanager'
import { on } from 'slater/cart'

import navCache from 'lib/nav'
import api from 'lib/contentful'

export default header => {
  /**
   * Menu toggling
   */
  let isOpen = false
  let focusNode = document.activeElement
  let closeTimeout = null
  const toggle = header.querySelector('.js-toggle')
  const promo = header.querySelector('.js-close-bar')
  const promoBar = header.querySelector('.js-promo')
  const nav = document.getElementById('nav-overlay')
  const links = nav.querySelectorAll('a')

  function isEsc (e) {
    e.keyCode === 27 && close()
  }

  setTimeout(() => {
    header.classList.add('slide-down')
  }, 1200)

  function fetchNav () {
    const cached = navCache.get('nav')

    if (cached) {
      return true
    }

    return api.getEntries({
      content_type: 'moduleMegaNav',
      'fields.slug': 'main-nav'
    }).then(({ items }) => {
      navCache.set('nav', items[0].fields)
      navCache.emit('updated')
      return true
    })
  }

  function open () {
    closeTimeout && clearTimeout(closeTimeout)

    header.classList.add('nav-is-open')

    focusNode = document.activeElement

    document.body.style.overflow = 'hidden'

    nav.setAttribute('tabindex', '0')
    nav.setAttribute('aria-hidden', 'false')
    nav.style.display = 'block'

    setTimeout(() => {
      nav.style.opacity = 1
      nav.focus()
    }, 0)

    document.addEventListener('keyup', isEsc)

    isOpen = true
  }

  function close () {
    header.classList.remove('nav-is-open')

    document.body.style.overflow = ''

    nav.removeAttribute('tabindex')
    nav.setAttribute('aria-hidden', 'true')
    nav.style.opacity = 0

    focusNode && focusNode.focus()

    closeTimeout = setTimeout(() => {
      nav.style.display = 'none'
    }, 2000)

    document.removeEventListener('keyup', isEsc)

    isOpen = false
  }

  toggle.addEventListener('click', e => {
    isOpen ? close() : open()
  })

  links.forEach(link => {
    link.addEventListener('click', () => {
      close()
    })
  })

  function closeBar () {
    promoBar.classList.add('hidden')
    setTimeout(() => {
      promoBar.style.display = 'none'
    }, 250)
  }

  if (promo) {
    promo.addEventListener('click', e => {
      closeBar()
    })
  }

  /**
   * Scrolling
   */
  let over = false
  let body = document.querySelector('body')

  window.addEventListener('scroll', e => {
    if (window.scrollY > 1 && !over) {
      over = true
      header.classList.add('is-scrolled')
      body.classList.add('is-scrolling')
    } else if (window.scrollY < 1 && over) {
      over = false
      header.classList.remove('is-scrolled')
      body.classList.remove('is-scrolling')
    }
  })

  /**
   * Cart opening
   */
  const cartToggles = header.querySelectorAll('.js-cart-drawer-toggle')
  for (let toggle of cartToggles) {
    toggle.addEventListener('click', e => {
      e.preventDefault()

      const cartDrawer = scripts.cache.get('cart-drawer')

      cartDrawer.open()
    })
  }
  const cartCounts = header.querySelectorAll('.js-cart-count')
  on('updated', ({ cart }) => {
    for (let count of cartCounts) {
      count.innerHTML = cart.item_count
    }
  })
  on('addon', ({ cart }) => {
    for (let count of cartCounts) {
      count.innerHTML = cart.item_count
    }
  })

  fetchNav()

  return {
    displayName: 'mobileNav',
    open,
    close
  }
}
