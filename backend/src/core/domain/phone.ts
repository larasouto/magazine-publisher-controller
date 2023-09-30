export class Phone {
  public static validate(phone: string) {
    const regex = /^\([1-9]{2}\)\s{0,1}[9]\.{0,1}[0-9]{4}-[0-9]{4}$/

    return (
      regex.test(phone) &&
      phone
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('.', '')
        .replace('-', '').length === 11
    )
  }
}
