import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { PrismaEditionsRepository } from '../../repositories/prisma/PrismaEditionsRepository'

const editionsRepository = new PrismaEditionsRepository()

let editionId: string[] = []

const theme: any = {
  id: uuid(),
  name: 'test-theme',
  description: 'test-theme-description',
}

const magazine: any = {
  id: uuid(),
  name: 'test-magazine',
  description: 'test-magazine-description',
  year_founded: 2021,
  publication_period: 'MONTHLY',
  theme_id: theme.id,
}

describe('List editions (end-to-end)', () => {
  beforeAll(async () => {
    await prismaClient.theme.create({ data: theme })
    await prismaClient.magazine.create({ data: magazine })
  })

  afterAll(async () => {
    // await prismaClient.edition.deleteMany({
    //  where: { id: { in: editionId } },
    // })
    // await prismaClient.theme.deleteMany()
  })

  test('should list all editions', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      number: 1,
      title: 'edition-title',
      description: 'edition-description',
      cover_path: 'edition-cover-path',
      price: 10,
      year: 2021,
      publication_date: new Date(),
      number_of_copies: 100,
      number_of_pages: 10,
      magazine_id: magazine.id,
    }

    await prismaClient.edition.create({
      data,
    })
    editionId.push(data.id)

    const response = await request(app)
      .get('/api/editions')
      .auth(jwt.token, { type: 'bearer' })
      .send()

    console.log(response.body)
    expect(response.status).toBe(StatusCodes.OK)

    const editions = await editionsRepository.list()
    expect(editions.length > 0).toBeTruthy()
  })
})
