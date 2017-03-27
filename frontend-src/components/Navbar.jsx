import AuthButtons from "./AuthButtons.jsx";
import React from "react";
import UserCard from "./UserCard.jsx";

class Navbar extends React.Component {
	render() {
		// if user, display usercard
		// if no user, display Authbuttons
		let rightElements;
		if (this.props.user) {
			rightElements = (
				<UserCard></UserCard>
			);
		} else {
			rightElements = (
				<AuthButtons></AuthButtons>
			);
		}
		return (
			<div>
				<h1>Art Every Day</h1>
				{rightElements}
			</div>
		);
	}
}

Navbar.propTypes = {
	user: React.PropTypes.object
};

export default Navbar;
