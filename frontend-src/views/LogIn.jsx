import React, {PropTypes} from "react";
import request from "superagent";
import validate from "validate.js";
import {withRouter} from "react-router-dom";

// by defaule, validate.js prepends the error message with the name of the "attribute" (input element). This isn't changeable, so we write a custom formatter that will create an error message without prepending the name of the "attribute", or just the normal error message that it's throwing.
validate.formatters.custom = function(errors) {
	let messagesObject = {};
	for (let error of errors) {
		let errorMessage = error.options.message || error.error;
		if (error.attribute in messagesObject) {
			messagesObject[error.attribute].push(errorMessage);
		} else {
			messagesObject[error.attribute] = [errorMessage];
		}
	}
	return messagesObject;
};

const constraints = {
	email: {
		email: {
			message: "This doesn't look like a valid email."
		},
		presence: {
			message: "Please enter your email."
		}
	},
	password: {
		presence: {
			message: "Please enter your password."
		}
	}
};

const inputs = [
	{
		label: "Email",
		name: "email",
		type: "email"
	}, {
		label: "Password",
		name: "password",
		type: "password"
	}
];

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			errors: {},
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
					{inputs.map((input) => {
						let errors = [];
						if (input.name in this.state.errors) {
							errors = this.state.errors[input.name];
						}
						return (
							<div key={input.name}>
								<label>
									<span>
										{input.label}
									</span>
									<input type={input.type} value={this.state[input.name]} onChange={(e) => {
										this.updateInputField(e, input.name);
									}}></input>
								</label>
								{errors.map((error) => {
									return (
										<div key={error} className="error">{error}</div>
									);
								})}
							</div>
						);
					})}
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
	updateInputField(e, label) {
		this.setState({[label]: e.target.value});
	}
	submitForm() {
		let errors = validate(this.state, constraints, {format: "custom"});
		if (!errors) {
			this.setState({errors: {}});
			request.post("/login").type("form").send({email: this.state.email, password: this.state.password}).end((err, res) => {
				if (err || !res.ok) {
					console.log(err);
				} else {
					// redirect to /, set user
					this.props.logInUser(res.body);
					this.props.history.push("/");
				}
			});
		} else {
			this.setState({errors: errors});
		}
	}
}

LogIn.propTypes = {
	history: PropTypes.object.isRequired,
	logInUser: PropTypes.func.isRequired
};

export default withRouter(LogIn);
