import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const Title = ({ input, save }) => {
	return (
		<div>
			<input
				{...input}
				onBlur={save}
				placeholder="Untitled"
				id="post-title"
				className={`${css(styles.title)} post--input`}
			/>
		</div>
	)
}

const styles = StyleSheet.create({
	title: {
		border: 'none',
		margin: 0,
		padding: 0,
		fontSize: '2em',
		borderBottom: '2 solid black'
	}
})

export default Title
