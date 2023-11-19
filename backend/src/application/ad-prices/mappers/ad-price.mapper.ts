import { AdPrice as PersistenceAdPrice } from '@prisma/client'
import { AdPrice } from '../../ad-prices/domain/ad-price'
import { MapperError } from '@/core/errors/MapperErrors'

export class AdPriceMapper {
  static toDomain(raw: PersistenceAdPrice) {
    const adPriceOrError = AdPrice.create(
      {
        bannerPrice: raw.banner_price,
        wholePagePrice: raw.whole_page_price,
        doublePagePrice: raw.double_page_price,
        beginningPrice: raw.beggining_price,
        middlePrice: raw.middle_price,
        endPrice: raw.end_price,
        magazineId: raw.magazine_id,
      },
      raw.id,
    )

    if (adPriceOrError.isLeft()) {
      throw new MapperError(adPriceOrError.value.message)
    }

    return adPriceOrError.value
  }

  static async toPersistence(adPrice: AdPrice) {
    return {
      id: adPrice.id,
      banner_price: adPrice.props.bannerPrice,
      whole_page_price: adPrice.props.wholePagePrice,
      double_page_price: adPrice.props.doublePagePrice,
      beggining_price: adPrice.props.beginningPrice,
      middle_price: adPrice.props.middlePrice,
      end_price: adPrice.props.endPrice,
      magazine_id: adPrice.props.magazineId,
    }
  }
}
