import { Router } from 'express'

export const auth = Router()

auth.post('/sign-in', (req, res) => {
  const { email, password } = req.body
  return res.json({ email, password })
})

auth.post('/sign-up', (req, res) => {
  return res.json({ message: 'User created successfully' })
})
