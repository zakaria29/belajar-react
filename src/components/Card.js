import React from "react"
export default class Card extends React.Component{
    
    render(){
        
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <div className="col-sm-5">
                            <img src={this.props.cover} className="img"
                            height="200" />
                        </div>
                        <div className="col-sm-7">
                            <h5 className="text-primary">
                                {this.props.judul}
                            </h5>
                            <h6 className="text-danger">
                                Harga: Rp { this.props.harga }
                            </h6>
                            <h6 className="text-dark">
                                Penulis: { this.props.penulis }
                            </h6>
                            <h6 className="text-dark">
                                Penerbit: { this.props.penerbit }
                            </h6>

                            <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onAddCart}>
                                <span className="fa fa-shopping-cart"></span> Tambah ke Keranjang
                            </button>

                            <button className="btn btn-sm btn-primary m-1"
                            style={{borderRadius:"50%"}}
                            onClick={this.props.onEdit}>
                                <span className="fa fa-edit"></span>
                            </button>

                            <button className="btn btn-sm btn-danger m-1"
                            style={{borderRadius:"50%"}}
                            onClick={this.props.onDrop}>
                                <span className="fa fa-trash"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}