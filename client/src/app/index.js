import React from 'react'
import { BrowserRouter, Route, Switch , Redirect, } from 'react-router-dom'

import { NavBar } from '../components'
import { IdeasList, IdeasInsert, IdeasUpdate, IdeasStream, NewIdeaForm, IdeasHome } from '../pages'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
          <BrowserRouter basename="/ideas">

            <NavBar />
             <Switch>
                <Route path="/" exact component={IdeasHome} />
                {/* <Route path="/explore" exact component={IdeasStream} /> */}
                <Route path="/explore/:page" exact component={IdeasStream} />
            
                {/* <Route path="/explore/:searchTerm" render={() => ( <IdeasStream searchTerm={this.state.searchTerm} /> )} /> */}
                <Route path="/table" exact component={IdeasList} />
                <Route path="/create" exact component={NewIdeaForm} />
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