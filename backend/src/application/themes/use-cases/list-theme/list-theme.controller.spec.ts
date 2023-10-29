import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaThemesRepository } from '../../repositories/prisma/PrismaThemesRepository'

const themesRepository = new PrismaThemesRepository()

let themeId: string[] = []

describe('List themes (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.theme.deleteMany({
      where: { id: { in: themeId } },
    })
  })

  test('should list all themes', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
      id: uuid(),
      name: 'test-theme-name',
      description: 'test-theme-description',
    }

    await prismaClient.theme.create({
      data,
    })
    themeId.push(data.id)

    const response = await request(app)
      .get('/api/themes')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const themes = await themesRepository.list()
    expect(themes.length > 0).toBeTruthy()
  })
})
