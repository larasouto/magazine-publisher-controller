import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { ListEditions } from '@/application/editions/use-cases/list-edition/list-edition'
import { ListEditionsController } from '@/application/editions/use-cases/list-edition/list-edition.controller'

import { Controller } from '@/core/infra/controller'

export function makeListEditionsController(): Controller {
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseListEdition = new ListEditions(prismaEditionsRepository)

  return new ListEditionsController(useCaseListEdition)
}
