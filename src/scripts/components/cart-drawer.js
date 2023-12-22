import * as scripts from 'micromanager'
import { on, fetchCart } from 'slater/cart'
import { getSizedImageUrl, imageSize } from 'slater/images'
import { formatMoney } from 'slater/currency'

const X = `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentcolor" stroke-width="3" style="display:inline-block;vertical-align:middle;overflow:visible;"><path d="M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179"></path><path d="M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179"></path></svg>`

function createItem ({
  variant_id: id,
  product_title: title,
  line_price: price,
  variant_title: color,
  image,
  url,
  quantity,
  ...item
}) {
  const img = image ? getSizedImageUrl(
    image.replace('_' + imageSize(image), ''), '200x' // TODO hacky af
  ) : 'https://source.unsplash.com/R9OS29xJb-8/2000x1333'
  return `
<div class='cart-drawer__item' data-component='cart-drawer-item' data-id=${id} data-qty=${quantity}>
  <div class='f aic'>
    <a href='${url}'>
      <img src='${img}' />
    </a>
    <div class='__content pl1 f fill-h ais jcb rel'>
      <div>
        <a href='${url}' class='serif mv0 p2 mv0'>${title}</a>
        <div class='small sans track mt025 mb05 bold'>${formatMoney(price)}</div>
        <div class='f jcs aic'>
          <div class='xsmall sans track mt025 mb05 caps meidum'>Qty: ${quantity}</div>
          <h5 class='ml1 js-minus pointer qty-selector mx0 px0'><span>-</span></h5>
          <h5 class='js-plus pointer qty-selector mx0 px0'><span>+</span></h5>
        </div>
        ${color ? `<div class='xsmall sans caps track cm mv025 bold'>Color: ${color.split(':')[0]}</div>` : ``}
      </div>

      <button class='button--reset co'>${X}</button>
    </div>
  </div>
</div>
`
}

function renderItems (items) {
  return items.length > 0 ? (
    items.reduce((markup, item) => {
      markup += createItem(item)
      return markup
    }, '')
  ) : (
    `<div class='pv1'><p class='pv1 mv05 sans small cm i ac'>Your cart is empty</p></div>`
  )
}

// const upsells = [
//   {
//     id: '1157526749197',
//     title: 'Travel Pouch',
//     description: 'Try our Travel Pouch',
//     price: '65',
//     image: '//images.contentful.com/mhcx2sypq9if/3SdiYPSRpu0cmEg8yE0CUK/e581e589c71d8a880a24748a5105c28e/travel-pouch-sand.png'
//   },
//   {
//     id: '1157455642637',
//     title: 'Slim Wallet',
//     description: 'Try our Slim Wallet',
//     price: '45',
//     image: '//images.contentful.com/mhcx2sypq9if/4QtWL2umNGqOOWMyCYyO6y/756aa9aec767586d5c065fa9f0fe4814/slim-wallet-collection-1.png'
//   },
//   {
//     id: '1157537267725',
//     title: 'Zip Around Wallet',
//     description: 'Try our Zip Around Wallet',
//     price: '65',
//     image: '//images.contentful.com/mhcx2sypq9if/6vmvF1vfGgyougOUSS4Ck/c9cb002e59892d9f72030ce2607ff666/card-wallet-collection-1.png'
//   }
// ]

// function renderUpsells (upsells) {
//   let productSelected = Math.floor(Math.random() * 2)
//   let product = upsells[productSelected]
//   return `
// <div class='cart-drawer__upsell bgw drop-shadow mt1' data-component='cart-drawer-upsell' data-id=${product.id}>
//   <div class='f jcs aic'>
//     <div class='cart-drawer__upsell_image px1'>
//       <img src='${product.image}' />
//     </div>
//     <div class='px1'>
//       <p class='mv05'>${product.description}</p>
//       <div class='f jcs'>
//         <span class='mr1 small'>$${product.price}</span>
//         <div class='caps underline small pointer js-add-upsell'>Add to Cart</div>
//       </div>
//     </div>
//   </div>
// </div>
//   `
// }

export default outer => {
  let isOpen = false
  const overlay = outer.querySelector('.js-overlay')
  const closeButton = outer.querySelector('.js-close')
  const subtotal = outer.querySelector('.js-subtotal')
  const itemsRoot = outer.querySelector('.js-items')
  // const upsellRoot = outer.querySelector('.js-upsells')

  const loading = itemsRoot.innerHTML

  function render () {
    fetchCart().then(cart => {
      itemsRoot.innerHTML = renderItems(cart.items)
      subtotal.innerHTML = formatMoney(cart.total_price)
      // upsellRoot.innerHTML = renderUpsells(upsells)
      setTimeout(() => {
        scripts.mount()
      }, 0)
    })
  }

  function open () {
    outer.classList.add('is-active')

    itemsRoot.innerHTML = loading

    setTimeout(() => {
      outer.classList.add('is-visible')
      isOpen = true
      setTimeout(render, 1000)
    }, 50)
  }

  function close () {
    outer.classList.remove('is-visible')

    setTimeout(() => {
      outer.classList.remove('is-active')
      isOpen = false
    }, 400)
  }

  on('updated', ({ cart }) => {
    isOpen ? render() : open()
  })

  on('addon', ({ cart }) => {
    render()
  })

  overlay.addEventListener('click', close)
  closeButton.addEventListener('click', close)

  return {
    open,
    close: close
  }
}
