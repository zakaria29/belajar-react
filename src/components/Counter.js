import React from "react"

export default class Counter extends React.Component{
    constructor(){
        super();
        this.state = {
            counter: 0
        }
    }

    increment = () => {
        let c = this.state.counter;
        this.setState({
            counter: ++c
        });
        let d = new Date();
        let y = d.getFullYear();
    }

    decrement = () => {
        let c = this.state.counter;
        this.setState({
            counter: --c
        });
    }

    render(){
        return(
            <div className="card col-sm-5">
                <div className="card-header bg-info text-white">
                    <h4>Simple Counter</h4>
                </div>
                <div className="card-body">
                    <button className="btn btn-success" onClick={this.increment}>
                        +
                    </button>
                    <input type="number" value={this.state.counter} 
                    readOnly />
                    <button className="btn btn-danger" onClick={this.decrement}>
                        -
                    </button>
                </div>
            </div>
        )
    }
}