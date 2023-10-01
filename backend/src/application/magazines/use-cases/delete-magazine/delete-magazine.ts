import { Either, left, right } from '@/core/logic/either'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type DeleteMagazineRequest = {
  magazineId: string
}

type DeleteMagazineResponse = Either<MagazineNotFoundError, null>

export class DeleteMagazine {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute({
    magazineId,
  }: DeleteMagazineRequest): Promise<DeleteMagazineResponse> {
    const magazineExists = await this.magazinesRepository.findById(magazineId)

    if (!magazineExists) {
      return left(new MagazineNotFoundError())
    }

    await this.magazinesRepository.delete(magazineId)

    return right(null)
  }
}
