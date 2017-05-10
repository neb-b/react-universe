import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import adminConfig from '../firebase-admin.config.json'
import config from '../firebase.config.json'
import uuid from 'uuid/v4'

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
		const db = admin.database().ref('posts')

		return db
			.once('value')
			.then(snapshot => {
				const posts = snapshot.val()
				let listOfPosts = []
				for (var key in posts) {
					console.log('testing', posts[key])
					if (posts[key].published) {
						listOfPosts.push(posts[key])
					}
				}
				console.log('listofpost', listOfPosts)
				resolve(listOfPosts)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const getDashboard = () => {
	return new Promise((resolve, reject) => {
		// check if logged in, then get all posts
		const db = admin.database().ref('posts')
		return db
			.once('value')
			.then(snapshot => {
				const posts = snapshot.val()
				let listOfPosts = []
				for (var key in posts) {
					listOfPosts.push(posts[key])
				}
				console.log('posts', listOfPosts)
				resolve(listOfPosts)
			})
			.catch(err => {
				console.log('error', err)
				reject(err)
			})
	})
}

export const createPost = () => {
	const db = admin.database()
	const postId = uuid()
	console.log('creating...')
	const newPost = {
		id: postId,
		dateCreated: new Date().toISOString(),
		published: false
	}

	return new Promise((resolve, reject) => {
		return db.ref(`posts/${postId}`).set(newPost).then(() => resolve(newPost))
	})
}

export const publishPost = postId => {
	const db = admin.database().ref(`posts/${postId}`)
	console.log('publishing...')

	return new Promise((resolve, reject) => {
		return db
			.once('value')
			.then(snapshot => {
				console.log('snapshot', snapshot.val())
				const post = snapshot.val()
				const newPost = Object.assign({}, post, {
					published: true,
					datePublished: new Date().toISOString()
				})
				return db.set(newPost).then(() => {
					resolve(newPost)
				})
			})
			.catch(err => reject(err))
	})
}
