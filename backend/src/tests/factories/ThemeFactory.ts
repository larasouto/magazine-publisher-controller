import { Theme } from '@/application/themes/domain/theme'
import { ThemeProps } from '@/application/themes/domain/theme.schema'

type ThemeOverrides = ThemeProps

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
