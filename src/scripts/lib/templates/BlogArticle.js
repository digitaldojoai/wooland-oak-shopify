import UnderlineLink from 'lib/templates/UnderlineLink'

function padZeros (num) {
  return num.length < 3 ? (
    padZeros(0 + num)
  ) : (
    num
  )
}

export default props => {
  const url = `/blogs/stories/${props.slug}`

  return `
<div class='blog__article rel outer'>
  <div class='container'>
    <div class='f aic fw'>
      <div class='blog__article__img rel'>
        <div class='__bg rel' style='background-image: url("${props.backgroundImage.fields.file.url}")'></div>
        <div class='__fg rel mha abs fill' style='background-image: url("${props.foregroundImage.fields.file.url}")'></div>
        <a href='${url}' class='abs fill z1'></a>
      </div>
      <div class='blog__article__content outer'>
        <div class='__inner mha ac mv1 pv1'>
          <h6 class='mv0 sans cm track caps'>No. ${padZeros(props.storyNumber)}</h6>
          <h2 class='mv05 serif'>${props.title}</h2>
          ${UnderlineLink({
            cta: 'View Story',
            url: url
          })}
        </div>
      </div>
    </div>
  </div>
</div>
  `
}
