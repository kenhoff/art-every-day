import React, {PropTypes} from "react";
import request from "superagent";
import validate from "validate.js";

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
			message: "You gotta have an email!"
		}
	},
	password: {
		length: {
			message: "Your password should be a minimum of 8 characters.",
			minimum: 8
		},
		presence: {
			message: "You gotta have a password!"
		}
	},
	repeatPassword: {
		equality: {
			attribute: "password",
			message: "These passwords don't match."
		}
	},
	username: {
		// still gotta do async check to see if username is available
		format: {
			message: "Letters and numbers only, please! No spaces or punctuation.",
			pattern: /^[A-Za-z0-9]+$/
		},
		presence: {
			message: "You gotta pick a username!"
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
	}, {
		label: "Repeat Password",
		name: "repeatPassword",
		type: "password"
	}, {
		label: "Username",
		name: "username",
		type: "text"
	}
];

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			errors: {},
			password: "",
			repeatPassword: "",
			username: ""
		};
	}
	render() {

		return (
			<div>
				<h1>Sign Up</h1>
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
					<button type="submit">Sign Up</button>
				</form>
				<a href="/login" onClick={(e) => {
					e.preventDefault();
					this.props.history.push("/login");
				}}>Already have an account? Log in here</a>
			</div>
		);
	}
	updateInputField(e, label) {
		this.setState({[label]: e.target.value});
	}
	submitForm() {
		validate.async(this.state, constraints, {format: "custom"}).then(() => {
			// validation was successful
			this.setState({errors: {}});
			request.post("/signup").send({email: this.state.email, password: this.state.password, username: this.state.username}).end((err, res) => {
				if (err || !res.ok) {
					// error
					this.setState({errors: res.body});
				} else {
					// call this.props.signin, load the user into the App component's state
					this.props.logInUser(res.body);
					this.props.history.push("/");
				}
			});
		}, (errors) => {
			// validation was not successful
			this.setState({errors: errors});
		});
	}
}

SignUp.propTypes = {
	history: PropTypes.object.isRequired,
	logInUser: PropTypes.func.isRequired
};

export default SignUp;
