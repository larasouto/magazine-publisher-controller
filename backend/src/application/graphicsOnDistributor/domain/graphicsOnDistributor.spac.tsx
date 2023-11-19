import { describe, expect, test } from 'vitest'
import { GraphicsOnDistributor } from './graphicsOnDistributor'

describe('Entity GraphicsOnDistributor', () => {
  test('should be able to create a graphics', () => {
    const data: any = {
      graphicsId: 'GraphicsOnDistributor graphicsId',
      distributorId: 'GraphicsOnDistributor distributorId',
    }

    const sut = GraphicsOnDistributor.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a graphics with invalid data', () => {
    const data: any = {
      graphicsId: '',
      distributorId: null,
    }

    const sut = GraphicsOnDistributor.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
