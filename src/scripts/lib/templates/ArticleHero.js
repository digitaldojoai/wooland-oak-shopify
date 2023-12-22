import ImageFill from 'lib/templates/ImageFill'
import { padZeros } from 'lib/util'
import cx from 'classnames'

export default props => {
  // props.lightHeader ? (
  //   header.classList.add('header--light')
  // ) : (
  //   header.classList.remove('header--light')
  // )

  return `
<div class='${cx('article__hero rel', {
  'cw': props.lightHeroText
})}'>
  <div class='article__hero__bg abs fill'>${ImageFill(props.backgroundImage, '2500px')}</div>

  <div class='article__hero__content outer fill-v'>
    <div class='container fill-v rel'>
      <div class='article__hero__fg abs fill rel fill-v'>${ImageFill(props.foregroundImage, '2200px')}</div>

      <div class='article__hero__title rel ac'>
        <div class='outer'>
          <p class='mv0 h6 sans track caps'>No. ${padZeros(props.storyNumber)}</p>
          <h1 class='h0 serif mt025'>${props.title}</h1>
        </div>
      </div>
    </div>
  </div>
</div>
  `
}
