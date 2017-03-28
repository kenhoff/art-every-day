import React from "react";

class CreateAccount extends React.Component {
	render() {
		return (
			<div>
				<h1>Create Account</h1>
				<div>
					<label>
						<span>
							Email
						</span>
						<input type="email"></input>
					</label>
				</div>
				<div>
					<label>
						<span>
							Password
						</span>
						<input type="password"></input>
					</label>
				</div>
				<div>
					<label>
						<span>
							Repeat Password
						</span>
						<input type="password"></input>
					</label>
				</div>
				<div>
					<label>
						<span>
							Username
						</span>
						<input type="text"></input>
					</label>
				</div>
				<button>Create Account</button>
			</div>
		);
	}
}

export default CreateAccount;
