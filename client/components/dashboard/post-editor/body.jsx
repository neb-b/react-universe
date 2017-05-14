import React from 'react'

const Body = ({ input }) => {
	return (
		<div>
			<label>Body</label>
			<textarea {...input} />
		</div>
	)
}

export default Body
