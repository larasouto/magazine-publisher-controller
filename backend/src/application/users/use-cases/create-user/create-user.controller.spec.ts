import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

let userId: string[] = []

describe('Create user (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.user.deleteMany({ where: { id: { in: userId } } })
  })

  test('should create an user', async () => {
    const randomEmail = `random-email@test-${Math.random()}.com`

    const data = {
      name: 'test',
      email: randomEmail,
      password: '12345678',
      confirmPassword: '12345678',
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.CREATED)

    const userInDatabase = await prismaClient.user.findUnique({
      where: { email: data.email },
    })

    expect(userInDatabase).toBeTruthy()
    userId.push(userInDatabase?.id as string)
  })

  test('should not be able to create an user with invalid data', async () => {
    const data = {
      name: 'test',
      confirmPassword: '12345678',
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to create an user with existing email', async () => {
    const randomEmail = `random-email@test-${Math.random()}.com`

    const data = {
      name: 'test',
      email: randomEmail,
      password: '12345678',
      confirmPassword: '12345678',
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.CREATED)

    const userInDatabase = await prismaClient.user.findUnique({
      where: { email: data.email },
    })
    expect(userInDatabase).toBeTruthy()

    const response2 = await request(app).post('/api/auth/sign-up').send(data)
    expect(response2.status).toBe(StatusCodes.CONFLICT)

    userId.push(userInDatabase?.id as string)
  })
})
