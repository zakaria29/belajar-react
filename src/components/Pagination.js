import React from "react"

export default class Pagination extends React.Component{
    constructor(props){
        super()
        this.state = {
            totalRows: props.totalRows,
            limit: props.limit,
            offset: props.offset,
            totalPage: Math.ceil(props.totalRows / props.limit),
            pages : []
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        // alert(event.target.)
    }

    renderPage = () => {
        let data = []
        for (let index = 0; index < this.state.totalPage; index++) {
            data.push(
                <li className="page-item" onClick={this.handleClick}>
                    <a className="page-link" >{index+1}</a>
                </li>
            )
        }
        // this.setState({pages: data})
        return data
    }
    render(){
        const page = this.renderPage()
        return(
            <ul className="pagination">
                {
                    page.map(item => {
                        return (
                            item
                        )
                    })
                }
            </ul>
        )
    }

    componentDidMount(){
        // this.renderPage();
    }
}