import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { app } from '@infra/http/app'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { prismaClient } from '@/infra/prisma/client'
import { hash } from 'bcryptjs'

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

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
