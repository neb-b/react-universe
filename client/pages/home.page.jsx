// @flow

import React from 'react'
import Page from './page'
import { StyleSheet, css } from 'aphrodite'

const Home = () => {
	return (
		<Page>
			<h1 className={css(styles.orange, styles.small)}>Hello!</h1>
		</Page>
	)
}

const styles = StyleSheet.create({
	orange: {
		color: 'orange'
	},
	small: {
		'@media (max-width: 600px)': {
			backgroundColor: 'red'
		}
	}
})

export default Home
