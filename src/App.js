import React from 'react';
import './App.css';
import Table from "./components/Table"

function App() {
  let result = [
    { nis: "101", nama: "jack", address: "malang" },
    { nis: "102", nama: "johnny english", address: "surabaya" },
    { nis: "103", nama: "clark", address: "los angles" },
    { nis: "104", nama: "john doe", address: "los angles" },
    { nis: "105", nama: "denim", address: "los angles" },
    { nis: "106", nama: "devi", address: "los angles" },
    { nis: "107", nama: "ismed", address: "los angles" },
    { nis: "108", nama: "aliyudin", address: "los angles" },
    { nis: "109", nama: "komang", address: "los angles" },
    { nis: "110", nama: "budi", address: "los angles" },
    { nis: "111", nama: "ani", address: "los angles" },
    { nis: "112", nama: "ana", address: "los angles" },
    { nis: "113", nama: "annisa", address: "los angles" },
    { nis: "114", nama: "firo", address: "los angles" },
    { nis: "115", nama: "mipan", address: "zuzuzu" },
  ]
  return (
    <div className="container">
      <Table data={result} column={["nis","nama","address"]} perPage="10" totalRows={result.length}
      onEachItem={item => option(item)} />
    </div>
  );
}

function option(item){
  return (
    <div>
      <button className="btn btn-sm btn-info m-1" onClick={() => alert("edit: "+ item.nama)}>
        Edit
      </button>
      <button className="btn btn-sm btn-danger m-1" onClick={() => alert("delete: "+ item.nama)}>
        Hapus
      </button>
    </div>
  )
}

export default App;
