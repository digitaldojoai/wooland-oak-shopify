export default props => {
  return `
<div class='outer'>
  <div class='container'>
    <div class='article__text-centered mha ac'>
      <h2 class='h1 mv0 serif'>${props.title}</h2>
      <p class='mb0 h4'>${props.content}</p>
    </div>
  </div>
</div>
  `
}
