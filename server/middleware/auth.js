import { authorize } from '../firebase'
const REDIRECT_URL = 'http://localhost:3000'

export default (req, res, next) => {
	const { cookies: { auth: authToken } } = req
	if (!authToken) {
		return res.sendStatus(401)
	}

	authorize(authToken).then(() => next()).catch(err => res.sendStatus(401))
}
