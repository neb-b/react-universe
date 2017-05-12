import { deletePost } from '../firebase'

export default (req, res) => {
	const { params: { id } } = req

	deletePost(id).then(() => res.sendStatus(200)).catch(err => res.send(err))
}
