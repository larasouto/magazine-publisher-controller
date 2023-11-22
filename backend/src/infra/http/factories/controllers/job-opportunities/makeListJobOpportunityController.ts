import { PrismaJobOpportunitiesRepository } from '@/application/job-opportunities/repositories/prisma/PrismaJobOpportunitiesRepository'
import { ListJobOpportunities } from '@/application/job-opportunities/use-cases/list-job-opportunity/list-job-opportunity'
import { Controller } from '@/core/infra/controller'
import { ListJobOpportunitiesController } from '@/application/job-opportunities/use-cases/list-job-opportunity/list-job-opportunity.controller'

export function makeListJobOpportunitiesController(): Controller {
  const prismaJobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()
  const useCaseListJobOpportunity = new ListJobOpportunities(prismaJobOpportunitiesRepository)

  return new ListJobOpportunitiesController(useCaseListJobOpportunity)
}
