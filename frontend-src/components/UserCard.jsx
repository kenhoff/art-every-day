import React, {PropTypes} from "react";

class UserCard extends React.Component {
	render() {
		return (
			<div>
				<span>:P</span>
				<span>{this.props.username}</span>
			</div>
		);
	}
}

UserCard.propTypes = {
	username: PropTypes.string.isRequired
};

export default UserCard;
