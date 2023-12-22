import ImageFill from 'lib/templates/ImageFill'
import cx from 'classnames'

export default props => {
  return `
<div class='${cx('article__two-up rel f aic fw')}' style='background-color: ${props.backgroundColor || '#fff'}; color: ${props.textColor || '#2F3439'}'>
  <div class='article__two-up__col rel fill-v f aic'>
    ${props.columnOneImage ? `
      <div class='__img rel fill-v fill-h'>
        ${ImageFill(props.columnOneImage)}
      </div>
      ` : `
      <div class='__inner outer mha'>
        ${props.columnOneLabel && `<h6 class='sans track caps mv0'>${props.columnOneLabel}</h6>`}
        ${props.columnOneTitle && `<h1 class='serif mv025'>${props.columnOneTitle}</h1>`}
        ${props.columnOneContent && `<p class='h4 mv0'>${props.columnOneContent}</p>`}
      </div>
    `}
  </div>
  <div class='article__two-up__col rel fill-v f aic'>
    ${props.columnTwoImage ? `
      <div class='__img rel fill-v fill-h'>
        ${ImageFill(props.columnTwoImage)}
      </div>
      ` : `
      <div class='__inner outer mha'>
        ${props.columnTwoLabel && `<h6 class='sans track caps mv0'>${props.columnTwoLabel}</h6>`}
        ${props.columnTwoTitle && `<h1 class='serif mv025'>${props.columnTwoTitle}</h1>`}
        ${props.columnTwoContent && `<p class='h4 mv0'>${props.columnTwoContent}</p>`}
      </div>
    `}
  </div>
</div>
  `
}
