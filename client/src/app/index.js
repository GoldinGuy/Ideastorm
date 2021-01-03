import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { NavBar, Footer, ScrollToTop } from "../components";
import {
	IdeasTable,
	TrendingPage,
	NewIdeaPage,
	LatestPage,
	HomePage,
	SearchPage,
	UpdateIdeasPage
} from "../pages";

function App() {
	return (
		<CookiesProvider>
			<BrowserRouter basename="/">
				<ScrollToTop>
					<NavBar />
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/trending" exact component={TrendingPage} />
						<Route path="/trending/:idea" exact component={TrendingPage} />
						<Route path="/latest" exact component={LatestPage} />
						<Route path="/search" exact component={SearchPage} />
						<Route path="/table" exact component={IdeasTable} />
						<Route path="/create" exact component={NewIdeaPage} />
						<Route path="/update/:id" exact component={UpdateIdeasPage} />
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</CookiesProvider>
	);
}

export default App;
