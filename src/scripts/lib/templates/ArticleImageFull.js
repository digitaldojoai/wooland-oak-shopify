import ImageFill from 'lib/templates/ImageFill'

export default props => {
  return `
<div class='article__image-full rel'>
  <div class='__bg rel fill-v'>
    ${ImageFill(props.backgroundImage)}
  </div>

  ${props.foregroundImage ? `
  <div class='__fg rel mha outer abs mha fill'>
    <div class='__img fill-v rel'>${ImageFill(props.foregroundImage)}</div>
  </div>
  ` : ''}
</div>
  `
}
