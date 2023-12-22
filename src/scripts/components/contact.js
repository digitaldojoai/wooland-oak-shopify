// import conform from 'conform.js'

// function toQueryString (fields) {
//   let data = []

//   for (let key in fields) {
//     data.push(encodeURIComponent(key) + '=' + encodeURIComponent(fields[key]))
//   }

//   return data.join('&')
// }

// export default wrapper => {
//   const form = wrapper.getElementsByTagName('form')[0]

//   const instance = conform(form, {
//     '*': (node) => {
//       const valid = node.value !== ''
//       if (!valid) {
//         node.classList.add('has-error')
//       }
//       return valid
//     }
//   }, (err, data) => {
//     fetch(form.action, {
//       method: 'POST',
//       credentials: 'include',
//       body: toQueryString(data)
//     }).then(res => {
//       return res.text()
//     }).then(res => {
//       form.classList.add('was-successful')
//     })
//   })
// }

// export default wrapper => {
//   const form = wrapper.getElementsByTagName('form')[0]
//
//   form.onsubmit = e => {
//     window.ga && ga('send', 'event', {
//       eventCategory: 'Forms',
//       eventAction: 'submit',
//       eventLabel: 'Contact'
//     })
//
//     window.fbq && fbq('track', 'Lead', {
//       content_name: 'Contact',
//       content_category: 'Forms'
//     })
//
//     console.log('submit')
//   }
// }
