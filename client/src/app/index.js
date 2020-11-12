import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { IdeasList, IdeasInsert, IdeasUpdate, IdeasStream, NewIdeaForm, IdeasHome } from '../pages'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>

            <NavBar />
            <Switch>
                <Route path="/ideas" exact component={IdeasHome} />
                <Route path="/ideas/list" exact component={IdeasStream} />
                <Route path="/ideas/table" exact component={IdeasList} />
                <Route path="/ideas/create" exact component={NewIdeaForm} />
                <Route
                    path="/ideas/update/:id"
                    exact
                    component={IdeasUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App