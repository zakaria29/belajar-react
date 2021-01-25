import React from "react"
import Card from "../components/Card"
import $ from "jquery"
export default class Contact extends React.Component{
    
    constructor(){
        super()
        this.state = {
            gallery: [
                { 
                    judul: "Anak Badai",
                    cover: "https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-",
                    penulis: "Tere Liye",
                    harga: 100000,
                    penerbit: "CV Putra Sejati"
                },
                { 
                    judul: "Bumi",
                    cover: "https://drive.google.com/uc?id=1e-thvq7lkG1_gw0FqHzRoiAhfhdgpOUj",
                    penulis: "Tere Liye",
                    harga: 97500,
                    penerbit: "CV Putra Sejati"
                },
                { 
                    judul: "Bulan",
                    cover: "https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg",
                    penulis: "Tere Liye",
                    harga: 80000,
                    penerbit: "CV Putra Sejati"
                },
            ],
            filterGallery: [],
            action: "",
            selectedItem: "",
            judul: "",
            cover: "",
            penulis: "",
            harga: 0,
            penerbit: "",
            seacrh: ""
        }

        this.state.filterGallery = this.state.gallery
    }

    Save = (event) => {
        event.preventDefault();
        // event.preventDefault() digunakan oleh form untuk melakukan proses validasi data
        /**
         * state list "gallery" -> variabel "tempGallery" -> diubah/ditambahkan -> state "gallery"
         */
        let tempGallery = this.state.gallery;
        if (this.state.action === "insert") {
            tempGallery.push({
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga
            })
        } else if (this.state.action === "update") {
           let index = tempGallery.indexOf(this.state.selectedItem)
           tempGallery[index].judul = this.state.judul
           tempGallery[index].penulis = this.state.penulis
           tempGallery[index].penerbit = this.state.penerbit
           tempGallery[index].cover = this.state.cover
           tempGallery[index].harga = this.state.harga
        }

        this.setState({gallery: tempGallery})
        $("#modal_gallery").modal("hide");
    }

    Add = () => {
        $("#modal_gallery").modal("show");
        this.setState({
            action: "insert",
            judul: "",
            cover: "",
            penulis: "",
            penerbit: "",
            harga: ""
        })
    }

    Edit = item => {
        $("#modal_gallery").modal("show");
        let tempGallery = this.state.gallery
        let index = tempGallery.indexOf(item)
        this.setState({
            action: "update",
            selectedItem: item,
            judul: tempGallery[index].judul,
            penulis: tempGallery[index].penulis,
            penerbit: tempGallery[index].penerbit,
            cover: tempGallery[index].cover,
            harga: tempGallery[index].harga,
        })
    }
    
    Drop = item => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            let tempGallery = this.state.gallery
            let index = tempGallery.indexOf(item)
            tempGallery.splice(index, 1);
            this.setState({gallery: tempGallery})
        }
    }

    AddToCart = item => {
        let tempGallery = this.state.gallery
        let selectedItem  = item

        let tempCart = JSON.parse(localStorage.getItem("cart"))
        if (tempCart === null) {
            tempCart = [] 
        }

        
        let found = tempCart.filter(it => it === selectedItem).length
        if (found === 0) {
            selectedItem.jumlah = 1
            tempCart.push(selectedItem)
        } else {
            let foundIndex = tempCart.indexOf(selectedItem)
            tempCart[foundIndex].jumlah = ++tempCart[foundIndex].jumlah
        }
        
        localStorage.setItem("cart", JSON.stringify(tempCart))
        console.log(found);
    }

    searching = ev => {
        if (ev.keyCode === 13) {
            let searchText = this.state.seacrh.toLowerCase();
            let tempGallery = this.state.gallery
            let filter = tempGallery.filter(item => {
                return item.judul.toLowerCase().includes(searchText) ||
                item.penulis.toLowerCase().includes(searchText) ||
                item.penerbit.toLowerCase().includes(searchText)
            })
            this.setState({filterGallery : filter})
        }
    }
    
    render(){
        return(
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.seacrh}
                onChange={e => this.setState({seacrh: e.target.value})}
                onKeyUp={this.searching} />
                <div className="row">
                    { this.state.filterGallery.map( (item, index) => (
                        <Card
                            key={index}
                            cover={item.cover}
                            judul={item.judul}
                            penulis={item.penulis}
                            penerbit={item.penerbit}
                            harga={item.harga}
                            onAddCart={() => this.AddToCart(item)}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                         />
                    )) }
                </div>

                <div className="fixed-bottom">
                    <button className="btn btn-success m-3"
                    style={{borderRadius:"50%"}}
                    onClick={this.Add}>
                        <span className="fa fa-plus"></span>
                    </button>
                </div>

                <div className="modal" id="modal_gallery">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                Form Gallery
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text"
                                        className="form-control mb-2"
                                        value={this.state.judul}
                                        onChange={ ev => this.setState({judul : ev.target.value }) } 
                                        required />
                                    
                                    Penulis Buku
                                    <input type="text"
                                        className="form-control mb-2"
                                        value={this.state.penulis}
                                        onChange={ ev => this.setState({penulis : ev.target.value }) } 
                                        required />
                                    
                                    Penerbit Buku
                                    <input type="text"
                                        className="form-control mb-2"
                                        value={this.state.penerbit}
                                        onChange={ ev => this.setState({penerbit : ev.target.value }) } 
                                        required />
                                    
                                    Harga Buku
                                    <input type="number"
                                        className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ ev => this.setState({harga : ev.target.value }) } 
                                        required />
                                    
                                    Url Cover Buku
                                    <input type="url"
                                        className="form-control mb-2"
                                        value={this.state.cover}
                                        onChange={ ev => this.setState({cover : ev.target.value }) } 
                                        required />
                                    
                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}