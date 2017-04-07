import {Route, BrowserRouter as Router} from "react-router-dom";
import CreateAccount from "./views/CreateAccount.jsx";
import Dashboard from "./views/Dashboard.jsx";
import LandingPage from "./views/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import SignIn from "./views/SignIn.jsx";
import jstz from "jstz";
import moment from "moment-timezone";
import request from "superagent";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// get information about user
		// make a call to `/api/me` - load this.state.user with response

		request.get("/me").end((err, res) => {
			if (err || !res.ok) {
				console.log(err);
			} else {
				this.setState(res.body);
			}

			// get current date in browser's time zone
			this.setState({
				currentDate: moment().tz(jstz.determine().name()).format("YYYY-MM-DD")
			});
		});
	}
	signInUser(user) {
		this.setState({user: user});
	}
	render() {
		return (
			<Router>
				<div>
					<Navbar user={this.state.user}></Navbar>
					<Route exact path="/" component={(props) => {
						if (this.state.user) {
							return (<Dashboard {...props} currentDate={this.state.currentDate} user={this.state.user}/>);
						} else {
							return (<LandingPage {...props} currentDate={this.state.currentDate}/>);
						}
					}}></Route>
					<Route path="/create-account" component={(props) => {
						return (
							<CreateAccount {...props} signInUser={(user) => {
								this.signInUser(user);
							}}></CreateAccount>
						);
					}}></Route>
					<Route path="/sign-in" component={(props) => {
						return (
							<SignIn {...props} signInUser={(user) => {
								this.signInUser(user);
							}}></SignIn>
					);
					}}></Route>
				</div>
			</Router>
		);
	}
}

export default App;
