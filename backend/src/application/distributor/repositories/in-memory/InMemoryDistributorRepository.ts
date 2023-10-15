import { Distributor } from "../../domain/distributor"
import { IDistributorRepository } from "../Interfaces/IDistributorRepository"


export class InMemoryDistributorsRepository implements IDistributorRepository {
  constructor(public distributor: Distributor[] = []) {}

  async findById(id: string): Promise<Distributor | null> {
    const distributor = this.distributor.find((distributor) => distributor.id === id)

    if (!distributor) {
      return null
    }

    return distributor
  }

  async create(distributor: Distributor): Promise<void> {
    this.distributor.push(distributor)
  }

  async delete(id: string): Promise<void> {
    const distributorIndex = this.distributor.findIndex(
      (distributor) => distributor.id === id,
    )

    this.distributor.splice(distributorIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const distributorIndex = this.distributor.findIndex(
        (distributor) => distributor.id === id,
      )

      this.distributor.splice(distributorIndex, 1)
    })
  }

  async update(distributor: Distributor): Promise<void> {
    const distributorIndex = this.distributor.findIndex(
      (distributor) => distributor.id === distributor.id,
    )

    this.distributor[distributorIndex] = distributor
  }

  async list(): Promise<Distributor[]> {
    return this.distributor
  }
}
