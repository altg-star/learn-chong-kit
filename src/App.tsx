import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//view
import { Home, Tutorial, PressKeyMenu, DecodeMenu, ArticlePracticeIndex } from "./views";
import { BasicKeyPractice, RootPressKey } from "./views/press-key";
import { AssociateCode, CommonHead } from "./views/decode";
import { CommonTail, SingleCharacter, Word } from "./views/DecodePractice";

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
					<Route path="/press-key/root/:question" element={<RootPressKey />} />
					<Route path="/decode" element={<DecodeMenu />} />
					<Route path="/decode/associate" element={<AssociateCode />} />
					<Route path="/decode/common-head" element={<CommonHead />} />
					<Route path="/decode/common-tail" element={<CommonTail />} />
					<Route path="/decode/single-character" element={<SingleCharacter />} />
					<Route path="/decode/word" element={<Word />} />
					<Route path="/article-practice" element={<ArticlePracticeIndex />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
};
export default App;
