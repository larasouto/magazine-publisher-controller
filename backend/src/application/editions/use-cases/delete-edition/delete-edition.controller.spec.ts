import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Delete edition (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-delete-theme-edition',
    description: 'test-create-description-theme',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-delete-magazine-edition',
    description: 'test-description',
    year_founded: 2021,
    publication_period: 'ANNUALLY',
    theme_id: theme.id,
  }

  const edition: any = {
    id: uuid(),
    number: 1,
    title: 'test-delete-edition',
    description: 'test-create-description-edition',
    cover_path: 'test-create-cover-path-edition',
    price: 49.9,
    year: 2023,
    publication_date: new Date(),
    number_of_copies: 100,
    number_of_pages: 254,
    magazine_id: magazine.id,
  }

  beforeAll(async () => {
    await prismaClient.theme.create({
      data: theme,
    })
    await prismaClient.magazine.create({
      data: magazine,
    })
    await prismaClient.edition.create({
      data: edition,
    })
  })

  afterAll(async () => {
    await prismaClient.edition.deleteMany({
      where: { title: { contains: 'test-delete' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-delete' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-delete' } },
    })
  })

  test('should be able to delete an edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .delete(`/api/editions/${edition.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to delete a non-existing edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const nonExistingEditionId = 'non-existing-id'

    const response = await request(app)
      .delete(`/api/editions/${nonExistingEditionId}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
