import { Either, left, right } from '@/core/logic/either'
import { Magazine } from '../../domain/magazine'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type GetMagazineRequest = {
  magazineId: string
}

type GetMagazineResponse = Either<MagazineNotFoundError, Magazine>

export class GetMagazine {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute({
    magazineId,
  }: GetMagazineRequest): Promise<GetMagazineResponse> {
    const magazine = await this.magazinesRepository.findById(magazineId)

    if (!magazine) {
      return left(new MagazineNotFoundError())
    }

    return right(magazine)
  }
}
