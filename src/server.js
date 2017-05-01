import express from 'express'
import morgan from 'morgan'
import handleRender from './server.render.js'

const app = express()
const PORT = process.env.port || 3000

app.use(morgan('dev'))
app.use('/public', express.static('public'))

// app.get('/api', handleApi)
app.get('*', handleRender)

app.listen(PORT, () => console.log(`\nRunning on port ${PORT}`))
