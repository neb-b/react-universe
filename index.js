import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import handleRender from './server/handle-render'
import api from './server/routes'

const app = express()
const PORT = process.env.port || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use('/api', api)

app.get('*', handleRender)

app.listen(PORT, () => console.log(`\nRunning on port ${PORT}\n`))
