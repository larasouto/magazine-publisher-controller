import request from 'supertest'

import { prismaClient } from '@/infra/prisma/client'
import { app } from '@infra/http/app'
import { hash } from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Authenticate User (end-to-end)', () => {
  beforeAll(async () => {
    await prismaClient.user.create({
      data: {
        id: uuid(),
        name: 'Test User',
        email: 'test@end-to-end.com',
        password: await hash('test1234567', 8),
      },
    })
  })

  afterAll(async () => {
    await prismaClient.user.delete({ where: { email: 'test@end-to-end.com' } })
  })

  test('should be able to authenticate', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'test@end-to-end.com',
      password: 'test1234567',
    })

    expect(response.status).toBe(StatusCodes.OK)

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })

  test('should not be able to authenticate with invalid data', async () => {
    const superRandomEmail = `r-${Math.random()}-email-${Math.random()}@end-to-end.com`

    const response = await request(app).post('/api/auth/sign-in').send({
      email: superRandomEmail,
      password: '2323',
    })

    expect(response.status).toBe(400)
  })
})
