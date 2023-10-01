import { describe, expect, test } from 'vitest'
import { Photographer } from './photographer'

describe('Entity Photographer', () => {
  test('should be able to create a photographer', () => {
    const data = {
      name: 'test',
      email: 'test@email.com',
      phone: '(62) 93209-8886',
      cpf: '943.529.910-58',
      specialty: 'test',
      entryDate: new Date(),
      departureDate: new Date(),
    }
    const sut = Photographer.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a photographer with invalid data', () => {
    const data = {
      name: '',
      email: '',
      cpf: '',
      specialty: '',
      entryDate: new Date(),
    }
    const sut = Photographer.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should not be able to create a photographer with invalid email', () => {
    const data = {
      name: 'test',
      email: 'testemailcom',
      phone: '12345678',
      cpf: '12345678901',
      specialty: 'test',
      entryDate: new Date(),
    }
    const sut = Photographer.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
