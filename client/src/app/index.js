import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { IdeasTable, IdeasUpdate,TrendingPage, NewIdeaPage, LatestPage, HomePage, SearchPage } from '../pages'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
          <BrowserRouter basename="/ideas">

            <NavBar />
            <Switch>
                {/* <Redirect path="/" to="/"/> */}
                <Route path="/" exact component={HomePage} />
                <Route path="/trending" exact component={TrendingPage} />
                <Route path="/latest" exact component={LatestPage} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/table" exact component={IdeasTable} />
                <Route path="/create" exact component={NewIdeaPage} />
                <Route
                    path="/update/:id"
                    exact
                    component={IdeasUpdate}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default App