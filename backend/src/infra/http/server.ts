import { server } from './app'

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`\n🚀 Server started at http://localhost:${PORT}`)
})
