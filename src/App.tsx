import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Tutorial, KeyPractice, DecodePracticeIndex } from "./views";
import { BasicKeyPractice, RootKeyPractice } from "./views/KeyPractice";
import { AssociateCode } from "./views/DecodePractice";

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
				<Route exact path="/decode-practice">
					<DecodePracticeIndex />
				</Route>
				<Route exact path="/decode-practice/associate">
					<AssociateCode />
				</Route>
			</Switch >
		</BrowserRouter>
	);
}

export default App;
