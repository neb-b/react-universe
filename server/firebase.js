import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import adminConfig from '../firebase-admin.config.json'
import config from '../firebase.config.json'

admin.initializeApp({
	credential: admin.credential.cert(adminConfig),
	databaseURL: 'https://my-site-468de.firebaseio.com'
})

firebase.initializeApp(config)

export const login = ({ email, password }) => {
	return new Promise((resolve, reject) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				return firebase
					.auth()
					.currentUser.getToken(/* force refresh */ true)
					.then(token => resolve(token))
			})
			.catch(err => reject(err))
	})
}

export const authorize = authToken => {
	return new Promise((resolve, reject) => {
		return admin
			.auth()
			.verifyIdToken(authToken)
			.then(res => resolve(res))
			.catch(err => reject(err))
	})
}

export const getPublicPosts = () => {
	return new Promise((resolve, reject) => {
		const db = admin.database().ref('blog/posts')

		return db
			.once('value')
			.then(snapshot => {
				const posts = snapshot.val()
				// [0] is empty, not sure why
				const actualListOfPosts = posts.slice(1)
				const publicPosts = posts.filter(post => !post.published)
				resolve(actualListOfPosts)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const getAllPosts = () => {
	return new Promise((resolve, reject) => {
		// check if logged in, then get all posts
		const db = admin.database().ref('blog/posts')
		return db
			.once('value')
			.then(snapshot => {
				const posts = snapshot.val()
				// [0] is empty, not sure why
				const actualListOfPosts = posts.slice(1)
				resolve(actualListOfPosts)
			})
			.catch(err => {
				console.log('error', err)
				reject(err)
			})
	})
}
