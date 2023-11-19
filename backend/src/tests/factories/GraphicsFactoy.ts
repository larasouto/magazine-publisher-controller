import { Graphics } from '@/application/graphics/domain/graphics'

type GraphicsOverrides = {
  name?: string
  address?: string
}

export class GraphicsFactory {
  static create(overrides?: GraphicsOverrides) {
    const graphics = Graphics.create({
      name: 'test-graphics-name',
      address: 'test-graphics-address',
      ...overrides,
    })

    return graphics.value as Graphics
  }
}
