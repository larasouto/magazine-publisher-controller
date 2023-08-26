import pt from './default/pt.json'
import en from './default/en.json'
import custom_pt from './custom/pt.json'
import custom_en from './custom/en.json'

export const zod = {
  'en-US': { zod: en, custom: custom_en },
  'pt-BR': { zod: pt, custom: custom_pt }
}
