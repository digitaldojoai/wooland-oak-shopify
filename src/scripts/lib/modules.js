/** @jsx h */
import { h, Component } from 'preact'
/** Shared Components */
import GifHeroModule from 'components/shared/GifHeroModule'
import LargeHeroModule from 'components/shared/LargeHeroModule'
import MediumHeroModule from 'components/shared/mediumHeroModule'
import MediumNewLaunchHeroModule from 'components/shared/mediumNewLaunchHeroModule'
import CTA from 'components/shared/CTA'
import CTANewLaunch from 'components/shared/CTANewLaunch'
import Icons from 'components/shared/icons'
import FAQ from 'components/shared/FAQ'
import YouMayLike from 'components/shared/youMayLike'
import SlideshowTestimonials from 'components/shared/slideshowTestimonials'

/** Home Specific */
import CoreValues from 'components/home/coreValues'
import DoubleWideImages from 'components/home/doubleWideImages'
import ThreeWideImages from 'components/home/threeWideImages'
import LaunchVideoFeatureHighlights from 'components/home/launchVideoFeatureHighlights'
import StopMotion from 'components/stopMotion'

/** Product Specific */
import ProductGrid from 'components/productGrid'
import FeatureHighlights from 'components/product/featureHighlights'
import TSAApproved from 'components/product/tsaApproved'
import NewLaunchVideoText from 'components/product/newLaunchVideoText'
import VideoText from 'components/product/videoText'

/** Article Specific */
import ImageText from 'components/imageText'
import ArticleText from 'components/articles/articleText'
import FullImage from 'components/articles/fullImage'
import TwoColumnImage from 'components/articles/twoColumnImage'
import PressItems from 'components/press/pressItems'

/** Our Story */
import SupplyChain from 'components/our-story/supplyChain'

class Modules extends Component {
  render () {
    const { module, type } = this.props
    switch (type) {
      case 'moduleGifHero':
        return <GifHeroModule content={module} />
      case 'moduleLargeHero':
        return <LargeHeroModule content={module} />
      case 'moduleCta':
        return <CTA content={module} />
      case 'moduleCtaNewLaunch':
        return <CTANewLaunch content={module} />
      case 'moduleIcon':
        return <Icons content={module} />
      case 'moduleFaq':
        return <FAQ content={module} />
      case 'moduleCoreValues':
        return <CoreValues content={module} />
      case 'moduleDoubleWideImages':
        return <DoubleWideImages content={module} />
      case 'moduleThreeWideImages':
        return <ThreeWideImages content={module} />
      case 'moduleLaunchVideoFeatureHighlights':
        return <LaunchVideoFeatureHighlights content={module} />
      case 'moduleNewLaunchMediumHero':
        return <MediumNewLaunchHeroModule content={module} />
      case 'moduleStopMotion':
        return <StopMotion content={module} />
      case 'moduleYouMayLike':
        return <YouMayLike content={module} />
      case 'moduleMediumHero':
        return <MediumHeroModule content={module} />
      case 'moduleProductGrid':
        return <ProductGrid content={module} />
      case 'moduleFeatureHighlights':
        return <FeatureHighlights content={module} />
      case 'moduleTsaApproved':
        return <TSAApproved content={module} />
      case 'moduleSlideshow':
        return <SlideshowTestimonials content={module} />
      case 'moduleSupplyChain':
        return <SupplyChain content={module} />
      case 'moduleImageText':
        return <ImageText content={module} />
      case 'moduleVideoText':
        return <VideoText content={module} />
      case 'moduleNewLaunchVideoText':
        return <NewLaunchVideoText content={module} />
      case 'modulePassportText':
        return <ArticleText content={module} />
      case 'modulePassportFullImage':
        return <FullImage content={module} />
      case 'modulePassportTwoColumn':
        return <TwoColumnImage content={module} />
      case 'modulePressItems':
        return <PressItems content={module} />
    }
  }
}

export default Modules
