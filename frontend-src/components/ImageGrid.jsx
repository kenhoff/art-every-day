import React from "react";

let array = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
];

class ImageGrid extends React.Component {
	render() {
		return (
			<div>
				{array.map(() => {
					return (
						<img key={Math.random()} src="https://source.unsplash.com/random/50x50"></img>
					);
				})}
			</div>
		);
	}
}

export default ImageGrid;
