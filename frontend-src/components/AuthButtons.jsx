import React, {PropTypes} from "react";
import {withRouter} from "react-router-dom";

class AuthButtons extends React.Component {
	render() {
		return (
			<div>
				<button onClick={() => {
					this.props.history.push("/create-account");
				}}>Create Account</button>
				<button onClick={() => {
					this.props.history.push("/sign-in");
				}}>Sign In</button>
			</div>
		);
	}
}
AuthButtons.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(AuthButtons);
