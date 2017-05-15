import React from 'react'

const Title = ({ input, save }) => {
	return (
		<div>
			<input {...input} onBlur={save} className="post--input" />
		</div>
	)
}

export default Title
