import ImageFill from 'lib/templates/ImageFill'

export default props => {
  return `
<div class='outer'>
  <div class='container'>
    <div class='article__image-two-up mha ac f fw'>
      <div class='__col rel'>
        <div class='__img rel'>${ImageFill(props.imageLeft)}</div>
      </div>
      <div class='__col rel'>
        <div class='__img rel'>${ImageFill(props.imageRight)}</div>
      </div>
    </div>
  </div>
</div>
  `
}
