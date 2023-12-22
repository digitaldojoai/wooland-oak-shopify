import { addVariant } from 'slater/cart'

export default item => {
  const id = item.getAttribute('data-id')

  const add = item.querySelector('.js-add-upsell')

  add.addEventListener('click', e => {
    e.preventDefault()
    addVariant({id: id}, 1)
  })
}
