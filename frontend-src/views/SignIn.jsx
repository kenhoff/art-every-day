import React, {PropTypes} from "react";
import request from "superagent";
import {withRouter} from "react-router-dom";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}
	render() {
		return (
			<div>
				<h1>Sign In</h1>
				<form onSubmit={(e) => {
					e.preventDefault();
					this.submitForm();
				}}>
					<div>
						<label>
							<span>Email</span>
							<input onChange={(e) => {
								this.setState({email: e.target.value});
							}} value={this.state.email} type="email"></input>
						</label>
					</div>
					<div>
						<label>
							<span>Password</span>
							<input onChange={(e) => {
								this.setState({password: e.target.value});
							}} value={this.state.password} type="password"></input>
						</label>
					</div>
					<button type="submit">
						Sign In
					</button>
				</form>
			</div>
		);
	}
	submitForm() {
		console.log("submitting form...");
		request.post("/login").type("form").send({email: this.state.email, password: this.state.password}).end((err, res) => {
			if (err || !res.ok) {
				console.log(err);
			} else {
				// redirect to /, set user
				this.props.signInUser(res.body);
				this.props.history.push("/");
			}
		});
	}
}

SignIn.propTypes = {
	history: PropTypes.object.isRequired,
	signInUser: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
