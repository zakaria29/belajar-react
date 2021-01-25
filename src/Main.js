import React from "react";
import Alert from "./components/Alert"
import Navbar from "./components/Navbar";
import Pages from  "./Pages"

/**
 * aplikasi untuk menghitung BMI
 * 1. User masukkan nilai berat badan (kg)
 * 2. User masukkan nilai tinggi badan (m)
 * 3. Program menghitung nilai BMI
 * 4. menentukan status BMI
 * 
 * variabel: berat, tinggi, hasil angka, status 
 */
class Main extends React.Component{
    constructor(){
        super()
        this.state = {
            berat: 0,
            tinggi: 0,
            hasil: 0,
            status: "",
            type: ""
        }
    }

    HitungBMI = () => {
        // tampung data tinggi dan berat (input user)
        let tinggi = this.state.tinggi
        let berat = this.state.berat

        let result = berat / (tinggi * tinggi)
        let status = ""
        let type = ""

        if (result < 18.5) {
            status = "Kurang berat badan"
            type = "danger"
        }
        else if(result >= 18.5 && result <= 24.9){
            status = "Normal (ideal)"
            type = "success"
        }
        else if(result >= 25 && result <= 29.9){
            status = "kelebihan berat badan"
            type = "warning"
        }
        else if(result >= 30){
            status = "Obesitas"
            type = "dark"
        }

        // masukkan status dan result ke dalam state
        this.setState({
            hasil: result,
            status: status,
            type: type
        })
    }

    render(){
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4>Body Mass Index</h4>
                    </div>

                    <div className="card-body">
                        Input berat
                        <input type="number" className="form-control mb-1"
                        value = { this.state.berat }
                        onChange = { ev => this.setState({berat: ev.target.value })}
                         />
                         {/* ev.target.value = untuk mendapatkan nilai yg dimasukkan oleh user ke input tsb */}

                        Input tinggi
                        <input type="number" className="form-control mb-1"
                        value = { this.state.tinggi }
                        onChange = { ev => this.setState({tinggi: ev.target.value })}
                         />

                        <button className="btn btn-success btn-block mb-1" 
                        onClick={() => this.HitungBMI()}>
                            Hitung BMI
                        </button>

                        Nilai BMI
                        <input type="number" className="form-control mb-1"
                        value = { this.state.hasil } readOnly
                         />

                        Status BMI
                        <Alert message={this.state.status} type={this.state.type} />

                    </div>
                </div>
            </div>
        )
    }
}

export default Main;