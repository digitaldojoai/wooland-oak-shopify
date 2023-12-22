/** @jsx h */
import { h } from 'preact'
import cx from 'classnames'

const handleClick = (cta, url) => {
  /* eslint-disable */
  dataLayer.push({
    event: 'ctaClick',
    buttonText: cta,
    buttonAction: 'Link',
    target: url
  })
  /* eslint-enable */
}

export default ({ outline, small, blue, white, orange, light, cta, url, external }) => {
  return (
    <a target={external ? '_blank' : ''} onClick={() => handleClick(cta, url)} href={url} class={cx('button rel f aic jcc sans caps track', {
      'button--outline': outline,
      'button--small': small,
      'button--light': light,
      'button--blue': blue,
      'button--orange': orange,
      'button--white': white
    })} role='button'>
      <span class='f aic jcc'>
        {cta}
      </span>
    </a>
  )
}
