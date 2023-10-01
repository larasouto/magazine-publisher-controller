import { describe, expect, test } from 'vitest'
import { Reporter } from './reporter'

describe('Entity Reporter', () => {
  test('should be able to create a reporter', () => {
    const data: any = {
      name: 'test-reporter',
      email: 'test-reporter@email.com',
      phone: '(54) 93280-4744',
      cpf: '67001364070',
      specialty: 'test-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
      departureDate: new Date(),
    }

    const sut = Reporter.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should be able to create a reporter (cpf mask)', () => {
    const data: any = {
      name: 'test-reporter',
      email: 'test-reporter@email.com',
      phone: '(54) 93280-4744',
      cpf: '670.013.640-70',
      specialty: 'test-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
      departureDate: new Date(),
    }
    const sut = Reporter.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should be able to create a reporter without phone', () => {
    const data: any = {
      name: 'test-reporter',
      email: 'test-reporter@email.com',
      cpf: '670.013.640-70',
      specialty: 'test-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
      departureDate: new Date(),
    }

    const sut = Reporter.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a reporter with wrong phone', () => {
    const data: any = {
      name: 'test-reporter',
      email: 'test-reporter@email.com',
      phone: '(00) 00000-0000',
      cpf: '670.013.640-70',
      specialty: 'test-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
      departureDate: new Date(),
    }

    const sut = Reporter.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create a reporter with wrong cpf', () => {
    const data: any = {
      name: 'test-reporter',
      email: 'test-reporter@email.com',
      phone: '(54) 93280-4744',
      cpf: '000.000.000-00',
      specialty: 'test-specialty',
      status: 'ACTIVE',
      entryDate: new Date(),
      departureDate: new Date(),
    }

    const sut = Reporter.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create a reporter with invalid data', () => {
    const data: any = {}

    const sut = Reporter.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
