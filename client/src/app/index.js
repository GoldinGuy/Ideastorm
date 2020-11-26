import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { NavBar, Footer } from '../components'
import { IdeasTable, TrendingPage, NewIdeaPage, LatestPage, HomePage, SearchPage } from '../pages'

function App() {
    return (
          <BrowserRouter basename="/">
            <NavBar />
            <Switch>
                {/* <Redirect path="/" to="/"/> */}
                <Route path="/" exact component={HomePage} />
                <Route path="/trending" exact component={TrendingPage} />
                <Route path="/latest" exact component={LatestPage} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/table" exact component={IdeasTable} />
                <Route path="/create" exact component={NewIdeaPage} />
                {/* <Route
                    path="/update/:id"
                    exact
                    component={IdeasUpdate}
                /> */}
            </Switch>
             <Footer />
        </BrowserRouter>
    )
}

export default App