import React from 'react'

const Body = ({ input }) => {
	return (
		<div>
			<textarea {...input} placeholder="Start typing here..." />
		</div>
	)
}

export default Body
