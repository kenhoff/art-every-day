import {Route, BrowserRouter as Router} from "react-router-dom";
import CreateAccount from "./views/CreateAccount.jsx";
import Dashboard from "./views/Dashboard.jsx";
import LandingPage from "./views/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import SignIn from "./views/SignIn.jsx";
import jstz from "jstz";
import moment from "moment-timezone";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// get information about user
		// make a call to `/api/me` - load this.state.user with response

		// get current date in browser's time zone
		this.setState({
			currentDate: moment().tz(jstz.determine().name()).format("YYYY-MM-DD")
		});
	}
	render() {
		return (
			<Router>
				<div>
					<Navbar></Navbar>
					<Route exact path="/" component={(props) => {
						if (this.state.user) {
							return (<Dashboard {...props} currentDate={this.state.currentDate} user={this.state.user}/>);
						} else {
							return (<LandingPage {...props} currentDate={this.state.currentDate}/>);
						}
					}}></Route>
					<Route path="/create-account" component={CreateAccount}></Route>
					<Route path="/sign-in" component={SignIn}></Route>
				</div>
			</Router>
		);
	}
}

export default App;
