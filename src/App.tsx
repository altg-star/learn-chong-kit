import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//view
import { Home, Tutorial, PressKeyMenu, DecodePracticeIndex, ArticlePracticeIndex } from "./views";
import { BasicKeyPractice, RootKeyPractice } from "./views/press-key";
import { AssociateCode, CommonHead, CommonTail, SingleCharacter, Word } from "./views/DecodePractice";

//style
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = (): React.ReactElement => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/tutorial" element={<Tutorial />} />
					<Route path="/press-key" element={<PressKeyMenu />} />
					<Route path="/press-key/basic" element={<BasicKeyPractice />} />
					<Route path="/key-practice/root/:question" element={<RootKeyPractice />} />
					<Route path="/decode-practice" element={<DecodePracticeIndex />} />
					<Route path="/decode-practice/associate" element={<AssociateCode />} />
					<Route path="/decode-practice/common-head" element={<CommonHead />} />
					<Route path="/decode-practice/common-tail" element={<CommonTail />} />
					<Route path="/decode-practice/single-character" element={<SingleCharacter />} />
					<Route path="/decode-practice/word" element={<Word />} />
					<Route path="/article-practice" element={<ArticlePracticeIndex />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
};
export default App;
