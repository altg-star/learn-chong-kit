import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Tutorial, KeyPractice, BasicKeyPractice, RootKeyPractice } from "./views";

const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/tutorial">
					<Tutorial />
				</Route>
				<Route exact path="/key-practice">
					<KeyPractice />
				</Route>
				<Route exact path="/key-practice/basic">
					<BasicKeyPractice />
				</Route>
				<Route path="/key-practice/root/:questionId">
					<RootKeyPractice />
				</Route>
			</Switch >
		</BrowserRouter>
	);
}

export default App;
