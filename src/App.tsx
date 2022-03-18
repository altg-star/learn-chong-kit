import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Tutorial, KeyPressPractice } from "./views";

const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tutorial" element={<Tutorial />} />
				<Route path="/press-key-practice" element={<KeyPressPractice />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
