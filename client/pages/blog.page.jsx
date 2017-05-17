// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPosts } from '../redux/action-creators/blog'
import Page from './page'
import Blog from '../components/blog'
import { StyleSheet, css } from 'aphrodite'

class BlogPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { posts, loadPosts } = this.props
		if (!posts.length) {
			loadPosts()
		}
	}

	render() {
		const { posts } = this.props
		return (
			<Page>
				<div className={css(styles.red)}>
					<h1>My Blog</h1>
					<Blog posts={posts} />
				</div>
			</Page>
		)
	}
}

const styles = StyleSheet.create({
	red: {
		color: 'red'
	}
})

const mapStateToProps = s => ({ ...s.blog })

export default connect(mapStateToProps, { loadPosts })(BlogPage)
