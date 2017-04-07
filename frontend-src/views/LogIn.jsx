import React, {PropTypes} from "react";
import request from "superagent";
import {withRouter} from "react-router-dom";

class LogIn extends React.Component {
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
				<h1>Log In</h1>
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
						Log In
					</button>
				</form>
				<a href="/signup" onClick={(e) => {
					e.preventDefault();
					this.props.history.push("/signup");
				}}>Don't have an account yet? Sign up here</a>

			</div>
		);
	}
	submitForm() {
		request.post("/login").type("form").send({email: this.state.email, password: this.state.password}).end((err, res) => {
			if (err || !res.ok) {
				console.log(err);
			} else {
				// redirect to /, set user
				this.props.logInUser(res.body);
				this.props.history.push("/");
			}
		});
	}
}

LogIn.propTypes = {
	history: PropTypes.object.isRequired,
	logInUser: PropTypes.func.isRequired
};

export default withRouter(LogIn);
