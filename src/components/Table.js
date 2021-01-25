import React from "react"

export default class Table extends React.Component{
    constructor(props){
        super()
        this.state = {
            data: props.data,
            column: props.column ? props.column : Object.keys(this.props.data[0]),
            totalRows: props.totalRows,
            perPage: props.perPage,
            offset: 0,
            endset: props.perPage,
            pages: Math.ceil(props.totalRows / props.perPage),
            filterData: [],
            currentPage: 0,
            pagination: [],
            search: "",
            selectedColumn: {
                column: props.column ? props.column[0] : Object.keys(this.props.data[0]),
                type: "asc"
            }
        }

    }

    

    renderPagination = (current, pages) => {
        let data = []
        data.push(
            <li 
                className={current === 0 ? "page-item active" : "page-item"} 
                onClick={() => this.filterData(0)}>
                    <b className="page-link">First</b>
            </li>
        )
        data.push(
            <li 
                className={current === 0 ? "page-item disabled" : "page-item"} 
                onClick={() => this.filterData(current === 0 ? current : current - 1)}>
                    <b className="page-link"> &lt; </b>
            </li>
        )

        // generate page
        for (let index = 0; index < pages; index++) {
            data.push(
                <li 
                className={current === index ? "page-item active" : "page-item"} 
                onClick={() => this.filterData(index)}>
                    <b className="page-link">{index+1}</b>
                </li>
            )
        }


        // next
        data.push(
            <li 
                className={current === (this.state.pages-1) ? "page-item disabled" : "page-item"} 
                onClick={() => this.filterData(current === this.state.pages-1 ? current : (Number(current)+1))}>
                    <b className="page-link">&gt;</b>
                </li>
        )

        //last
        data.push(
            <li 
                className={current === (this.state.pages-1) ? "page-item active" : "page-item"} 
                onClick={() => this.filterData((this.state.pages-1))}>
                    <b className="page-link">Last</b>
                </li>
        )
        return data
        
    }

    

    filterData = (num) => {
        let perPage = Number(this.state.perPage)
        let offset = num * perPage
        let endset = (num * perPage) + perPage
        let search = this.state.search
        search = search.split(" ").join("|")
        let sourceData = this.state.data
        // sourceData.sort(this.sortData("nama","desc"))
        let resultData = []
        let totalRows = this.state.totalRows
        if(search !== ""){
            let foundData = sourceData.filter(element => {
                let stringElement = JSON.stringify(element)
                if(stringElement.search(search) === -1) return false
                return true
            })
            resultData = foundData.slice(offset, endset)
            if (foundData.length > 0) {
                
                totalRows = foundData.length
            }
        }else{
            resultData = sourceData.slice(offset, endset)
        }

        
        
        this.setState({
            offset: offset,
            endset: endset,
            filterData: resultData,
            pages: Math.ceil(totalRows / perPage),
            pagination: this.renderPagination(offset/perPage, Math.ceil(totalRows / perPage))
        })
        
    }

    sortData = (key, type) => {
        return (a,b) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0
            }
            let varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            let varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

            let compare = 0
            if(varA > varB) compare = 1
            else if(varA < varB) compare = -1

            return type === "desc" ? compare * -1 : compare
        }
    }

    componentDidMount(){
        this.filterData(0)
    }

    sort = (column) => {
        let data = this.state.data
        let currentCol = this.state.selectedColumn.column
        let currentType = this.state.selectedColumn.type
        if (currentCol === column) {
            currentType = currentType === "desc" ? "asc" : "desc"
        } else {
            currentCol = column
            currentType = "asc"
        }
        data = data.sort(this.sortData(currentCol,currentType))
        this.setState({ data: data, selectedColumn : {column: currentCol, type: currentType}})
        this.filterData(0)
    }

    handleSearch = (event) => {

        this.setState({search: event.target.value})
    }

    handleEnter = (event) => {
        if (event.keyCode === 13) {
            this.filterData(0)
        }
    }

    render(){        
        return(
            <div> 
                <input type="text" className="form-control m-3" name="search"
                value={this.state.search} onChange={this.handleSearch}
                onKeyUp={this.handleEnter} placeholder="Pencarian Data..." />
                
                <table className="table ">
                <thead>
                    <tr className="bg-secondary text-white">
                        {
                            this.state.column.map((item, index) => {
                                return(
                                    <th key={index}>
                                        <b style={{cursor:"pointer"}} onClick={() => this.sort(item)}>
                                        {item.toUpperCase()}
                                        </b>
                                    </th>
                                )
                            })
                        }
                        { (this.props.onEachItem ? <th>Option</th> : null)}
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        this.state.filterData.map((item,index) => {
                            
                           return(
                               <tr key={"row"+index}>
                                   {
                                       this.state.column.map(el => {
                                           return (
                                            <td>{item[el]}</td>
                                           )
                                       })
                                   }
                                   { 
                                   (this.props.onEachItem(item)) ? 
                                    <td>{ this.props.onEachItem(item)}</td> : null
                                    }
                                   
                                   {/* <td>
                                       <button className="btn btn-sm btn-info"
                                       onClick={() => this.onEdit(item)}>
                                           Edit
                                       </button>
                                   </td> */}
                               </tr>
                           ) 
                        })
                    }
                </tbody>
                                
                </table>

                <ul className="pagination justify-content-center" style={{cursor:"pointer"}}>
                {
                    this.state.pagination.map(item => {
                        return (
                            item
                        )
                    })
                }
                </ul>
            </div>
        )
    }

    
}