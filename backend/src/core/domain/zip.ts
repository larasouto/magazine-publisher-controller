export class Zip {
  public static validate(zip: string) {
    const regex = /^\d{5}-\d{3}$/

    return regex.test(zip)
  }
}
