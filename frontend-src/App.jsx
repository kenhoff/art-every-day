import {Route, BrowserRouter as Router} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import LandingPage from "./views/LandingPage.jsx";
import LogIn from "./views/LogIn.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import SignUp from "./views/SignUp.jsx";
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
	logInUser(user) {
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
					<Route path="/signup" component={(props) => {
						return (
							<SignUp {...props} logInUser={(user) => {
								this.logInUser(user);
							}}></SignUp>
						);
					}}></Route>
					<Route path="/login" component={(props) => {
						return (
							<LogIn {...props} logInUser={(user) => {
								this.logInUser(user);
							}}></LogIn>
						);
					}}></Route>
				</div>
			</Router>
		);
	}
}

export default App;
