type CustomProps = {
  hide: () => void
}

export const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }: CustomProps) {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        hide()
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown)
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown)
      }
    }
  }
}
