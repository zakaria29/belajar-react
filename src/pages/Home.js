import React from "react"
import CryptoJS from "crypto-js"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            plainText: "",
            encrypt: ""
        }
        
    }

    encrypt(text) {
        const key = "secret"
        // let text = this.state.plainText
        let result = CryptoJS.AES.encrypt(text, key).toString()
        this.setState({encrypt: result})
    }
    render(){
        return(
            <div className="alert alert-info">
                Plain Text
                <input type="text" className="form-control" 
                value={this.state.plainText}
                onChange={(ev) => {this.setState({plainText: ev.target.value}); this.encrypt(ev.target.value)}} />
                Encrypt Result
                <h6>{ this.state.encrypt }</h6>
            </div>
        )
    }
}