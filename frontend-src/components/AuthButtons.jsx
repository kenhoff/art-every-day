import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";

class AuthButtons extends React.Component {
	render() {
		return (
			<div>
				<a href="/signup" onClick={(e) => {
					e.preventDefault();
					this.props.history.push("/signup");
				}}>Sign Up</a>
				<a href="/login" onClick={(e) => {
					e.preventDefault();
					this.props.history.push("/login");
				}}>Log In</a>
			</div>
		);
	}
}
AuthButtons.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(AuthButtons);
