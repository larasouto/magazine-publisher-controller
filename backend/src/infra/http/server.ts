import { app } from './app'
import { green } from 'console-log-colors'

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log('🚀 Server running at', green(`http://localhost:${PORT}`))
})
