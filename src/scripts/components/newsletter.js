
export default function newsletter (form) {
  const success = document.querySelector('.js-success')
  /* eslint-disable */
  KlaviyoSubscribe.attachToForms(form, {
    hide_form_on_success: true,
    success: () => {
      success.classList.remove('hide')
      success.classList.add('active')
    }
  });
  /* eslint-enable */
}
