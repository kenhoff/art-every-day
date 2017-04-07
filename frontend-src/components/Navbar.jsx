import React, {PropTypes} from "react";
import AuthButtons from "./AuthButtons.jsx";
import UserCard from "./UserCard.jsx";
import {withRouter} from "react-router-dom";

class Navbar extends React.Component {
	render() {
		// if user, display usercard
		// if no user, display Authbuttons
		let rightElements;
		if (this.props.user) {
			rightElements = ( <div>
				<UserCard></UserCard>
				<a href="/logout">Log out</a>
			</div>
			);
		} else {
			rightElements = (
				<AuthButtons></AuthButtons>
			);
		}
		return (
			<div>
				<h1 onClick={() => {
					this.props.history.push("/");
				}}>Art Every Day</h1>
				{rightElements}
			</div>
		);
	}
}

Navbar.propTypes = {
	history: PropTypes.object.isRequired,
	user: PropTypes.object
};

export default withRouter(Navbar);
