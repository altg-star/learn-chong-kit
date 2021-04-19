import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Tutorial, KeyPractice, DecodePracticeIndex, ArticlePracticeIndex } from "./views";
import { BasicKeyPractice, RootKeyPractice } from "./views/KeyPractice";
import { AssociateCode, CommonHead, CommonTail, SingleCharacter, Word } from "./views/DecodePractice";

const App = (): React.ReactElement => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
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
				<Route path="/key-practice/root/:question">
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
				<Route exact path="/decode-practice/single-character">
					<SingleCharacter />
				</Route>
				<Route exact path="/decode-practice/word">
					<Word />
				</Route>
				<Route exact path="/article-practice">
					<ArticlePracticeIndex />
				</Route>
			</Switch >
		</BrowserRouter>
	);
}

export default App;
