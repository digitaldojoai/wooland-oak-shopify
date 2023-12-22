
export default function accounts () {
  const header = document.querySelector('header')
  header.classList.add(['dark'], ['background'])

  const addressToggles = document.querySelectorAll('.address-new-toggle')
  const addressForm = document.getElementById('AddressNewForm')
  const addressEdit = document.querySelectorAll('.address-edit-toggle')
  const addressUpdateToggle = document.querySelectorAll('.address-update-toggle')
  const login = document.querySelector('.js-login-dialog')
  const recover = document.querySelector('.js-recover-dialog')
  const recoverLink = document.querySelector('.js-recover-trigger')
  const cancelRecoverLink = document.querySelector('.js-recover-cancel')
  /* eslint-disable */
  const recoverIsTarget = window.location.hash.match(/\#recover/) ? true : false
  /* eslint-enable */
  const successMessage = document.querySelector('.js-recover-success') !== null

  if (login) {
    if (recoverIsTarget || successMessage) {
      login.style.display = 'none'
      recover.style.display = 'block'
    } else {
      login.style.display = 'block'
    }
  }

  if (recoverLink) {
    recoverLink.addEventListener('click', (e) => {
      e.preventDefault()
      login.style.display = 'none'
      recover.style.display = 'block'
    })
  }

  if (cancelRecoverLink) {
    cancelRecoverLink.addEventListener('click', (e) => {
      e.preventDefault()
      recover.style.display = 'none'
      login.style.display = 'block'
    })
  }

  addressToggles.forEach((addressToggle) => {
    addressToggle.addEventListener('click', (e) => {
      e.preventDefault()
      addressForm.classList.toggle('hide')
    })
  })

  addressEdit.forEach((editToggle) => {
    const id = editToggle.getAttribute('data-form-id')
    editToggle.addEventListener('click', () => {
      const editForm = document.getElementById('EditAddress_' + id)
      editForm.classList.toggle('hide')
    })
  })

  addressUpdateToggle.forEach((closeToggle) => {
    closeToggle.addEventListener('click', (e) => {
      e.preventDefault()
      const form = closeToggle.parentNode.parentNode
      form.classList.toggle('hide')
    })
  })
}
