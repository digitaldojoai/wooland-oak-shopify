import cx from 'classnames'

export default ({ cta, url }) => {
  return `
<a class='${cx('underline-link h6 sans demi track caps inline-block rel small')}' href='${url}'>${cta}</a>
  `
}
