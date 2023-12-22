import ImageFill from 'lib/templates/ImageFill'
import Button from 'lib/templates/Button'
import { padZeros } from 'lib/util'

export default props => {
  // props.lightHeader ? (
  //   header.classList.add('header--light')
  // ) : (
  //   header.classList.remove('header--light')
  // )

  return `
<div class='one one--blog-hero rel'>
  <div class='one__imgs rel fill-v'>
    ${ImageFill(props.backgroundImage, '2500x')}

    <div class='one__foreground one__container container rel fill-v'>
      ${ImageFill(props.foregroundImage, '2200x')}
    </div>
  </div>

  <div class='one__content'>
    <div class='one__container container fill-v rel'>
      <div class='one__content__inner fill f aic fw outer' style='background-color: ${props.backgroundColor}; color: ${props.textColor}'>
        <div class='one__content__label fill-h left right'>
          <h6 class='mv0 sans ac caps track book small'>Featured Story</h6>
        </div>

        <div class='fa ac mt05 mb1 pv1'>
          <h2 class='h1 mt0 mb025 serif'>${props.title}</h2>

          ${Button({
            cta: 'Read the Story',
            url: `/blogs/stories/${props.slug}`,
            light: true,
            outline: true
          })}
        </div>

        <div class='one__content__label fill-h left right'>
          <h6 class='mv0 sans ac caps track book small'>No. ${padZeros(props.storyNumber)}</h6>
        </div>
      </div>
    </div>
  </div>
</div>
  `
}
