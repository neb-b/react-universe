import serviceAccount from '../firebase-admin.json'
import * as admin from 'firebase-admin'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://my-blog-d8655.firebaseio.com'
})

const db = admin.database()

export const getPosts = () => {
	console.log('get posts...')
	return new Promise((resolve, reject) => {
		const ref = db.ref('posts')

		ref.on(
			'value',
			snapshot => {
				const posts = snapshot.val()
				// [0] is empty, not sure why
				const actualListOfPosts = posts.slice(1)
				resolve(actualListOfPosts)
			},
			err => {
				reject(err)
			}
		)
	})
}
