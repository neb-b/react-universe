import express from 'express'
import morgan from 'morgan'
import handleRender from './src/server/render-html'
import auth from './src/server/auth.middleware'
import api from './src/server/routes'
import * as admin from "firebase-admin";
import serviceAccount from "./firebase-admin.json"

const app = express()
const PORT = process.env.port || 3000
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-blog-d8655.firebaseio.com"
});
const db = admin.database();

app.use((req, res, next) => {
  req.firebase = db
  next()
})

app.use(morgan('dev'))
app.use('/public', express.static('public'))

app.use('/api', api)
app.get('*', handleRender)

app.listen(PORT, () => console.log(`\nRunning on port ${PORT}\n`))
