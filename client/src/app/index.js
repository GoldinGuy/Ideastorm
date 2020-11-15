import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
            // ideas: [],
            searchTerm: "",
            currentPage: 1
        }

    }
    
    searchHandler = (term) => {
        this.setState({searchTerm: term})
    }
    
    pageHandler = (pageNum) => {
        this.setState({currentPage: pageNum})
    }

    render() {
         return (
         <Router>

            <NavBar searchTerm={this.state.searchTerm} searchHandler={this.searchHandler} pageHandler={this.pageHandler} currentPage={this.state.currentPage}/>
            <Switch>
                <Route path="/ideas" exact component={IdeasHome} />
                <Route path="/ideas/explore"  render={() => ( <IdeasStream searchTerm={this.state.searchTerm} /> )} />
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
}

export default App