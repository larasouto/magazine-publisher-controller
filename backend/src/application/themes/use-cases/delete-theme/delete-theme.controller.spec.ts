import { app } from '@/infra/http/app'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, describe, expect, test } from 'vitest'
import { PrismaThemesRepository } from '../../repositories/prisma/PrismaThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'

let themesRepository: IThemeRepository

describe('Delete theme (end-to-end)', () => {
  beforeAll(async () => {
    themesRepository = new PrismaThemesRepository()
  })

  test('should be able to delete an existing theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const theme = ThemeFactory.create()
    await themesRepository.create(theme)

    const response = await request(app)
      .del(`/api/themes/?themeId=${theme.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should be able to delete more than one theme', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const theme = ThemeFactory.create()
    const theme2 = ThemeFactory.create()

    await themesRepository.create(theme)
    await themesRepository.create(theme2)

    const response = await request(app)
      .del(
        `/api/themes/?themeId=${theme.id}&themeId=${theme2.id}`,
      )
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
  })
})
