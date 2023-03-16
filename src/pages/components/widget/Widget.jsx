import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { useEffect, useState } from "react";
import { collection, query, where,  getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const Widget = ({ type }) => {
    
    const [amount, setAmount] = useState(null);
    const [diff, setDiff] = useState(null);
    //const amount = 100;
    //const diff = 20;
    let data;

    switch(type){
        case "user" :
            data={
                title:"USERS",
                isMoney: false,
                link: "See all users",
                query: "users",
                icon: <PersonOutlinedIcon className="icon" style={{color: "crimson", backgroundColor: "rgba(255,0,0,0.2)"}}/>
            };
            break;
        case "order" :
                data={
                    title:"ORDERS",
                    isMoney: false,
                    link: "View all orders",
                    icon: <ShoppingCartOutlinedIcon className="icon" style={{color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)"}}/>
                };
                break;
        case "earning" :
                    data={
                        title:"EARNINGS",
                        isMoney: true,
                        link: "View net earning",
                        icon: <MonetizationOnOutlinedIcon className="icon" style={{color: "green", backgroundColor: "rgba(0,128,0,0.2)"}}/>
                    };
                    break;
        case "products" :
                        data={
                            title:"PRODUCTS",
                            isMoney: false,
                            link: "See details",
                            query: "products",
                            icon: <AccountBalanceOutlinedIcon className="icon" style={{color: "purple", backgroundColor: "rgba(128,0,128,0.2)"}}/>
                        };
            break;

            default: 
            break;
    }

    useEffect(()=>{
        const fetchData = async () => {
            const today = new Date();
            const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
            console.log("today : "+today+" lastMonth : "+lastMonth+" pervMonth: "+prevMonth)
            const lastMonthQuery = query(collection(db, data.query), where("timeStamp","<=",today), where("timeStamp",">",lastMonth) )
            const pervMonthQuery = query(collection(db, data.query), where("timeStamp","<=",lastMonth), where("timeStamp",">",prevMonth) )

            const lastMonthData = await getDocs(lastMonthQuery)
            const pervMonthData = await getDocs(pervMonthQuery)

            setAmount(lastMonthData.docs.length)
            setDiff((lastMonthData.docs.length - pervMonthData.docs.length) / (pervMonthData.docs.length) * 100)
        }   
    fetchData()
    },[])


  return (
    <div className="widget">
        <div className="left"><span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "₹"}{amount}</span>
        <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
            {diff < 0 ? <KeyboardArrowDownIcon   /> : <KeyboardArrowUpIcon   />}
            {diff}%</div>
        {data.icon}
        </div>
    </div>
  )
}

export default Widget
