import { MapperError } from '@/core/errors/MapperErrors'
import { Article as PersistenceArticle } from '@prisma/client'
import { Article } from '../domain/article'

export class ArticleMapper {
  static toDomain(
    raw: PersistenceArticle,
    reporters?: string[],
    photographers?: string[],
  ) {
    const articleOrError = Article.create(
      {
        imagePath: raw.image_path,
        title: raw.title,
        subtitle: raw.subtitle,
        text: raw.text,
        editionId: raw.edition_id,
        categoryId: raw.category_id,
        themeId: raw.theme_id,
        numberOfPages: raw.number_of_pages,
        initialPage: raw.initial_page,
        finalPage: raw.final_page,
        isTopSeller: raw.is_top_seller,
        photographers: photographers,
        reporters: reporters,
      },
      raw.id,
    )

    if (articleOrError.isLeft()) {
      throw new MapperError(articleOrError.value.message)
    }

    return articleOrError.value
  }

  static async toPersistence(article: Article) {
    return {
      id: article.id,
      image_path: article.props.imagePath,
      title: article.props.title,
      subtitle: article.props.subtitle,
      text: article.props.text,
      edition_id: article.props.editionId,
      category_id: article.props.categoryId,
      theme_id: article.props.themeId,
      number_of_pages: article.props.numberOfPages,
      initial_page: article.props.initialPage,
      final_page: article.props.finalPage,
      is_top_seller: article.props.isTopSeller,
    }
  }
}
