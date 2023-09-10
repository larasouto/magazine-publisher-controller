import request from 'supertest'

import { app } from '@infra/http/app'
import { describe, expect, test } from 'vitest'

describe('Authenticate User (end-to-end)', () => {
  test('should be able to authenticate', async () => {
    const response = await request(app).post('/api/auth/sign-in').send({
      email: 'test@test.com',
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
