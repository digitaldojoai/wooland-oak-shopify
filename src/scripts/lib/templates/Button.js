import cx from 'classnames'

export default ({ outline, small, orange, light, cta, url }) => {
  return `
<a href='${url}' class='${cx('button rel sans caps track', {
  'button--outline': outline,
  'button--small': small,
  'button--light': light,
  'button--orange': orange
})}' role='button'>
  <span class='f aic jcc'>
    ${cta}
  </span>
</a>
  `
}
