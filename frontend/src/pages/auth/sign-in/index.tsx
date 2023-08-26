import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
})

type SchemaTest = z.infer<typeof schema>

const SignIn = () => {
  const [output, setOutput] = useState('')

  const form = useForm<SchemaTest>({
    mode: 'all',
    resolver: zodResolver(schema)
  })

  const onSubmit = (form: SchemaTest) => {
    setOutput(JSON.stringify(form, null, 2))
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-black">
        <div className="flex gap-2">
          <Input />
          {form.formState.errors.email?.message}
        </div>
        <Button className="bg-red-900">Enviar</Button>
      </form>
      <pre>{output}</pre>
    </div>
  )
}

export default SignIn
