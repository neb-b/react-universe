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
					if (posts[key].published) {
						listOfPosts.push(posts[key])
					}
				}
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
				// TODO
				// sort by most recent edit first
				const posts = snapshot.val()
				let listOfPosts = []
				for (var key in posts) {
					listOfPosts.push(posts[key])
				}
				resolve(listOfPosts)
			})
			.catch(err => {
				console.log('error', err)
				reject(err)
			})
	})
}

export const createPost = date => {
	const db = admin.database()
	const postId = uuid()
	const newPost = {
		id: postId,
		dateCreated: date,
		published: false,
		title: '',
		body: ''
	}

	return new Promise((resolve, reject) => {
		return db.ref(`posts/${postId}`).set(newPost).then(() => resolve(newPost))
	})
}

export const updatePost = newPost => {
	const db = admin.database().ref(`posts/${newPost.id}`)

	return new Promise((resolve, reject) => {
		return db
			.once('value', snapshot => {
				const oldPost = snapshot.val()
				console.log('old post', oldPost)
				console.log('new', newPost)
				const updatedPost = Object.assign({}, oldPost, newPost)
				console.log('udpated', updatedPost)
				return db.set(updatedPost).then(() => resolve(updatedPost))
			})
			.catch(err => reject(err))
	})
}

export const deletePost = id => {
	const db = admin.database().ref(`posts/${id}`)
	return new Promise((resolve, reject) => {
		db.remove().then(resolve).catch(reject)
	})
}
