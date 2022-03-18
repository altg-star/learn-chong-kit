import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Tutorial, KeyPractice, DecodePracticeIndex, ArticlePracticeIndex } from "./views";
import { BasicKeyPractice, RootKeyPractice } from "./views/KeyPractice";
import { AssociateCode, CommonHead, CommonTail, SingleCharacter, Word } from "./views/DecodePractice";

const App = (): React.ReactElement => {
	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tutorial" element={<Tutorial />} />
				<Route path="/press-key-practice" element={<KeyPractice />} />
				<Route path="/key-practice/basic" element={<BasicKeyPractice />} />
				<Route path="/key-practice/root/:question" element={<RootKeyPractice />} />
				<Route path="/decode-practice" element={<DecodePracticeIndex />} />
				<Route path="/decode-practice/associate" element={<AssociateCode />} />
				<Route path="/decode-practice/common-head" element={<CommonHead />} />
				<Route path="/decode-practice/common-tail" element={<CommonTail />} />
				<Route path="/decode-practice/single-character" element={<SingleCharacter />} />
				<Route path="/decode-practice/word" element={<Word />} />
				<Route path="/article-practice" element={<ArticlePracticeIndex />} />
			</Routes >
		</HashRouter>
	)};
export default App;
