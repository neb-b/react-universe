import React from 'react'

const Title = ({ input, save }) => {
	return (
		<div>
			<input
				{...input}
				onBlur={save}
				placeholder="Untitled"
				className="post--input"
			/>
		</div>
	)
}

export default Title
