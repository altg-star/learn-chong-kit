import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Tutorial, KeyPractice, DecodePracticeIndex } from "./views";
import { BasicKeyPractice, RootKeyPractice } from "./views/KeyPractice";
import { AssociateCode, CommonHead, CommonTail } from "./views/DecodePractice";

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
				<Route exact path="/decode-practice/common-head">
					<CommonHead />
				</Route>
				<Route exact path="/decode-practice/common-tail">
					<CommonTail />
				</Route>
			</Switch >
		</BrowserRouter>
	);
}

export default App;
