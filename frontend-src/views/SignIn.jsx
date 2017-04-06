import React from "react";

class SignIn extends React.Component {
	render() {
		return (
			<div>
				<h1>Sign In</h1>
				<form onSubmit={() => {}}>
					<div>
						<label>
							<span>Email</span>
							<input type="email"></input>
						</label>
					</div>
					<div>
						<label>
							<span>Password</span>
							<input type="password"></input>
						</label>
					</div>
					<button type="submit">
						Sign In
					</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
