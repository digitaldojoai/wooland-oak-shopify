import { removeItem, updateItem } from 'slater/cart'

export default item => {
  const button = item.getElementsByTagName('button')[0]
  const id = item.getAttribute('data-id')
  const qty = item.getAttribute('data-qty')

  const minus = item.querySelector('.js-minus')
  const plus = item.querySelector('.js-plus')

  button.addEventListener('click', e => {
    e.preventDefault()

    removeItem(id)
  })

  minus.addEventListener('click', e => {
    e.preventDefault()

    updateItem(id, (parseInt(qty) - 1))
  })

  plus.addEventListener('click', e => {
    e.preventDefault()
    updateItem(id, (parseInt(qty) + 1))
  })
}
