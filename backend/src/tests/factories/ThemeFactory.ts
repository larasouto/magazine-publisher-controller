import { Theme } from '@/application/themes/domain/theme'

type ThemeOverrides = {
  name?: string
  description?: string
}

export class ThemeFactory {
  static create(overrides?: ThemeOverrides) {
    const theme = Theme.create({
      name: 'test-theme-name',
      description: 'test-theme-description',
      ...overrides,
    })

    return theme.value as Theme
  }
}
