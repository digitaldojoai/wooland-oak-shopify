import ImageFill from 'lib/templates/ImageFill'

export default (props) => {
  return `
    <section>
      <div class='hero rel f aic jcc'>
        <div class='abs fill'>${ImageFill(props.images[0])}</div>
        <div class='container rel fill-h'>
          <div class='outer container--c container--l'>
            <div class='ac'>
              <h1 class='mv0 serif mv025 hero-h1 cw'>${props.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
