import ImageFill from 'lib/templates/ImageFill'
import cx from 'classnames'

export default props => {
  return `
<div class='${cx('article__image-offset rel', {
  'is-right': !props.alignment // false === 'right'
})}'>
  <div class='__img rel fill-v'>
    ${ImageFill(props.image)}
  </div>
</div>
  `
}
