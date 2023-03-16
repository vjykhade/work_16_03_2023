import Datatable from "../components/datatable/Datatable"
import Navbar from "../components/navbar/Navbar"
import Sidebar from "../components/sidebar/Sidebar"
import "./list.scss"

function List({type}) {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable dbname={type}/>
      </div>
    </div>
  )
}

export default List
