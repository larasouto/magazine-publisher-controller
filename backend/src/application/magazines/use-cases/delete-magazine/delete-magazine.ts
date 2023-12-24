import { Either, left, right } from '@/core/logic/either'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { OneOrMoreMagazineNotFoundError } from './errors/OneOrMoreMagazineNotFoundError'


type DeleteMagazineRequest = {
  ids: string[]
}

type DeleteMagazineResponse = Either<MagazineNotFoundError, null>

export class DeleteMagazine {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute({
    ids: magazineId,
  }: DeleteMagazineRequest): Promise<DeleteMagazineResponse> {
    const magazineOrMagazines = Array.isArray(magazineId)
      ? magazineId
      : [magazineId]

    const magazinePromises = magazineOrMagazines
      .filter((magazineId) => magazineId)
      .map((magazineId) => this.magazinesRepository.findById(magazineId))

    const magazines = await Promise.all(magazinePromises)

    if (magazines.some((magazine) => magazine === null)) {
      return left(
        magazines.length > 1
          ? new OneOrMoreMagazineNotFoundError()
          : new MagazineNotFoundError(),
      )
    }

    await this.magazinesRepository.deleteMany(magazineOrMagazines)

    return right(null)
  }
}
