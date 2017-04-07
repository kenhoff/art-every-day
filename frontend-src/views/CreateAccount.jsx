import React, {PropTypes} from "react";
import request from "superagent";

class CreateAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			repeatPassword: "",
			username: ""
		};
	}
	render() {
		return (
			<div>
				<h1>Create Account</h1>
				<form onSubmit={(e) => {
					e.preventDefault();
					this.submitForm();
				}}>
					<div>
						<label>
							<span>
								Email
							</span>
							<input type="email" value={this.state.email} onChange={(e) => {
								this.updateInputField(e, "email");
							}}></input>
						</label>
					</div>
					<div>
						<label>
							<span>
								Password
							</span>
							<input type="password" value={this.state.password} onChange={(e) => {
								this.updateInputField(e, "password");
							}}></input>
						</label>
					</div>
					<div>
						<label>
							<span>
								Repeat Password
							</span>
							<input type="password" value={this.state.repeatPassword} onChange={(e) => {
								this.updateInputField(e, "repeatPassword");
							}}></input>
						</label>
					</div>
					<div>
						<label>
							<span>
								Username
							</span>
							<input type="text" value={this.state.username} onChange={(e) => {
								this.updateInputField(e, "username");
							}}></input>
						</label>
					</div>
					<button type="submit">Create Account</button>
				</form>
				<a href="/sign-in" onClick={(e) => {
					e.preventDefault();
					this.props.history.push("/sign-in");
				}}>Already have an account? Sign in here</a>
			</div>
		);
	}
	updateInputField(e, label) {
		this.setState({[label]: e.target.value});
	}
	submitForm() {
		// perform checks
		// check that email is in fact actually an email
		let emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email);
		// console.log(`email is valid: ${emailIsValid}`);

		// check that password is > 8 characters
		let passwordIsLongEnough = (this.state.password.length >= 8);
		// console.log(`password is long enough: ${passwordIsLongEnough}`);

		// check that resetPassword == password
		let passwordsMatch = (this.state.password == this.state.repeatPassword);
		// console.log(`passwords match: ${passwordsMatch}`);

		// check that username is alphanumeric and not blank
		let usernameValid = /^[A-Za-z0-9]+$/.test(this.state.username);
		// console.log(`username is valid: ${usernameValid}`);

		if (emailIsValid && passwordIsLongEnough && passwordsMatch && usernameValid) {

			request.post("/create-account").send({email: this.state.email, password: this.state.password, username: this.state.username}).end((err, res) => {
				if (err || !res.ok) {
					console.log("Oh no! error:", err);
				} else {
					console.log("yay got " + JSON.stringify(res.body));
					// call this.props.signin, load the user into the App component's state
					this.props.signInUser(res.body);
					this.props.history.push("/");
				}
			});

		}

	}
}

CreateAccount.propTypes = {
	history: PropTypes.object.isRequired,
	signInUser: PropTypes.func.isRequired
};

export default CreateAccount;
