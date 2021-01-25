import React from "react"
import {Switch, Route} from "react-router-dom"

/** import all pages */
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"

export default class Pages extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>
        )
    }
}