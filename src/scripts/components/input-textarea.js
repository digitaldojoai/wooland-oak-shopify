// export default wrapper => {
//   const textarea = wrapper.getElementsByTagName('textarea')[0]
//
//   function handleAddRemove (e) {
//     !!e.target.value ? add() : remove()
//   }
//
//   function add () {
//     wrapper.classList.add('has-value')
//   }
//
//   function remove () {
//     wrapper.classList.remove('has-value')
//   }
//
//   textarea.addEventListener('change', handleAddRemove)
//   textarea.addEventListener('blur', handleAddRemove)
//   textarea.addEventListener('focus', add)
//
//   return {
//     unmount () {
//       textarea.removeEventListener('change', handleAddRemove)
//       textarea.removeEventListener('blur', handleAddRemove)
//       textarea.removeEventListener('focus', add)
//     }
//   }
// }
