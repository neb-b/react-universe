import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite'

class Body extends Component {
	componentDidMount() {
		console.log('test', this.textInput)
		const node = this.textInput
		node.addEventListener('keyup', this._resizeTextInput.bind(this))
	}

	_resizeTextInput() {
		const node = this.textInput
		node.style.height = '1px'
		console.log('scroll', node.scrollHeight)
		node.style.height = node.scrollHeight + 'px'
		console.log('node.style', node.style)
	}

	render() {
		const { input, save } = this.props

		return (
			<div className={css(styles.bodyWrapper)}>
				<textarea
					ref={e => {
						this.textInput = e
					}}
					{...input}
					onBlur={save}
					placeholder="Start typing here..."
					className={`${css(styles.textarea)} post--input`}
				/>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	bodyWrapper: {
		display: 'flex'
	},
	textarea: {
		border: 'none',
		outline: 'none',
		resize: 'none',
		overflow: 'auto',
		width: 500,
		minHeight: 500,
		fontSize: '1em',
		paddingTop: 10
	}
})

export default Body
