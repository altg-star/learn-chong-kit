import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Tutorial, KeyPressPractice } from "./views";

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
				<Route path="/press-key-practice">
					<KeyPressPractice />
				</Route>
			</Switch >
		</BrowserRouter>
	);
}

export default App;
