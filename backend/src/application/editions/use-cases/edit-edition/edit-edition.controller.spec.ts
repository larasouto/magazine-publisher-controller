import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { PublicationPeriod } from '@/application/magazines/domain/magazine.schema'

describe('Edit edition (end-to-end)', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-edit',
    description: 'test-create-description-theme',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-edit',
    description: 'test-create-description-magazine',
    year_founded: 2021,
    publication_period: PublicationPeriod.ANNUALLY,
    theme_id: theme.id,
  }

  const edition: any = {
    id: uuid(),
    number: 1,
    title: 'test-create',
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
      where: { title: { contains: 'test-edit' } },
    })
    await prismaClient.magazine.deleteMany({
      where: { name: { contains: 'test-edit' } },
    })
    await prismaClient.theme.deleteMany({
      where: { name: { contains: 'test-edit' } },
    })
  })

  test('should be able to edit an edition', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const edit: any = {
      number: 1,
      title: 'test-edit]',
      description: 'test-edit-description-edition',
      coverPath: 'test-edit-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    const response = await request(app)
      .put(`/api/editions/${edition.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(edit)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')

    const edited_ = await prismaClient.edition.findFirst({
      where: { id: edition.id },
    })
    expect(edited_).toHaveProperty('title', edit.title)
  })

  test('should not be able to edit an edition with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {}

    const response = await request(app)
      .put(`/api/editions/${edition.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit an edition without an magazine associated', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
    }

    const response = await request(app)
      .put(`/api/editions/${edition.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to edit an edition without authentication', async () => {
    const response = await request(app)
      .put(`/api/editions/${edition.id}/edit`)
      .send(edition)

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.body).toHaveProperty('message')
  })
})
