import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const Body = ({ input, save }) => {
	return (
		<div>
			<textarea
				{...input}
				onBlur={save}
				placeholder="Start typing here..."
				className={`${css(styles.textarea)} post--input`}
			/>
		</div>
	)
}

const styles = StyleSheet.create({
	textarea: {
		border: 'none',
		overflow: 'auto',
		outline: 'none',
		width: 500,
		height: 'auto',
		fontSize: '1em',
		paddingTop: 10
	}
})

export default Body
