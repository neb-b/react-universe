import React from 'react'
import { css } from 'aphrodite'
import buttonStyle from './button.style'
const { fakeLinkStyle, semiBoldStyle, boldStyle } = buttonStyle

const Button = ({ children, onClick, fakeLink, semiBold, bold }) => {
	const styles = []
	if (fakeLink) {
		styles.push(fakeLinkStyle)
	}
	if (semiBold) {
		styles.push(semiBoldStyle)
	}

	if (bold) {
		styles.push(boldStyle)
	}

	return (
		<button className={`${css(styles)} sy--button`} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
