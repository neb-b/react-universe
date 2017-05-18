import React from 'react'

const Body = ({ input, save }) => {
	return (
		<div>
			<textarea
				{...input}
				onBlur={save}
				className="post--input"
				placeholder="Start typing here..."
			/>
		</div>
	)
}

export default Body
