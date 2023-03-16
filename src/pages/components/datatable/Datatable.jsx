import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import {userColumns, productColumns } from "../../../datatablesource";
import { Link }  from "react-router-dom"
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot,getDocs  } from "firebase/firestore";
import { db } from "../../../firebase";

const Datatable = ({dbname}) => {
    console.log(dbname)
    const[data, setData] =useState([]);

    useEffect(() => {
        
        const fetchData = async () =>  {
            let list = []
            try{
                const querySnapshot = await getDocs(collection(db, dbname));
                querySnapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                });

                setData(list);
            }
            catch(err)
            {
                console.log(err)
            }
        }
        fetchData()

    //     const unsub = onSnapshot(collection(db, dbname), (snapshot) => {
    //         let list = [];
    //         snapshot.docs.forEach(doc => {
    //             list.push({id: doc.id, ...doc.data()})
    //         })
    //         setData(list)
    //     },(error) => {
    //         console.log(error)
    //     });

    //    return () => {
    //     unsub()
    //    }
    },[])

    const handleDelete = async(id) =>{
        //setData(data.filter(item=>item.id !== id))
        try{
            await deleteDoc(doc(db, dbname, id));
            setData(data.filter((item)=>item.id !== id));
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const actionColumns = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return(
                    <div className="cellAction">
                        <Link to={dbname === "users" ? `/users/${params.row.id}`: `/products/${params.row.id}`} style={{textDecoration: "none"}}>
                        <div className="viewButton">View</div></Link>
                        <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

  return (
  <div className="datatable" >
    <div className="dataTableTitle">
        Add New User
        <Link to={dbname==="users" ? "/users/new" : "/products/new"} className="link">
            Add New
        </Link>
    </div>
      <DataGrid className="dataGrid"
        rows={data}
        columns={dbname === "users" ? userColumns.concat(actionColumns) : productColumns.concat(actionColumns)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
  </div>
  )
}

export default Datatable
