import React from 'react'
import { BrowserRouter, Route, Switch , Redirect, } from 'react-router-dom'

import { NavBar } from '../components'
import { IdeasList, IdeasInsert, IdeasUpdate, IdeasStream, NewIdeaForm, IdeasHome } from '../pages'

// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Brainstorm />
    )
}


class Brainstorm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: "",
        }

    }
    
    searchHandler = (term) => {
        this.setState({ searchTerm: term })
    }
    
    render() {
         return (
         <BrowserRouter basename="/ideas">

            <NavBar searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />
             <Switch>
                <Route path="/" exact component={IdeasHome} />
                <Route path="/explore" render={() => (<IdeasStream searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} />)} />
                       {/* <Route
                    path="/explore/:id"
                    exact
                    component={Idea}
                /> */}
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
}

export default App